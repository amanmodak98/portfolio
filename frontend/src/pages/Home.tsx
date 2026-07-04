import { Link } from "react-router-dom";
import { useFetch } from "../hooks/useFetch";
import { getProjects, getSkills } from "../services/resources";
import { useSettings } from "../context/SettingsContext";
import { uploadsUrl } from "../services/api";
import ProjectCard from "../components/ProjectCard";
import SectionHeading from "../components/SectionHeading";
import TechStack from "../components/TechStack";
import Reveal from "../components/Reveal";
import Counter from "../components/Counter";
import Spinner from "../components/Spinner";
import TextReveal, { Stagger } from "../components/TextReveal";
import MagneticButton from "../components/MagneticButton";

const process = [
  { step: "01", title: "Plan", body: "Understand the goal, scope the work, and map a clean architecture." },
  { step: "02", title: "Build", body: "Ship well-tested features with a tidy, readable codebase." },
  { step: "03", title: "Deploy", body: "Automate CI/CD so every change reaches production safely." },
];

export default function Home() {
  const { settings } = useSettings();
  const { data: projects, loading } = useFetch(() => getProjects(), []);
  const { data: skills } = useFetch(getSkills, []);
  const featured = (projects || []).filter((p) => p.featured).slice(0, 3);

  const stats = [
    { label: "Projects shipped", value: projects?.length ?? 0, suffix: "+" },
    { label: "Technologies", value: skills?.length ?? 0, suffix: "+" },
    { label: "Automated deploys", value: 120, suffix: "+" },
    { label: "Build success", value: 98, suffix: "%" },
  ];

  return (
    <div>
      {/* Hero */}
      <section className="container-page pt-24 pb-16 sm:pt-32 sm:pb-24">
        <div className="mx-auto max-w-3xl text-center">
          <Stagger>
            <span className="chip inline-flex items-center gap-2">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-green-500" />
              </span>
              {settings.role}
            </span>
          </Stagger>

          <TextReveal
            text={`Building software that ships.`}
            highlight="ships."
            className="mt-7 text-balance text-5xl font-bold leading-[1.05] tracking-tight text-ink sm:text-7xl"
          />

          <Stagger delay={0.5}>
            <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-muted">
              {settings.tagline}
            </p>
          </Stagger>

          <Stagger delay={0.62}>
            <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
              <MagneticButton to="/projects" className="btn-accent">
                View my work
              </MagneticButton>
              <MagneticButton
                href={uploadsUrl(settings.resumeUrl) || "/resume.pdf"}
                download
                className="btn-ghost"
                strength={0.2}
              >
                Download résumé
              </MagneticButton>
            </div>
          </Stagger>

          <Stagger delay={0.74}>
            <p className="mt-10 text-xs uppercase tracking-[0.18em] text-faint">
              Trusted with production systems · React · Node · Docker · AWS
            </p>
          </Stagger>
        </div>
      </section>

      {/* Stats band */}
      <section className="container-page">
        <div className="grid grid-cols-2 divide-x divide-y divide-hair overflow-hidden rounded-2xl border border-hair sm:grid-cols-4 sm:divide-y-0">
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.06}>
              <div className="px-6 py-8 text-center">
                <p className="text-3xl font-bold text-ink sm:text-4xl">
                  <Counter value={s.value} suffix={s.suffix} />
                </p>
                <p className="mt-1.5 text-sm text-faint">{s.label}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Process */}
      <section className="container-page section">
        <SectionHeading
          eyebrow="How I work"
          title="A simple, reliable process"
          subtitle="From first commit to production — no drama, just clean delivery."
        />
        <div className="grid gap-6 md:grid-cols-3">
          {process.map((p, i) => (
            <Reveal key={p.step} delay={i * 0.1}>
              <div className="card card-hover h-full">
                <span className="text-sm font-semibold text-brand-400">{p.step}</span>
                <h3 className="mt-3 text-lg font-semibold text-ink">{p.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{p.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Featured work */}
      <section className="container-page section pt-0">
        <div className="mb-12 flex items-end justify-between gap-6">
          <div>
            <p className="eyebrow mb-3">Selected work</p>
            <h2 className="text-3xl font-bold tracking-tight text-ink sm:text-4xl">
              Featured projects
            </h2>
          </div>
          <Link to="/projects" className="hidden shrink-0 text-sm text-muted hover:text-ink sm:block">
            All projects →
          </Link>
        </div>
        {loading ? (
          <Spinner />
        ) : featured.length ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((p, i) => (
              <Reveal key={p.id} delay={i * 0.1}>
                <ProjectCard project={p} />
              </Reveal>
            ))}
          </div>
        ) : (
          <p className="text-center text-faint">No featured projects yet.</p>
        )}
      </section>

      {/* Tech */}
      <section className="container-page section pt-0">
        <SectionHeading eyebrow="Toolbox" title="Technologies I use" />
        <TechStack />
      </section>

      {/* Final CTA */}
      <section className="container-page section pt-0">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl border border-hair bg-surface px-6 py-16 text-center">
            <div className="absolute left-1/2 top-0 h-64 w-[40rem] -translate-x-1/2 rounded-full bg-brand-600/15 blur-[100px]" />
            <div className="relative">
              <h2 className="text-balance text-3xl font-bold tracking-tight text-ink sm:text-5xl">
                Let's build something great
              </h2>
              <p className="mx-auto mt-4 max-w-lg text-muted">
                Open to internships and new-grad roles. Tell me what you're working
                on — I'll reply within a day.
              </p>
              <div className="mt-8 flex justify-center">
                <MagneticButton to="/contact" className="btn-primary">
                  Get in touch →
                </MagneticButton>
              </div>
            </div>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
