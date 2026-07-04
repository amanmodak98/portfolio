import Reveal from "./Reveal";

const groups: { title: string; items: string[] }[] = [
  { title: "Frontend", items: ["React", "TypeScript", "Tailwind", "Framer Motion"] },
  { title: "Backend", items: ["Node.js", "Express", "Prisma", "PostgreSQL"] },
  { title: "DevOps & Cloud", items: ["Docker", "Kubernetes", "GitHub Actions", "AWS", "Nginx"] },
];

export default function TechStack() {
  return (
    <div className="grid gap-px overflow-hidden rounded-2xl border border-hair bg-surface-2 sm:grid-cols-3">
      {groups.map((g, i) => (
        <Reveal key={g.title} delay={i * 0.08}>
          <div className="h-full bg-surface-2 p-6">
            <h3 className="mb-4 text-sm font-semibold text-ink">{g.title}</h3>
            <ul className="space-y-2.5">
              {g.items.map((item) => (
                <li key={item} className="flex items-center gap-2.5 text-sm text-muted">
                  <span className="h-1 w-1 rounded-full bg-brand-400" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      ))}
    </div>
  );
}
