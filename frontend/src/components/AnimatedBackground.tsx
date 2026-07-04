// Minimal static backdrop: a soft accent glow at the top and a faint grid.
// Colors come from theme tokens, so it adapts to light/dark automatically.
export default function AnimatedBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-page">
      <div className="absolute left-1/2 top-[-20%] h-[40rem] w-[70rem] -translate-x-1/2 rounded-full bg-brand-600/10 blur-[130px]" />
      <div
        className="absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            "linear-gradient(to right, var(--c-grid) 1px, transparent 1px), linear-gradient(to bottom, var(--c-grid) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
          maskImage:
            "radial-gradient(ellipse 80% 60% at 50% 0%, #000 40%, transparent 100%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 80% 60% at 50% 0%, #000 40%, transparent 100%)",
        }}
      />
    </div>
  );
}
