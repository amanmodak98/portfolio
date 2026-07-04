import { Link } from "react-router-dom";
import type { Project } from "../types";
import { uploadsUrl } from "../services/api";

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <Link
      to={`/projects/${project.id}`}
      className="card card-hover group flex h-full flex-col"
    >
      <div className="relative mb-5 aspect-[16/10] w-full overflow-hidden rounded-xl border border-hair bg-surface">
        {project.thumbnail ? (
          <img
            src={uploadsUrl(project.thumbnail)}
            alt={project.title}
            loading="lazy"
            className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-5xl font-bold text-faint">
            {project.title.charAt(0)}
          </div>
        )}
      </div>

      <div className="mb-2 flex items-center justify-between gap-3">
        <h3 className="font-semibold text-ink">{project.title}</h3>
        <span className="text-faint transition group-hover:translate-x-0.5 group-hover:text-ink">
          ↗
        </span>
      </div>
      <p className="mb-4 line-clamp-2 flex-1 text-sm leading-relaxed text-muted">
        {project.description}
      </p>
      <div className="flex flex-wrap gap-1.5">
        {project.techStack.slice(0, 3).map((t) => (
          <span key={t} className="chip">
            {t}
          </span>
        ))}
        {project.techStack.length > 3 && (
          <span className="chip">+{project.techStack.length - 3}</span>
        )}
      </div>
    </Link>
  );
}
