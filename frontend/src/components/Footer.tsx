import { Link } from "react-router-dom";
import { useSettings } from "../context/SettingsContext";

export default function Footer() {
  const { settings } = useSettings();
  const socials = [
    { label: "GitHub", href: settings.githubUrl },
    { label: "LinkedIn", href: settings.linkedinUrl },
    { label: "Twitter", href: settings.twitterUrl },
    { label: "Email", href: settings.email ? `mailto:${settings.email}` : null },
  ].filter((s) => s.href);

  return (
    <footer className="mt-24 border-t border-hair py-10">
      <div className="container-page flex flex-col items-center justify-between gap-6 sm:flex-row">
        <div className="text-center sm:text-left">
          <Link to="/" className="text-lg font-bold text-ink">
            dev<span className="gradient-text">.folio</span>
          </Link>
          <p className="mt-1 text-sm text-faint">
            © {new Date().getFullYear()} {settings.fullName}. Built with React &amp; Node.
          </p>
        </div>
        <div className="flex flex-wrap justify-center gap-3">
          {socials.map((s) => (
            <a
              key={s.label}
              href={s.href!}
              target="_blank"
              rel="noreferrer"
              className="chip transition hover:border-brand-400/50 hover:text-ink"
            >
              {s.label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
