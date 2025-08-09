// src/lib/libraryStore.ts
import type { UserBook, Book, BookStatus } from "../types/Book";

const KEY = "reado.library";

export function getLibrary(): UserBook[] {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return [];
    const arr = JSON.parse(raw);
    if (!Array.isArray(arr)) return [];
    return arr;
  } catch {
    return [];
  }
}

export function saveLibrary(items: UserBook[]) {
  localStorage.setItem(KEY, JSON.stringify(items));
}

export function addBook(book: Book, status: BookStatus = "want") {
  const lib = getLibrary();
  const exists = lib.find((b) => b.id === book.id);
  if (exists) return; // idempotent
  lib.push({ ...book, status });
  saveLibrary(lib);
}

export function setStatus(bookId: string, status: BookStatus) {
  const lib = getLibrary();
  const idx = lib.findIndex((b) => b.id === bookId);
  if (idx >= 0) {
    lib[idx].status = status;
    saveLibrary(lib);
  }
}

export function removeBook(bookId: string) {
  const lib = getLibrary().filter((b) => b.id !== bookId);
  saveLibrary(lib);
}
