// src/lib/googleBooks.ts
import type { Book } from "../types/Book";

const API_BASE = "https://www.googleapis.com/books/v1/volumes";

/**
 * Search Google Books and map results into our Book type.
 * Uses the public endpoint; an API key (VITE_GOOGLE_BOOKS_API_KEY) is optional but recommended.
 */
export async function searchBooks(
  query: string,
  maxResults = 20
): Promise<Book[]> {
  if (!query.trim()) return [];
  const params = new URLSearchParams({
    q: query,
    maxResults: String(Math.min(maxResults, 40)),
    key: import.meta.env.VITE_GOOGLE_BOOKS_API_KEY || "",
  });

  const url = `${API_BASE}?${params.toString()}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Google Books error: ${res.status}`);
  const data = await res.json();

  const items = (data.items || []) as any[];

  return items.map((item) => {
    const v = item.volumeInfo || {};
    const imageLinks = v.imageLinks || {};
    const thumb = (
      imageLinks.thumbnail ||
      imageLinks.smallThumbnail ||
      ""
    ).replace("http://", "https://");

    const isbns: string[] = (v.industryIdentifiers || []).map(
      (id: any) => id.identifier
    );
    const primaryIsbn = isbns[0];

    const book: Book = {
      id: item.id,
      title: v.title || "Untitled",
      author: (v.authors && v.authors.join(", ")) || "Unknown author",
      coverUrl: thumb || "",
      pageCount: v.pageCount,
      description: v.description,
      isbn: primaryIsbn,
    };
    return book;
  });
}
