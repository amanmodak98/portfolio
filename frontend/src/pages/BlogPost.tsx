import { Link, useParams } from "react-router-dom";
import { useFetch } from "../hooks/useFetch";
import { getBlogBySlug } from "../services/resources";
import Spinner from "../components/Spinner";
import { uploadsUrl } from "../services/api";

const fmt = (d: string) =>
  new Date(d).toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

export default function BlogPost() {
  const { slug } = useParams();
  const { data: blog, loading, error } = useFetch(
    () => getBlogBySlug(slug!),
    [slug]
  );

  if (loading) return <Spinner label="Loading article…" />;
  if (error || !blog)
    return (
      <div className="container-page py-24 text-center">
        <p className="text-muted">Article not found.</p>
        <Link to="/blog" className="btn-ghost mt-6">
          Back to blog
        </Link>
      </div>
    );

  return (
    <article className="container-page max-w-3xl py-16">
      <Link to="/blog" className="text-sm text-brand-400 hover:underline">
        ← Back to blog
      </Link>
      {blog.category && (
        <p className="mt-4 text-sm font-semibold uppercase tracking-wide text-brand-400">
          {blog.category}
        </p>
      )}
      <h1 className="mt-2 text-3xl font-bold text-ink sm:text-4xl">{blog.title}</h1>
      <p className="mt-2 text-sm text-faint">{fmt(blog.createdAt)}</p>

      {blog.coverImage && (
        <img
          src={uploadsUrl(blog.coverImage)}
          alt={blog.title}
          className="mt-6 w-full rounded-xl object-cover"
        />
      )}

      <div className="prose prose-invert mt-8 max-w-none whitespace-pre-line leading-relaxed text-fg">
        {blog.content}
      </div>

      <div className="mt-8 flex flex-wrap gap-2">
        {blog.tags.map((t) => (
          <span key={t} className="chip">
            #{t}
          </span>
        ))}
      </div>
    </article>
  );
}
