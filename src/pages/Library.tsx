import { useEffect, useState } from "react";
import LibraryShelf from "../components/LibraryShelf";
import BookDetailModal from "../components/BookDetailModal";
import type { UserBook, BookStatus, Book } from "../types/Book";
import { getLibrary, setStatus } from "../lib/libraryStore";

export default function Library() {
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [lib, setLib] = useState<UserBook[]>([]);

  useEffect(() => {
    setLib(getLibrary());
  }, []);

  function changeStatus(id: string, status: BookStatus) {
    setStatus(id, status);
    setLib(getLibrary());
  }

  const want = lib.filter((b) => b.status === "want");
  const reading = lib.filter((b) => b.status === "reading");
  const finished = lib.filter((b) => b.status === "finished");

  return (
    <main className="px-4 py-6 space-y-10">
      <LibraryShelf
        title="🌟 Want to Read"
        books={want}
        onBookClick={setSelectedBook}
      />
      <LibraryShelf
        title="📖 Currently Reading"
        books={reading}
        onBookClick={setSelectedBook}
      />
      <LibraryShelf
        title="✅ Finished"
        books={finished}
        onBookClick={setSelectedBook}
      />

      <BookDetailModal
        book={selectedBook}
        isOpen={!!selectedBook}
        onClose={() => setSelectedBook(null)}
      />

      {/* Quick actions for demo */}
      <div className="fixed bottom-4 right-4 space-x-2 bg-white/80 p-2 rounded-xl shadow">
        <button
          onClick={() =>
            selectedBook && changeStatus(selectedBook.id, "reading")
          }
          className="px-3 py-1 rounded bg-amber-600 text-white text-sm disabled:opacity-50"
          disabled={!selectedBook}
        >
          Mark Reading
        </button>
        <button
          onClick={() =>
            selectedBook && changeStatus(selectedBook.id, "finished")
          }
          className="px-3 py-1 rounded bg-emerald-600 text-white text-sm disabled:opacity-50"
          disabled={!selectedBook}
        >
          Mark Finished
        </button>
      </div>
    </main>
  );
}
