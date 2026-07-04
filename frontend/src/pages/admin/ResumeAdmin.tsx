import { useState } from "react";
import { uploadFile } from "../../services/resources";
import { uploadsUrl } from "../../services/api";

type Version = { url: string; name: string; uploadedAt: string };

const STORAGE_KEY = "resumeVersions";

const loadVersions = (): Version[] => {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
  } catch {
    return [];
  }
};

export default function ResumeAdmin() {
  const [versions, setVersions] = useState<Version[]>(loadVersions);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    setError("");
    try {
      const { url } = await uploadFile(file);
      const next = [
        { url, name: file.name, uploadedAt: new Date().toISOString() },
        ...versions,
      ];
      setVersions(next);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {
      setError("Upload failed. Make sure you're logged in.");
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  };

  const current = versions[0];

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold text-white">Resume Management</h1>

      <div className="card mb-6">
        <p className="mb-3 text-sm text-slate-400">
          Upload a new résumé (PDF). The most recent upload is the active
          version shown on the public site.
        </p>
        <label className="btn-primary cursor-pointer">
          {uploading ? "Uploading…" : "Upload résumé"}
          <input
            type="file"
            accept="application/pdf"
            hidden
            onChange={handleUpload}
            disabled={uploading}
          />
        </label>
        {error && <p className="mt-3 text-sm text-red-400">{error}</p>}
        {current && (
          <p className="mt-3 text-sm text-slate-300">
            Active:{" "}
            <a
              href={uploadsUrl(current.url)}
              target="_blank"
              rel="noreferrer"
              className="text-brand-400 hover:underline"
            >
              {current.name}
            </a>
          </p>
        )}
      </div>

      <h2 className="mb-3 font-semibold text-white">Version history</h2>
      {versions.length === 0 ? (
        <p className="text-slate-500">No résumé uploaded yet.</p>
      ) : (
        <div className="space-y-2">
          {versions.map((v, i) => (
            <div key={v.url} className="card flex items-center justify-between">
              <div>
                <p className="text-sm text-white">
                  {v.name}
                  {i === 0 && (
                    <span className="ml-2 text-xs text-green-400">active</span>
                  )}
                </p>
                <p className="text-xs text-slate-500">
                  {new Date(v.uploadedAt).toLocaleString()}
                </p>
              </div>
              <a
                href={uploadsUrl(v.url)}
                target="_blank"
                rel="noreferrer"
                className="btn-ghost"
              >
                View
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
