import { useEffect, useState } from "react";
import {
  createCertificate,
  deleteCertificate,
  getCertificates,
  updateCertificate,
} from "../../services/resources";
import Spinner from "../../components/Spinner";
import type { Certificate } from "../../types";

type Draft = {
  id?: number;
  title: string;
  issuer: string;
  issueDate: string;
  imageUrl: string;
  verifyUrl: string;
};

const empty: Draft = {
  title: "",
  issuer: "",
  issueDate: "",
  imageUrl: "",
  verifyUrl: "",
};

const toDateInput = (iso: string) => iso.slice(0, 10);

export default function CertificatesAdmin() {
  const [certs, setCerts] = useState<Certificate[]>([]);
  const [loading, setLoading] = useState(true);
  const [draft, setDraft] = useState<Draft | null>(null);
  const [saving, setSaving] = useState(false);

  const load = () =>
    getCertificates()
      .then(setCerts)
      .finally(() => setLoading(false));

  useEffect(() => {
    load();
  }, []);

  const startEdit = (c: Certificate) =>
    setDraft({
      id: c.id,
      title: c.title,
      issuer: c.issuer,
      issueDate: toDateInput(c.issueDate),
      imageUrl: c.imageUrl || "",
      verifyUrl: c.verifyUrl || "",
    });

  const save = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!draft) return;
    setSaving(true);
    const payload = {
      title: draft.title,
      issuer: draft.issuer,
      issueDate: draft.issueDate,
      imageUrl: draft.imageUrl,
      verifyUrl: draft.verifyUrl,
    };
    try {
      if (draft.id) await updateCertificate(draft.id, payload);
      else await createCertificate(payload);
      setDraft(null);
      await load();
    } finally {
      setSaving(false);
    }
  };

  const remove = async (id: number) => {
    if (!confirm("Delete this certificate?")) return;
    await deleteCertificate(id);
    setCerts((c) => c.filter((x) => x.id !== id));
  };

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-white">Certificates</h1>
        <button className="btn-primary" onClick={() => setDraft({ ...empty })}>
          + Add Certificate
        </button>
      </div>

      {draft && (
        <form onSubmit={save} className="card mb-6 space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="label">Title</label>
              <input
                className="input"
                required
                value={draft.title}
                onChange={(e) => setDraft({ ...draft, title: e.target.value })}
              />
            </div>
            <div>
              <label className="label">Issuer</label>
              <input
                className="input"
                required
                value={draft.issuer}
                onChange={(e) => setDraft({ ...draft, issuer: e.target.value })}
              />
            </div>
            <div>
              <label className="label">Issue date</label>
              <input
                className="input"
                type="date"
                required
                value={draft.issueDate}
                onChange={(e) => setDraft({ ...draft, issueDate: e.target.value })}
              />
            </div>
            <div>
              <label className="label">Verify URL</label>
              <input
                className="input"
                value={draft.verifyUrl}
                onChange={(e) => setDraft({ ...draft, verifyUrl: e.target.value })}
              />
            </div>
            <div className="sm:col-span-2">
              <label className="label">Image URL</label>
              <input
                className="input"
                value={draft.imageUrl}
                onChange={(e) => setDraft({ ...draft, imageUrl: e.target.value })}
              />
            </div>
          </div>
          <div className="flex gap-3">
            <button className="btn-primary" disabled={saving}>
              {saving ? "Saving…" : "Save"}
            </button>
            <button type="button" className="btn-ghost" onClick={() => setDraft(null)}>
              Cancel
            </button>
          </div>
        </form>
      )}

      {loading ? (
        <Spinner />
      ) : (
        <div className="space-y-3">
          {certs.map((c) => (
            <div key={c.id} className="card flex items-center justify-between">
              <div>
                <p className="font-medium text-white">{c.title}</p>
                <p className="text-sm text-slate-500">{c.issuer}</p>
              </div>
              <div className="flex gap-2">
                <button className="btn-ghost" onClick={() => startEdit(c)}>
                  Edit
                </button>
                <button
                  className="rounded-lg border border-red-800 px-4 py-2 text-sm text-red-400 hover:bg-red-950"
                  onClick={() => remove(c.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
