import { motion } from "framer-motion";
import type { ReactNode } from "react";

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.08, delayChildren: 0.05 },
  },
};

const word = {
  hidden: { y: "110%" },
  show: {
    y: "0%",
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
  },
};

// Animates a heading in word-by-word with a clean clip-mask "rise" — the
// signature premium landing-page headline reveal.
export default function TextReveal({
  text,
  className,
  as: Tag = "h1",
  highlight,
}: {
  text: string;
  className?: string;
  as?: "h1" | "h2" | "p";
  highlight?: string;
}) {
  const words = text.split(" ");
  const MotionTag = motion[Tag];

  return (
    <MotionTag
      variants={container}
      initial="hidden"
      animate="show"
      className={className}
    >
      {words.map((w, i) => (
        <span key={i} className="inline-block overflow-hidden pb-[0.12em] align-bottom">
          <motion.span
            variants={word}
            className={`inline-block ${
              highlight && w === highlight ? "gradient-text" : ""
            }`}
          >
            {w}
            {i < words.length - 1 ? " " : ""}
          </motion.span>
        </span>
      ))}
    </MotionTag>
  );
}

// Simple staggered fade-up wrapper for grouped content beneath a headline.
export function Stagger({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
