import { useFetch } from "../hooks/useFetch";
import { getEducation, getExperience, getSkills } from "../services/resources";
import { useSettings } from "../context/SettingsContext";
import SectionHeading from "../components/SectionHeading";
import SkillBar from "../components/SkillBar";
import Reveal from "../components/Reveal";
import Spinner from "../components/Spinner";
import type { Skill } from "../types";

const fmt = (d?: string | null) =>
  d ? new Date(d).toLocaleDateString(undefined, { year: "numeric", month: "short" }) : "Present";

export default function About() {
  const { settings } = useSettings();
  const { data: skills, loading: ls } = useFetch(getSkills, []);
  const { data: experience, loading: le } = useFetch(getExperience, []);
  const { data: education, loading: led } = useFetch(getEducation, []);

  const byCategory = (skills || []).reduce<Record<string, Skill[]>>((acc, s) => {
    (acc[s.category] ||= []).push(s);
    return acc;
  }, {});

  return (
    <div className="container-page py-16">
      <SectionHeading eyebrow="Get to know me" title="About Me" />

      {/* Bio */}
      <Reveal>
        <div className="card mx-auto mb-14 max-w-3xl text-center">
          <p className="text-lg leading-relaxed text-fg">{settings.bio}</p>
          {settings.location && (
            <p className="mt-4 text-sm text-faint">📍 {settings.location}</p>
          )}
        </div>
      </Reveal>

      {/* Experience + Education */}
      <div className="grid gap-10 lg:grid-cols-2">
        <Reveal direction="right">
          <section>
            <h3 className="mb-6 text-xl font-semibold text-ink">Experience</h3>
            {le ? (
              <Spinner />
            ) : (
              <ol className="relative border-l border-hair pl-6">
                {(experience || []).map((e) => (
                  <li key={e.id} className="mb-8 last:mb-0">
                    <span className="absolute -left-[7px] mt-1.5 h-3.5 w-3.5 rounded-full border-2 border-page bg-brand-500 shadow-glow" />
                    <p className="text-xs uppercase tracking-wide text-faint">
                      {fmt(e.startDate)} — {fmt(e.endDate)}
                    </p>
                    <h4 className="mt-1 font-semibold text-ink">
                      {e.position} · <span className="text-brand-300">{e.company}</span>
                    </h4>
                    <p className="mt-1 text-sm text-muted">{e.description}</p>
                  </li>
                ))}
              </ol>
            )}
          </section>
        </Reveal>

        <Reveal direction="left">
          <section>
            <h3 className="mb-6 text-xl font-semibold text-ink">Education</h3>
            {led ? (
              <Spinner />
            ) : (
              <div className="space-y-4">
                {(education || []).map((ed) => (
                  <div key={ed.id} className="card card-hover">
                    <p className="text-xs uppercase tracking-wide text-faint">
                      {ed.startYear} — {ed.endYear ?? "Present"}
                    </p>
                    <h4 className="mt-1 font-semibold text-ink">{ed.degree}</h4>
                    <p className="text-sm text-muted">{ed.institution}</p>
                    {ed.cgpa && (
                      <p className="mt-1 text-sm text-brand-300">CGPA: {ed.cgpa}</p>
                    )}
                  </div>
                ))}
              </div>
            )}
          </section>
        </Reveal>
      </div>

      {/* Skills */}
      <section className="mt-16">
        <h3 className="mb-8 text-center text-xl font-semibold text-ink">
          Skills &amp; Tools
        </h3>
        {ls ? (
          <Spinner />
        ) : (
          <div className="grid gap-6 sm:grid-cols-2">
            {Object.entries(byCategory).map(([cat, list], i) => (
              <Reveal key={cat} delay={i * 0.08}>
                <div className="card h-full">
                  <h4 className="mb-5 font-semibold text-brand-300">{cat}</h4>
                  <div className="space-y-4">
                    {list.map((s) => (
                      <SkillBar key={s.id} skill={s} />
                    ))}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
