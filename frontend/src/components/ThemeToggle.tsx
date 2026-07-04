import { AnimatePresence, motion } from "framer-motion";
import { useTheme } from "../context/ThemeContext";

// Compact sun/moon toggle with a smooth cross-fade + rotate.
export default function ThemeToggle() {
  const { theme, toggle } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      onClick={toggle}
      aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
      className="relative flex h-9 w-9 items-center justify-center rounded-full border border-hair text-muted transition hover:border-hair-strong hover:text-ink"
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={theme}
          initial={{ rotate: -90, opacity: 0, scale: 0.5 }}
          animate={{ rotate: 0, opacity: 1, scale: 1 }}
          exit={{ rotate: 90, opacity: 0, scale: 0.5 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="absolute text-[15px]"
        >
          {isDark ? "☾" : "☀"}
        </motion.span>
      </AnimatePresence>
    </button>
  );
}
