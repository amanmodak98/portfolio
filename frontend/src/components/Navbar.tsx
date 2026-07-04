import { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const links = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/projects", label: "Work" },
  { to: "/certifications", label: "Certifications" },
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
          scrolled ? "border-b border-white/[0.07] bg-[#08090c]/80 backdrop-blur-xl" : ""
        }`}
      >
        <nav className="container-page flex h-16 items-center justify-between">
          <Link to="/" className="text-[15px] font-semibold tracking-tight text-white">
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
                      isActive ? "text-white" : "text-slate-400 hover:text-white"
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

          <button
            className="flex flex-col gap-1.5 md:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            <span className={`h-0.5 w-6 bg-slate-200 transition ${open ? "translate-y-2 rotate-45" : ""}`} />
            <span className={`h-0.5 w-6 bg-slate-200 transition ${open ? "opacity-0" : ""}`} />
            <span className={`h-0.5 w-6 bg-slate-200 transition ${open ? "-translate-y-2 -rotate-45" : ""}`} />
          </button>
        </nav>
      </div>

      {open && (
        <motion.ul
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          className="space-y-1 overflow-hidden border-b border-white/[0.07] bg-[#08090c]/95 px-5 py-3 backdrop-blur-xl md:hidden"
        >
          {[...links, { to: "/contact", label: "Contact" }].map((l) => (
            <li key={l.to}>
              <NavLink
                to={l.to}
                end={l.to === "/"}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `block rounded-lg px-3 py-2.5 text-sm ${
                    isActive ? "bg-white/5 text-white" : "text-slate-300"
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
