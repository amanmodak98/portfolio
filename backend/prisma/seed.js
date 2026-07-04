import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

const slugify = (t) =>
  t.toLowerCase().replace(/[^a-z0-9\s-]/g, "").replace(/\s+/g, "-");

async function main() {
  // Admin user
  const password = await bcrypt.hash("admin1234", 10);
  await prisma.user.upsert({
    where: { email: "admin@example.com" },
    update: {},
    create: {
      name: "Site Admin",
      email: "admin@example.com",
      password,
      role: "ADMIN",
    },
  });

  // Skills
  await prisma.skill.deleteMany();
  await prisma.skill.createMany({
    data: [
      { name: "React", category: "Frontend", percentage: 92 },
      { name: "TypeScript", category: "Frontend", percentage: 88 },
      { name: "Tailwind CSS", category: "Frontend", percentage: 90 },
      { name: "Node.js", category: "Backend", percentage: 87 },
      { name: "Express", category: "Backend", percentage: 85 },
      { name: "PostgreSQL", category: "Backend", percentage: 80 },
      { name: "Docker", category: "DevOps", percentage: 82 },
      { name: "GitHub Actions", category: "DevOps", percentage: 80 },
      { name: "Kubernetes", category: "DevOps", percentage: 68 },
      { name: "Linux / Bash", category: "DevOps", percentage: 78 },
      { name: "AWS EC2", category: "Cloud", percentage: 72 },
      { name: "Nginx", category: "Cloud", percentage: 70 },
      { name: "Cloudflare", category: "Cloud", percentage: 72 },
    ],
  });

  // Education
  await prisma.education.deleteMany();
  await prisma.education.create({
    data: {
      institution: "State University",
      degree: "B.Sc. Computer Science",
      cgpa: "3.8/4.0",
      startYear: 2019,
      endYear: 2023,
    },
  });

  // Experience
  await prisma.experience.deleteMany();
  await prisma.experience.createMany({
    data: [
      {
        company: "Acme Corp",
        position: "Full-Stack Developer",
        description:
          "Built and shipped customer-facing web apps with React and Node.js.",
        startDate: new Date("2023-07-01"),
        endDate: null,
      },
      {
        company: "Startup Labs",
        position: "Software Engineering Intern",
        description: "Developed REST APIs and internal dashboards.",
        startDate: new Date("2022-06-01"),
        endDate: new Date("2022-12-31"),
      },
    ],
  });

  // Projects
  await prisma.project.deleteMany();
  await prisma.project.createMany({
    data: [
      {
        title: "Developer Portfolio",
        description:
          "This very portfolio — full-stack React + Express + Prisma app with an admin dashboard.",
        techStack: ["React", "Express", "Prisma", "PostgreSQL", "Docker"],
        githubUrl: "https://github.com/example/portfolio",
        liveUrl: "https://example.com",
        featured: true,
      },
      {
        title: "Task Manager API",
        description: "A REST API for managing tasks with JWT auth and role-based access.",
        techStack: ["Node.js", "Express", "PostgreSQL"],
        githubUrl: "https://github.com/example/task-api",
        featured: true,
      },
      {
        title: "Weather Dashboard",
        description: "A responsive weather dashboard consuming a third-party API.",
        techStack: ["React", "TypeScript", "Tailwind CSS"],
        githubUrl: "https://github.com/example/weather",
        featured: false,
      },
      {
        title: "CI/CD Starter Kit",
        description:
          "A reusable GitHub Actions + Docker template that lints, tests, builds and deploys a Node app to the cloud on every push — zero-config green pipelines.",
        techStack: ["Docker", "GitHub Actions", "Kubernetes", "Nginx", "AWS"],
        githubUrl: "https://github.com/example/cicd-starter",
        featured: true,
      },
    ],
  });

  // Certificates
  await prisma.certificate.deleteMany();
  await prisma.certificate.createMany({
    data: [
      {
        title: "AWS Certified Cloud Practitioner",
        issuer: "Amazon Web Services",
        issueDate: new Date("2024-03-15"),
        verifyUrl: "https://aws.amazon.com/verification",
      },
      {
        title: "Meta Front-End Developer",
        issuer: "Meta / Coursera",
        issueDate: new Date("2023-11-01"),
        verifyUrl: "https://coursera.org/verify/example",
      },
    ],
  });

  // Blogs
  await prisma.blog.deleteMany();
  const posts = [
    {
      title: "Getting Started with Prisma",
      content:
        "Prisma is a next-generation ORM for Node.js and TypeScript. In this post we cover schema modeling, migrations, and querying.",
      tags: ["prisma", "database", "node"],
      category: "Backend",
      status: "PUBLISHED",
    },
    {
      title: "Animating React with Framer Motion",
      content:
        "Framer Motion makes it simple to add fluid animations to React components. Here is how to get productive quickly.",
      tags: ["react", "animation", "frontend"],
      category: "Frontend",
      status: "PUBLISHED",
    },
    {
      title: "Draft: Deploying with Docker Compose",
      content: "A work-in-progress guide to multi-container deployments.",
      tags: ["docker", "devops"],
      category: "DevOps",
      status: "DRAFT",
    },
  ];
  for (const p of posts) {
    await prisma.blog.create({ data: { ...p, slug: slugify(p.title) } });
  }

  // Site settings (singleton)
  const settingsData = {
    fullName: "Aman Sharma",
    role: "Software Developer & DevOps Intern",
    tagline: "I build full-stack web apps and automate the path from commit to production.",
    bio: "I'm a software developer with a soft spot for DevOps — I love turning ideas into polished products (React on the front, Node and Postgres on the back) and shipping them through clean, automated CI/CD pipelines with Docker and the cloud. Currently seeking an internship where I can learn fast and contribute across the stack.",
    location: "Bengaluru, India",
    email: "hello@example.com",
    githubUrl: "https://github.com",
    linkedinUrl: "https://linkedin.com",
    twitterUrl: "https://twitter.com",
    resumeUrl: "/resume.pdf",
  };
  await prisma.siteSettings.upsert({
    where: { id: 1 },
    update: settingsData,
    create: { id: 1, ...settingsData },
  });

  console.log("Seed complete. Admin: admin@example.com / admin1234");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
