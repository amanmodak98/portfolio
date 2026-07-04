import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Spinner from "../Spinner";

export type Field = {
  name: string;
  label: string;
  type?: "text" | "textarea" | "number" | "date" | "select";
  options?: string[];
  required?: boolean;
  full?: boolean;
  placeholder?: string;
};

type WithId = { id: number };

interface Props<T extends WithId> {
  title: string;
  fields: Field[];
  api: {
    list: () => Promise<T[]>;
    create: (data: Partial<T>) => Promise<T>;
    update: (id: number, data: Partial<T>) => Promise<T>;
    remove: (id: number) => Promise<unknown>;
  };
  toForm: (item: T) => Record<string, string>;
  empty: Record<string, string>;
  toPayload?: (form: Record<string, string>) => Partial<T>;
  primary: (item: T) => string;
  secondary?: (item: T) => string;
  addLabel?: string;
}

// Generic list + add/edit form + delete manager for simple admin resources.
export default function CrudManager<T extends WithId>({
  title,
  fields,
  api,
  toForm,
  empty,
  toPayload,
  primary,
  secondary,
  addLabel = "Add",
}: Props<T>) {
  const [items, setItems] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState<Record<string, string> | null>(null);
  const [editId, setEditId] = useState<number | null>(null);
  const [saving, setSaving] = useState(false);

  const load = () =>
    api
      .list()
      .then(setItems)
      .finally(() => setLoading(false));

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const startAdd = () => {
    setEditId(null);
    setForm({ ...empty });
  };
  const startEdit = (item: T) => {
    setEditId(item.id);
    setForm(toForm(item));
  };

  const save = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form) return;
    setSaving(true);
    const payload = (toPayload ? toPayload(form) : form) as Partial<T>;
    try {
      if (editId) await api.update(editId, payload);
      else await api.create(payload);
      setForm(null);
      setEditId(null);
      await load();
    } finally {
      setSaving(false);
    }
  };

  const remove = async (id: number) => {
    if (!confirm(`Delete this ${title.toLowerCase().replace(/s$/, "")}?`)) return;
    await api.remove(id);
    setItems((list) => list.filter((x) => x.id !== id));
  };

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-white">{title}</h1>
        <button className="btn-primary" onClick={startAdd}>
          + {addLabel}
        </button>
      </div>

      <AnimatePresence>
        {form && (
          <motion.form
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            onSubmit={save}
            className="card mb-6 space-y-4 overflow-hidden"
          >
            <h2 className="font-semibold text-white">
              {editId ? "Edit" : "New"} {title.replace(/s$/, "")}
            </h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {fields.map((f) => (
                <div key={f.name} className={f.full ? "sm:col-span-2" : ""}>
                  <label className="label">{f.label}</label>
                  {f.type === "textarea" ? (
                    <textarea
                      className="input min-h-[100px]"
                      required={f.required}
                      placeholder={f.placeholder}
                      value={form[f.name] ?? ""}
                      onChange={(e) => setForm({ ...form, [f.name]: e.target.value })}
                    />
                  ) : f.type === "select" ? (
                    <select
                      className="input"
                      value={form[f.name] ?? ""}
                      onChange={(e) => setForm({ ...form, [f.name]: e.target.value })}
                    >
                      {(f.options || []).map((o) => (
                        <option key={o} value={o}>
                          {o}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <input
                      className="input"
                      type={f.type || "text"}
                      required={f.required}
                      placeholder={f.placeholder}
                      value={form[f.name] ?? ""}
                      onChange={(e) => setForm({ ...form, [f.name]: e.target.value })}
                    />
                  )}
                </div>
              ))}
            </div>
            <div className="flex gap-3">
              <button className="btn-primary" disabled={saving}>
                {saving ? "Saving…" : "Save"}
              </button>
              <button
                type="button"
                className="btn-ghost"
                onClick={() => {
                  setForm(null);
                  setEditId(null);
                }}
              >
                Cancel
              </button>
            </div>
          </motion.form>
        )}
      </AnimatePresence>

      {loading ? (
        <Spinner />
      ) : items.length === 0 ? (
        <p className="py-10 text-center text-slate-500">Nothing here yet.</p>
      ) : (
        <div className="space-y-3">
          {items.map((item) => (
            <motion.div
              key={item.id}
              layout
              className="card flex items-center justify-between !py-4"
            >
              <div>
                <p className="font-medium text-white">{primary(item)}</p>
                {secondary && (
                  <p className="text-sm text-slate-500">{secondary(item)}</p>
                )}
              </div>
              <div className="flex gap-2">
                <button className="btn-ghost !px-4 !py-2 text-sm" onClick={() => startEdit(item)}>
                  Edit
                </button>
                <button className="btn-danger" onClick={() => remove(item.id)}>
                  Delete
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
