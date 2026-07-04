import { useRef, type ReactNode } from "react";
import { Link } from "react-router-dom";
import { motion, useMotionValue, useSpring } from "framer-motion";

// A button/link that subtly leans toward the cursor, then springs back —
// a restrained "magnetic" micro-interaction used on premium CTAs.
export default function MagneticButton({
  children,
  to,
  href,
  className = "btn-primary",
  download,
  strength = 0.35,
}: {
  children: ReactNode;
  to?: string;
  href?: string;
  className?: string;
  download?: boolean;
  strength?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 250, damping: 15 });
  const sy = useSpring(y, { stiffness: 250, damping: 15 });

  const onMove = (e: React.PointerEvent) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    x.set((e.clientX - (rect.left + rect.width / 2)) * strength);
    y.set((e.clientY - (rect.top + rect.height / 2)) * strength);
  };
  const reset = () => {
    x.set(0);
    y.set(0);
  };

  const inner =
    to != null ? (
      <Link to={to} className={className}>
        {children}
      </Link>
    ) : (
      <a href={href} className={className} download={download}>
        {children}
      </a>
    );

  return (
    <motion.div
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={reset}
      style={{ x: sx, y: sy }}
      className="inline-block"
    >
      {inner}
    </motion.div>
  );
}
