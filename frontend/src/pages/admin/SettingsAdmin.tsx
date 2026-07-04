import { useEffect, useState } from "react";
import { getSettings, updateSettings } from "../../services/resources";
import Spinner from "../../components/Spinner";
import type { SiteSettings } from "../../types";

type FormState = Record<keyof Omit<SiteSettings, "id" | "updatedAt">, string>;

const fieldGroups: { title: string; fields: { name: keyof FormState; label: string; type?: string; full?: boolean }[] }[] = [
  {
    title: "Profile",
    fields: [
      { name: "fullName", label: "Full name" },
      { name: "role", label: "Role / title" },
      { name: "tagline", label: "Hero tagline", full: true },
      { name: "bio", label: "About bio", full: true },
      { name: "location", label: "Location" },
      { name: "email", label: "Contact email", type: "email" },
    ],
  },
  {
    title: "Links",
    fields: [
      { name: "githubUrl", label: "GitHub URL" },
      { name: "linkedinUrl", label: "LinkedIn URL" },
      { name: "twitterUrl", label: "Twitter URL" },
      { name: "resumeUrl", label: "Résumé URL / path" },
    ],
  },
];

export default function SettingsAdmin() {
  const [form, setForm] = useState<FormState | null>(null);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    getSettings().then((s) =>
      setForm({
        fullName: s.fullName,
        role: s.role,
        tagline: s.tagline,
        bio: s.bio,
        location: s.location || "",
        email: s.email,
        githubUrl: s.githubUrl || "",
        linkedinUrl: s.linkedinUrl || "",
        twitterUrl: s.twitterUrl || "",
        resumeUrl: s.resumeUrl || "",
      })
    );
  }, []);

  const save = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form) return;
    setSaving(true);
    setSaved(false);
    try {
      await updateSettings(form);
      setSaved(true);
    } finally {
      setSaving(false);
    }
  };

  if (!form) return <Spinner />;

  return (
    <div>
      <h1 className="mb-2 text-2xl font-bold text-white">Site Settings</h1>
      <p className="mb-6 text-sm text-slate-500">
        These values drive the hero, about section, contact page, and footer.
      </p>

      <form onSubmit={save} className="space-y-6">
        {fieldGroups.map((group) => (
          <div key={group.title} className="card">
            <h2 className="mb-4 font-semibold text-brand-300">{group.title}</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {group.fields.map((f) => (
                <div key={f.name} className={f.full ? "sm:col-span-2" : ""}>
                  <label className="label">{f.label}</label>
                  {f.name === "bio" || f.name === "tagline" ? (
                    <textarea
                      className="input min-h-[90px]"
                      value={form[f.name]}
                      onChange={(e) => setForm({ ...form, [f.name]: e.target.value })}
                    />
                  ) : (
                    <input
                      className="input"
                      type={f.type || "text"}
                      value={form[f.name]}
                      onChange={(e) => setForm({ ...form, [f.name]: e.target.value })}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}

        <div className="flex items-center gap-4">
          <button className="btn-primary" disabled={saving}>
            {saving ? "Saving…" : "Save changes"}
          </button>
          {saved && <span className="text-sm text-green-400">✓ Saved</span>}
        </div>
      </form>
    </div>
  );
}
