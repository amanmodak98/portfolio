import { useEffect, useState } from "react";
import {
  deleteMessage,
  getMessages,
  setMessageReplied,
} from "../../services/resources";
import Spinner from "../../components/Spinner";
import type { Message } from "../../types";

export default function MessagesAdmin() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getMessages()
      .then(setMessages)
      .finally(() => setLoading(false));
  }, []);

  const toggleReplied = async (m: Message) => {
    const updated = await setMessageReplied(m.id, !m.replied);
    setMessages((list) => list.map((x) => (x.id === m.id ? updated : x)));
  };

  const remove = async (id: number) => {
    if (!confirm("Delete this message?")) return;
    await deleteMessage(id);
    setMessages((list) => list.filter((x) => x.id !== id));
  };

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold text-white">Messages</h1>
      {loading ? (
        <Spinner />
      ) : messages.length === 0 ? (
        <p className="text-slate-500">No messages yet.</p>
      ) : (
        <div className="space-y-4">
          {messages.map((m) => (
            <div key={m.id} className="card">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="font-medium text-white">{m.subject}</p>
                  <p className="text-sm text-slate-400">
                    {m.name} ·{" "}
                    <a href={`mailto:${m.email}`} className="text-brand-400 hover:underline">
                      {m.email}
                    </a>
                  </p>
                </div>
                <span
                  className={`shrink-0 rounded-full px-2 py-0.5 text-xs ${
                    m.replied
                      ? "bg-green-900/40 text-green-400"
                      : "bg-amber-900/40 text-amber-400"
                  }`}
                >
                  {m.replied ? "Replied" : "New"}
                </span>
              </div>
              <p className="mt-3 whitespace-pre-line text-sm text-slate-300">
                {m.message}
              </p>
              <p className="mt-2 text-xs text-slate-600">
                {new Date(m.createdAt).toLocaleString()}
              </p>
              <div className="mt-3 flex gap-2">
                <button className="btn-ghost" onClick={() => toggleReplied(m)}>
                  Mark as {m.replied ? "unread" : "replied"}
                </button>
                <button
                  className="rounded-lg border border-red-800 px-4 py-2 text-sm text-red-400 hover:bg-red-950"
                  onClick={() => remove(m.id)}
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
