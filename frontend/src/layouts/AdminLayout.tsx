import { NavLink, Outlet, useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const nav = [
  { to: "/admin", label: "Overview", icon: "▚", end: true },
  { to: "/admin/projects", label: "Projects", icon: "◆" },
  { to: "/admin/blogs", label: "Blog", icon: "✎" },
  { to: "/admin/skills", label: "Skills", icon: "◈" },
  { to: "/admin/experience", label: "Experience", icon: "❖" },
  { to: "/admin/education", label: "Education", icon: "❒" },
  { to: "/admin/certificates", label: "Certificates", icon: "🏅" },
  { to: "/admin/resume", label: "Résumé", icon: "⬇" },
  { to: "/admin/messages", label: "Messages", icon: "✉" },
  { to: "/admin/settings", label: "Settings", icon: "⚙" },
];

export default function AdminLayout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/admin/login");
  };

  return (
    <div className="theme-dark flex min-h-screen bg-page text-fg">
      <aside className="sticky top-0 flex h-screen w-60 flex-col border-r border-white/10 bg-slate-950/60 p-4 backdrop-blur-xl">
        <Link to="/admin" className="mb-6 px-2 text-lg font-bold text-white">
          Admin<span className="gradient-text">Panel</span>
        </Link>
        <nav className="flex-1 space-y-1 overflow-y-auto">
          {nav.map((n) => (
            <NavLink
              key={n.to}
              to={n.to}
              end={n.end}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-xl px-3 py-2 text-sm transition ${
                  isActive
                    ? "bg-gradient-to-r from-brand-600/80 to-accent-500/60 text-white shadow-glow"
                    : "text-slate-400 hover:bg-white/5 hover:text-white"
                }`
              }
            >
              <span className="w-4 text-center opacity-80">{n.icon}</span>
              {n.label}
            </NavLink>
          ))}
        </nav>
        <div className="mt-4 space-y-2 border-t border-white/10 pt-4">
          <Link to="/" className="block px-3 text-xs text-slate-500 hover:text-brand-300">
            ← View site
          </Link>
          <p className="truncate px-3 text-xs text-slate-500">{user?.email}</p>
          <button
            onClick={handleLogout}
            className="w-full rounded-xl px-3 py-2 text-left text-sm text-slate-300 transition hover:bg-white/5"
          >
            Log out
          </button>
        </div>
      </aside>
      <main className="flex-1 overflow-auto p-6 lg:p-10">
        <div className="mx-auto max-w-4xl">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
