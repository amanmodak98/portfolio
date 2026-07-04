import { Link, useParams } from "react-router-dom";
import { useFetch } from "../hooks/useFetch";
import { getProject } from "../services/resources";
import Spinner from "../components/Spinner";
import { uploadsUrl } from "../services/api";

export default function ProjectDetail() {
  const { id } = useParams();
  const { data: project, loading, error } = useFetch(
    () => getProject(id!),
    [id]
  );

  if (loading) return <Spinner label="Loading project…" />;
  if (error || !project)
    return (
      <div className="container-page py-24 text-center">
        <p className="text-muted">Project not found.</p>
        <Link to="/projects" className="btn-ghost mt-6">
          Back to projects
        </Link>
      </div>
    );

  return (
    <article className="container-page py-16">
      <Link to="/projects" className="text-sm text-brand-400 hover:underline">
        ← Back to projects
      </Link>

      <div className="mt-4 flex flex-wrap items-center gap-3">
        <h1 className="text-3xl font-bold text-ink">{project.title}</h1>
        {project.featured && (
          <span className="rounded bg-brand-600/20 px-2 py-0.5 text-xs text-brand-400">
            Featured
          </span>
        )}
      </div>

      {project.thumbnail && (
        <img
          src={uploadsUrl(project.thumbnail)}
          alt={project.title}
          className="mt-6 w-full rounded-xl object-cover"
        />
      )}

      <p className="mt-6 whitespace-pre-line leading-relaxed text-fg">
        {project.description}
      </p>

      <div className="mt-6 flex flex-wrap gap-2">
        {project.techStack.map((t) => (
          <span key={t} className="chip">
            {t}
          </span>
        ))}
      </div>

      <div className="mt-8 flex gap-4">
        {project.githubUrl && (
          <a href={project.githubUrl} target="_blank" rel="noreferrer" className="btn-ghost">
            View Code
          </a>
        )}
        {project.liveUrl && (
          <a href={project.liveUrl} target="_blank" rel="noreferrer" className="btn-primary">
            Live Demo
          </a>
        )}
      </div>
    </article>
  );
}
