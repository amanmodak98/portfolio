import { useEffect, useState } from "react";
import {
  createProject,
  deleteProject,
  getProjects,
  updateProject,
} from "../../services/resources";
import Spinner from "../../components/Spinner";
import type { Project } from "../../types";

type Draft = {
  id?: number;
  title: string;
  description: string;
  techStack: string;
  githubUrl: string;
  liveUrl: string;
  thumbnail: string;
  featured: boolean;
};

const empty: Draft = {
  title: "",
  description: "",
  techStack: "",
  githubUrl: "",
  liveUrl: "",
  thumbnail: "",
  featured: false,
};

export default function ProjectsAdmin() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [draft, setDraft] = useState<Draft | null>(null);
  const [saving, setSaving] = useState(false);

  const load = () =>
    getProjects()
      .then(setProjects)
      .finally(() => setLoading(false));

  useEffect(() => {
    load();
  }, []);

  const startEdit = (p: Project) =>
    setDraft({
      id: p.id,
      title: p.title,
      description: p.description,
      techStack: p.techStack.join(", "),
      githubUrl: p.githubUrl || "",
      liveUrl: p.liveUrl || "",
      thumbnail: p.thumbnail || "",
      featured: p.featured,
    });

  const save = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!draft) return;
    setSaving(true);
    const payload = {
      title: draft.title,
      description: draft.description,
      techStack: draft.techStack.split(",").map((s) => s.trim()).filter(Boolean),
      githubUrl: draft.githubUrl,
      liveUrl: draft.liveUrl,
      thumbnail: draft.thumbnail,
      featured: draft.featured,
    };
    try {
      if (draft.id) await updateProject(draft.id, payload);
      else await createProject(payload);
      setDraft(null);
      await load();
    } finally {
      setSaving(false);
    }
  };

  const remove = async (id: number) => {
    if (!confirm("Delete this project?")) return;
    await deleteProject(id);
    setProjects((p) => p.filter((x) => x.id !== id));
  };

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-white">Projects</h1>
        <button className="btn-primary" onClick={() => setDraft({ ...empty })}>
          + Add Project
        </button>
      </div>

      {draft && (
        <form onSubmit={save} className="card mb-6 space-y-4">
          <h2 className="font-semibold text-white">
            {draft.id ? "Edit Project" : "New Project"}
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="label">Title</label>
              <input
                className="input"
                required
                value={draft.title}
                onChange={(e) => setDraft({ ...draft, title: e.target.value })}
              />
            </div>
            <div>
              <label className="label">Tech stack (comma-separated)</label>
              <input
                className="input"
                value={draft.techStack}
                onChange={(e) => setDraft({ ...draft, techStack: e.target.value })}
              />
            </div>
          </div>
          <div>
            <label className="label">Description</label>
            <textarea
              className="input min-h-[100px]"
              required
              value={draft.description}
              onChange={(e) => setDraft({ ...draft, description: e.target.value })}
            />
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            <div>
              <label className="label">GitHub URL</label>
              <input
                className="input"
                value={draft.githubUrl}
                onChange={(e) => setDraft({ ...draft, githubUrl: e.target.value })}
              />
            </div>
            <div>
              <label className="label">Live URL</label>
              <input
                className="input"
                value={draft.liveUrl}
                onChange={(e) => setDraft({ ...draft, liveUrl: e.target.value })}
              />
            </div>
            <div>
              <label className="label">Thumbnail URL</label>
              <input
                className="input"
                value={draft.thumbnail}
                onChange={(e) => setDraft({ ...draft, thumbnail: e.target.value })}
              />
            </div>
          </div>
          <label className="flex items-center gap-2 text-sm text-slate-300">
            <input
              type="checkbox"
              checked={draft.featured}
              onChange={(e) => setDraft({ ...draft, featured: e.target.checked })}
            />
            Featured project
          </label>
          <div className="flex gap-3">
            <button className="btn-primary" disabled={saving}>
              {saving ? "Saving…" : "Save"}
            </button>
            <button type="button" className="btn-ghost" onClick={() => setDraft(null)}>
              Cancel
            </button>
          </div>
        </form>
      )}

      {loading ? (
        <Spinner />
      ) : (
        <div className="space-y-3">
          {projects.map((p) => (
            <div key={p.id} className="card flex items-center justify-between">
              <div>
                <p className="font-medium text-white">
                  {p.title}
                  {p.featured && (
                    <span className="ml-2 text-xs text-brand-400">★ featured</span>
                  )}
                </p>
                <p className="text-sm text-slate-500">{p.techStack.join(", ")}</p>
              </div>
              <div className="flex gap-2">
                <button className="btn-ghost" onClick={() => startEdit(p)}>
                  Edit
                </button>
                <button
                  className="rounded-lg border border-red-800 px-4 py-2 text-sm text-red-400 hover:bg-red-950"
                  onClick={() => remove(p.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
