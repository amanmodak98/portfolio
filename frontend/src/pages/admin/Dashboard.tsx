import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useFetch } from "../../hooks/useFetch";
import { getDashboard } from "../../services/resources";
import Counter from "../../components/Counter";
import Spinner from "../../components/Spinner";

const cards = [
  { key: "visitors", label: "Total Visitors", icon: "👀", to: "/admin" },
  { key: "projects", label: "Projects", icon: "◆", to: "/admin/projects" },
  { key: "blogs", label: "Blog Posts", icon: "✎", to: "/admin/blogs" },
  { key: "certificates", label: "Certificates", icon: "🏅", to: "/admin/certificates" },
  { key: "messages", label: "Messages", icon: "✉", to: "/admin/messages" },
  { key: "unreadMessages", label: "Unread Messages", icon: "●", to: "/admin/messages" },
] as const;

const quick = [
  { to: "/admin/projects", label: "New Project" },
  { to: "/admin/blogs", label: "New Post" },
  { to: "/admin/settings", label: "Edit Profile" },
];

export default function Dashboard() {
  const { data, loading } = useFetch(getDashboard, []);

  return (
    <div>
      <h1 className="mb-1 text-2xl font-bold text-white">Dashboard</h1>
      <p className="mb-6 text-sm text-slate-500">Welcome back — here's your site at a glance.</p>

      {loading || !data ? (
        <Spinner />
      ) : (
        <>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {cards.map((c, i) => (
              <motion.div
                key={c.key}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06 }}
              >
                <Link to={c.to} className="card card-hover block">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-400">{c.label}</span>
                    <span className="text-lg opacity-70">{c.icon}</span>
                  </div>
                  <p className="mt-3 text-4xl font-extrabold gradient-text">
                    <Counter value={data[c.key]} />
                  </p>
                </Link>
              </motion.div>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            {quick.map((q) => (
              <Link key={q.to} to={q.to} className="btn-ghost">
                {q.label}
              </Link>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
