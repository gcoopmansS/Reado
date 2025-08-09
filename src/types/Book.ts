// src/types/Book.ts
export type Book = {
  id: string;
  title: string;
  author?: string;
  coverUrl: string;
  pageCount?: number;
  description?: string;
  isbn?: string;
};

export type BookStatus = "want" | "reading" | "finished";

export type UserBook = Book & { status: BookStatus };
