// src/components/LibraryShelf.tsx
import BookSpine from "./Bookspine";

type Book = {
  id: string;
  title: string;
  coverUrl: string;
};

type Props = {
  title: string;
  books: Book[];
};

export default function LibraryShelf({ title, books }: Props) {
  return (
    <section>
      <h2 className="text-lg font-semibold text-gray-800 mb-2">{title}</h2>
      <div className="relative w-full h-[160px] bg-amber-100 border-b-[6px] border-amber-500 rounded-md shadow-inner">
        <div className="absolute inset-0 flex items-end gap-4 px-4 pb-3 overflow-x-auto">
          {books.map((book) => (
            <BookSpine key={book.id} book={book} />
          ))}
        </div>
      </div>
    </section>
  );
}
