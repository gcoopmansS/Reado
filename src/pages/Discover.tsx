import { useState } from "react";
import { searchBooks } from "../lib/googleBooks";
import type { Book } from "../types/Book";
import { addBook } from "../lib/libraryStore";

export default function Discover() {
  const [q, setQ] = useState("");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<Book[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [added, setAdded] = useState<Record<string, boolean>>({});

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const data = await searchBooks(q, 24);
      setResults(data);
    } catch (err: any) {
      setError(err?.message || "Search failed");
    } finally {
      setLoading(false);
    }
  }

  function onAdd(b: Book) {
    addBook(b, "want");
    setAdded((prev) => ({ ...prev, [b.id]: true }));
  }

  return (
    <div className="p-4 space-y-6">
      <h2 className="text-2xl font-bold">🔎 Discover</h2>

      <form onSubmit={onSubmit} className="flex gap-2">
        <input
          className="flex-1 border rounded-lg p-2"
          placeholder="Search by title, author, or ISBN…"
          value={q}
          onChange={(e) => setQ(e.target.value)}
        />
        <button
          className="px-4 py-2 rounded-lg bg-indigo-600 text-white disabled:opacity-50"
          disabled={loading || !q.trim()}
        >
          {loading ? "Searching…" : "Search"}
        </button>
      </form>

      {error && <p className="text-red-600">{error}</p>}

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {results.map((b) => (
          <div key={b.id} className="rounded-xl shadow p-4 bg-white/70 border">
            <div className="flex gap-4">
              {b.coverUrl ? (
                <img
                  src={b.coverUrl}
                  alt={b.title}
                  className="w-20 h-28 object-cover rounded"
                />
              ) : (
                <div className="w-20 h-28 rounded bg-gray-200 grid place-items-center text-xs text-gray-500">
                  No cover
                </div>
              )}
              <div className="flex-1">
                <h3 className="font-semibold leading-snug">{b.title}</h3>
                <p className="text-sm text-gray-600">{b.author}</p>
                {b.pageCount ? (
                  <p className="text-xs text-gray-500 mt-1">
                    {b.pageCount} pages
                  </p>
                ) : null}
              </div>
            </div>

            <div className="mt-4 flex items-center gap-2">
              <button
                onClick={() => onAdd(b)}
                disabled={!!added[b.id]}
                className="px-3 py-1.5 rounded-lg bg-emerald-600 text-white text-sm disabled:opacity-60"
              >
                {added[b.id] ? "Added" : "Add to Library"}
              </button>
              {b.isbn && (
                <span className="text-xs text-gray-500 ml-auto">
                  ISBN: {b.isbn}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>

      {!loading && results.length === 0 && (
        <p className="text-gray-600">
          Try a search like “Dune”, “Agatha Christie”, or “9780143127741”.
        </p>
      )}
    </div>
  );
}
