import { useEffect, useState } from "react";
import {
  createBlog,
  deleteBlog,
  getAllBlogs,
  updateBlog,
} from "../../services/resources";
import Spinner from "../../components/Spinner";
import type { Blog, BlogStatus } from "../../types";

type Draft = {
  id?: number;
  title: string;
  content: string;
  tags: string;
  category: string;
  coverImage: string;
  status: BlogStatus;
};

const empty: Draft = {
  title: "",
  content: "",
  tags: "",
  category: "",
  coverImage: "",
  status: "DRAFT",
};

export default function BlogAdmin() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [draft, setDraft] = useState<Draft | null>(null);
  const [saving, setSaving] = useState(false);

  const load = () =>
    getAllBlogs()
      .then(setBlogs)
      .finally(() => setLoading(false));

  useEffect(() => {
    load();
  }, []);

  const startEdit = (b: Blog) =>
    setDraft({
      id: b.id,
      title: b.title,
      content: b.content,
      tags: b.tags.join(", "),
      category: b.category || "",
      coverImage: b.coverImage || "",
      status: b.status,
    });

  const save = async (status: BlogStatus) => {
    if (!draft) return;
    setSaving(true);
    const payload = {
      title: draft.title,
      content: draft.content,
      tags: draft.tags.split(",").map((s) => s.trim()).filter(Boolean),
      category: draft.category,
      coverImage: draft.coverImage,
      status,
    };
    try {
      if (draft.id) await updateBlog(draft.id, payload);
      else await createBlog(payload);
      setDraft(null);
      await load();
    } finally {
      setSaving(false);
    }
  };

  const remove = async (id: number) => {
    if (!confirm("Delete this post?")) return;
    await deleteBlog(id);
    setBlogs((b) => b.filter((x) => x.id !== id));
  };

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-white">Blog</h1>
        <button className="btn-primary" onClick={() => setDraft({ ...empty })}>
          + New Post
        </button>
      </div>

      {draft && (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            save(draft.status);
          }}
          className="card mb-6 space-y-4"
        >
          <h2 className="font-semibold text-white">
            {draft.id ? "Edit Post" : "New Post"}
          </h2>
          <div>
            <label className="label">Title</label>
            <input
              className="input"
              required
              value={draft.title}
              onChange={(e) => setDraft({ ...draft, title: e.target.value })}
            />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="label">Category</label>
              <input
                className="input"
                value={draft.category}
                onChange={(e) => setDraft({ ...draft, category: e.target.value })}
              />
            </div>
            <div>
              <label className="label">Tags (comma-separated)</label>
              <input
                className="input"
                value={draft.tags}
                onChange={(e) => setDraft({ ...draft, tags: e.target.value })}
              />
            </div>
          </div>
          <div>
            <label className="label">Cover image URL</label>
            <input
              className="input"
              value={draft.coverImage}
              onChange={(e) => setDraft({ ...draft, coverImage: e.target.value })}
            />
          </div>
          <div>
            <label className="label">Content</label>
            <textarea
              className="input min-h-[200px]"
              required
              value={draft.content}
              onChange={(e) => setDraft({ ...draft, content: e.target.value })}
            />
          </div>
          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              className="btn-ghost"
              disabled={saving}
              onClick={() => save("DRAFT")}
            >
              Save as Draft
            </button>
            <button
              type="button"
              className="btn-primary"
              disabled={saving}
              onClick={() => save("PUBLISHED")}
            >
              Publish
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
          {blogs.map((b) => (
            <div key={b.id} className="card flex items-center justify-between">
              <div>
                <p className="font-medium text-white">{b.title}</p>
                <p className="text-sm text-slate-500">
                  <span
                    className={
                      b.status === "PUBLISHED" ? "text-green-400" : "text-amber-400"
                    }
                  >
                    {b.status}
                  </span>
                  {b.category && ` · ${b.category}`}
                </p>
              </div>
              <div className="flex gap-2">
                <button className="btn-ghost" onClick={() => startEdit(b)}>
                  Edit
                </button>
                <button
                  className="rounded-lg border border-red-800 px-4 py-2 text-sm text-red-400 hover:bg-red-950"
                  onClick={() => remove(b.id)}
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
