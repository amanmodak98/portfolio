import { motion } from "framer-motion";
import type { Skill } from "../types";

export default function SkillBar({ skill }: { skill: Skill }) {
  return (
    <div>
      <div className="mb-1.5 flex justify-between text-sm">
        <span className="font-medium text-fg">{skill.name}</span>
        <span className="text-faint">{skill.percentage}%</span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-surface-2">
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-brand-500 to-accent-400 shadow-glow"
          initial={{ width: 0 }}
          whileInView={{ width: `${skill.percentage}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>
    </div>
  );
}
