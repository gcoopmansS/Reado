import { useState } from "react";
import type { Book } from "../types/book"; // Or define it inline
import LibraryShelf from "../components/LibraryShelf";
import BookDetailModal from "../components/BookDetailModal";

const sampleBooks = [
  { id: "1", title: "The Hobbit", coverUrl: "/covers/hobbit.jpg" },
  { id: "2", title: "Dune", coverUrl: "/covers/dune.jpg" },
  { id: "3", title: "1984", coverUrl: "/covers/1984.jpg" },
];

export default function Library() {
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);

  return (
    <main className="px-4 py-6 space-y-10">
      <BookDetailModal
        book={selectedBook}
        isOpen={!!selectedBook}
        onClose={() => setSelectedBook(null)}
      />

      <LibraryShelf
        title="📚 Want to Read"
        books={sampleBooks}
        onBookClick={setSelectedBook}
      />
      <LibraryShelf
        title="📖 Currently Reading"
        books={sampleBooks}
        onBookClick={setSelectedBook}
      />
      <LibraryShelf
        title="✅ Finished"
        books={sampleBooks}
        onBookClick={setSelectedBook}
      />
    </main>
  );
}
