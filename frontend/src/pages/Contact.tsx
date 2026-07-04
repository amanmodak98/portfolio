import { useState } from "react";
import { sendMessage } from "../services/resources";
import { useSettings } from "../context/SettingsContext";
import SectionHeading from "../components/SectionHeading";
import Reveal from "../components/Reveal";

export default function Contact() {
  const { settings } = useSettings();
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const socials = [
    { label: "Email", value: settings.email, href: `mailto:${settings.email}`, icon: "✉️" },
    { label: "GitHub", value: "View profile", href: settings.githubUrl, icon: "🐙" },
    { label: "LinkedIn", value: "Connect", href: settings.linkedinUrl, icon: "💼" },
    { label: "Twitter", value: "Follow", href: settings.twitterUrl, icon: "🐦" },
  ].filter((s) => s.href);

  const update =
    (k: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm({ ...form, [k]: e.target.value });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    try {
      await sendMessage(form);
      setStatus("sent");
      setForm({ name: "", email: "", subject: "", message: "" });
    } catch {
      setStatus("error");
    }
  };

  return (
    <div className="container-page py-16">
      <SectionHeading
        eyebrow="Say hello"
        title="Get in Touch"
        subtitle="Have a project in mind or just want to chat? Send me a message."
      />

      <div className="mx-auto grid max-w-4xl gap-8 lg:grid-cols-[1fr_1.4fr]">
        <Reveal direction="right">
          <div className="space-y-4">
            <p className="text-muted">
              I'm open to freelance work, full-time roles, and interesting
              collaborations. I'll get back to you as soon as I can.
            </p>
            <div className="space-y-3">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href!}
                  target="_blank"
                  rel="noreferrer"
                  className="card card-hover flex items-center gap-3 !p-4"
                >
                  <span className="text-xl">{s.icon}</span>
                  <span>
                    <span className="block text-sm font-medium text-ink">{s.label}</span>
                    <span className="block text-xs text-faint">{s.value}</span>
                  </span>
                </a>
              ))}
            </div>
          </div>
        </Reveal>

        <Reveal direction="left">
          <form onSubmit={handleSubmit} className="card space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="label">Name</label>
                <input className="input" required value={form.name} onChange={update("name")} />
              </div>
              <div>
                <label className="label">Email</label>
                <input className="input" type="email" required value={form.email} onChange={update("email")} />
              </div>
            </div>
            <div>
              <label className="label">Subject</label>
              <input className="input" required value={form.subject} onChange={update("subject")} />
            </div>
            <div>
              <label className="label">Message</label>
              <textarea className="input min-h-[140px]" required value={form.message} onChange={update("message")} />
            </div>
            <button className="btn-primary w-full" disabled={status === "sending"}>
              {status === "sending" ? "Sending…" : "Send message"}
            </button>
            {status === "sent" && (
              <p className="text-sm text-green-400">Thanks! Your message has been sent.</p>
            )}
            {status === "error" && (
              <p className="text-sm text-red-400">Something went wrong. Please try again.</p>
            )}
          </form>
        </Reveal>
      </div>
    </div>
  );
}
