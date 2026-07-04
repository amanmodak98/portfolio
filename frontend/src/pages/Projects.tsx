import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { useFetch } from "../hooks/useFetch";
import { getProjects } from "../services/resources";
import ProjectCard from "../components/ProjectCard";
import SectionHeading from "../components/SectionHeading";
import Spinner from "../components/Spinner";

export default function Projects() {
  const { data: projects, loading } = useFetch(() => getProjects(), []);
  const [search, setSearch] = useState("");
  const [tech, setTech] = useState("");

  const allTech = useMemo(
    () => Array.from(new Set((projects || []).flatMap((p) => p.techStack))).sort(),
    [projects]
  );

  const filtered = (projects || []).filter((p) => {
    const matchSearch = p.title.toLowerCase().includes(search.toLowerCase());
    const matchTech = !tech || p.techStack.includes(tech);
    return matchSearch && matchTech;
  });

  return (
    <div className="container-page py-16">
      <SectionHeading
        eyebrow="My work"
        title="Projects"
        subtitle="Search and filter through the things I've built."
      />

      <div className="mb-8 flex flex-col gap-4 sm:flex-row">
        <div className="relative sm:max-w-xs sm:flex-1">
          <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-faint">
            ⌕
          </span>
          <input
            className="input pl-9"
            placeholder="Search projects…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <select
          className="input sm:max-w-xs"
          value={tech}
          onChange={(e) => setTech(e.target.value)}
        >
          <option value="">All technologies</option>
          {allTech.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
      </div>

      {loading ? (
        <Spinner />
      ) : filtered.length ? (
        <motion.div
          layout
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {filtered.map((p) => (
            <motion.div
              key={p.id}
              layout
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <ProjectCard project={p} />
            </motion.div>
          ))}
        </motion.div>
      ) : (
        <p className="py-16 text-center text-faint">
          No projects match your filters.
        </p>
      )}
    </div>
  );
}
