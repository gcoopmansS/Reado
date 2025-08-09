// src/components/LibraryShelf.tsx
import BookSpine from "./BookSpine";

type Book = {
  id: string;
  title: string;
  coverUrl: string;
};

type Props = {
  title: string;
  books: Book[];
  onBookClick?: (book: Book) => void;
};

export default function LibraryShelf({ title, books, onBookClick }: Props) {
  return (
    <section>
      <h2 className="text-lg font-semibold text-gray-800 mb-2">{title}</h2>
      <div className="relative w-full h-[160px] bg-amber-100 border-b-[6px] border-amber-500 rounded-md shadow-inner">
        <div className="absolute inset-0 flex items-end gap-4 px-4 pb-3 overflow-x-auto">
          {books.map((book) => (
            <BookSpine
              key={book.id}
              book={book}
              onClick={() => onBookClick?.(book)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
