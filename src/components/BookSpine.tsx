// src/components/BookSpine.tsx
type Book = {
  id: string;
  title: string;
  coverUrl: string;
};

export default function BookSpine({ book }: { book: Book }) {
  return (
    <div className="w-[64px] h-[100px] relative group">
      <img
        src={book.coverUrl}
        alt={book.title}
        className="w-full h-full object-cover rounded-sm shadow-md group-hover:scale-105 transition"
      />
      <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 w-max max-w-[120px] text-xs text-center bg-white text-gray-700 px-2 py-1 rounded shadow opacity-0 group-hover:opacity-100 transition">
        {book.title}
      </div>
    </div>
  );
}
