import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useFetch } from "../hooks/useFetch";
import { getBlogs } from "../services/resources";
import SectionHeading from "../components/SectionHeading";
import Reveal from "../components/Reveal";
import Spinner from "../components/Spinner";

const fmt = (d: string) =>
  new Date(d).toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

export default function Blog() {
  const { data: blogs, loading } = useFetch(() => getBlogs(), []);
  const [tag, setTag] = useState("");

  const tags = useMemo(
    () => Array.from(new Set((blogs || []).flatMap((b) => b.tags))).sort(),
    [blogs]
  );

  const filtered = (blogs || []).filter((b) => !tag || b.tags.includes(tag));

  return (
    <div className="container-page py-16">
      <SectionHeading eyebrow="Writing" title="Blog" subtitle="Technical articles and notes." />

      {tags.length > 0 && (
        <div className="mb-10 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => setTag("")}
            className={`rounded-full px-4 py-1.5 text-sm transition ${
              !tag ? "bg-gradient-to-r from-brand-600 to-accent-500 text-ink" : "chip hover:text-ink"
            }`}
          >
            All
          </button>
          {tags.map((t) => (
            <button
              key={t}
              onClick={() => setTag(t)}
              className={`rounded-full px-4 py-1.5 text-sm transition ${
                tag === t
                  ? "bg-gradient-to-r from-brand-600 to-accent-500 text-ink"
                  : "chip hover:text-ink"
              }`}
            >
              #{t}
            </button>
          ))}
        </div>
      )}

      {loading ? (
        <Spinner />
      ) : filtered.length ? (
        <div className="grid gap-6 md:grid-cols-2">
          {filtered.map((b, i) => (
            <Reveal key={b.id} delay={i * 0.06}>
              <Link
                to={`/blog/${b.slug}`}
                className="card card-hover group block h-full"
              >
                {b.category && (
                  <span className="text-xs font-semibold uppercase tracking-wide text-accent-400">
                    {b.category}
                  </span>
                )}
                <h3 className="mt-1 text-lg font-semibold text-ink transition group-hover:text-brand-300">
                  {b.title}
                </h3>
                <p className="mt-1 text-xs text-faint">{fmt(b.createdAt)}</p>
                <p className="mt-3 line-clamp-3 text-sm text-muted">{b.content}</p>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {b.tags.map((t) => (
                    <span key={t} className="chip">
                      #{t}
                    </span>
                  ))}
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      ) : (
        <p className="py-16 text-center text-faint">No articles yet.</p>
      )}
    </div>
  );
}
