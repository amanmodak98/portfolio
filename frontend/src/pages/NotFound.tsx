import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="container-page py-32 text-center">
      <p className="text-6xl font-bold text-brand-500">404</p>
      <h1 className="mt-4 text-2xl font-semibold text-ink">Page not found</h1>
      <p className="mt-2 text-muted">
        The page you're looking for doesn't exist.
      </p>
      <Link to="/" className="btn-primary mt-8">
        Back home
      </Link>
    </div>
  );
}
