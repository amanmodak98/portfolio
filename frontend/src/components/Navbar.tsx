import { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import ThemeToggle from "./ThemeToggle";

const links = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/projects", label: "Work" },
  { to: "/blog", label: "Blog" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="sticky top-0 z-40"
    >
      <div
        className={`transition-all duration-300 ${
          scrolled ? "nav-blur border-b border-hair" : ""
        }`}
      >
        <nav className="container-page flex h-16 items-center justify-between">
          <Link to="/" className="text-[15px] font-semibold tracking-tight text-ink">
            {`{`}
            <span className="text-brand-400">dev</span>
            {`}`}
          </Link>

          <ul className="hidden items-center gap-1 md:flex">
            {links.map((l) => (
              <li key={l.to}>
                <NavLink
                  to={l.to}
                  end={l.to === "/"}
                  className={({ isActive }) =>
                    `rounded-full px-3.5 py-1.5 text-sm transition ${
                      isActive ? "text-ink" : "text-muted hover:text-ink"
                    }`
                  }
                >
                  {l.label}
                </NavLink>
              </li>
            ))}
          </ul>

          <div className="hidden items-center gap-3 md:flex">
            <button onClick={() => navigate("/contact")} className="btn-primary">
              Let's talk
            </button>
          </div>

          <div className="flex items-center gap-2 md:hidden">
            <ThemeToggle />
            <button
              className="flex flex-col gap-1.5"
              onClick={() => setOpen((v) => !v)}
              aria-label="Toggle menu"
            >
              <span className={`h-0.5 w-6 bg-current text-ink transition ${open ? "translate-y-2 rotate-45" : ""}`} />
              <span className={`h-0.5 w-6 bg-current text-ink transition ${open ? "opacity-0" : ""}`} />
              <span className={`h-0.5 w-6 bg-current text-ink transition ${open ? "-translate-y-2 -rotate-45" : ""}`} />
            </button>
          </div>
        </nav>
      </div>

      {open && (
        <motion.ul
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          className="nav-blur space-y-1 overflow-hidden border-b border-hair px-5 py-3 md:hidden"
        >
          {[...links, { to: "/contact", label: "Contact" }].map((l) => (
            <li key={l.to}>
              <NavLink
                to={l.to}
                end={l.to === "/"}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `block rounded-lg px-3 py-2.5 text-sm ${
                    isActive ? "bg-surface-2 text-ink" : "text-fg"
                  }`
                }
              >
                {l.label}
              </NavLink>
            </li>
          ))}
        </motion.ul>
      )}
    </motion.header>
  );
}
