// src/pages/Library.tsx
import LibraryShelf from "../components/LibraryShelf";

const sampleBooks = [
  { id: "1", title: "The Hobbit", coverUrl: "/covers/hobbit.jpg" },
  { id: "2", title: "Dune", coverUrl: "/covers/dune.jpg" },
  { id: "3", title: "1984", coverUrl: "/covers/1984.jpg" },
];

export default function Library() {
  return (
    <main className="px-4 py-6 space-y-10">
      <LibraryShelf title="📚 Want to Read" books={sampleBooks} />
      <LibraryShelf title="📖 Currently Reading" books={sampleBooks} />
      <LibraryShelf title="✅ Finished" books={sampleBooks} />
    </main>
  );
}
