// src/components/BookDetailModal.tsx
import { Fragment } from "react";
import {
  Dialog,
  DialogTitle,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import { Canvas } from "@react-three/fiber";
import Book3D from "./Book3D";

export type Book = {
  title: string;
  coverUrl?: string;
  thumbnail?: string;
  author?: string;
  pageCount?: number;
  description?: string;
};

export default function BookDetailModal({
  book,
  isOpen,
  onClose,
}: {
  book: Book | null;
  isOpen: boolean;
  onClose: () => void;
}) {
  if (!book) return null;
  const coverSrc = book.thumbnail ?? book.coverUrl;
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <TransitionChild
          as={Fragment}
          enter="ease-out duration-200"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-150"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/40" />
        </TransitionChild>
        <div className="fixed inset-0 overflow-y-auto p-4">
          <div className="mx-auto max-w-md transform bg-white p-6 rounded-md shadow-lg transition-all">
            <DialogTitle className="text-lg font-bold mb-4">
              {book.title}
            </DialogTitle>
            <div className="flex flex-col items-center">
              {coverSrc && (
                <div className="w-40 h-60 mb-4">
                  <Canvas camera={{ position: [0, 0, 3] }}>
                    <ambientLight intensity={0.7} />
                    <directionalLight position={[2, 2, 2]} intensity={0.7} />
                    <Book3D frontCover={coverSrc} />
                  </Canvas>
                </div>
              )}
              {book.author && (
                <p className="text-sm text-gray-600 mb-1">
                  <strong>Author:</strong> {book.author}
                </p>
              )}
              {typeof book.pageCount === "number" && (
                <p className="text-sm text-gray-600 mb-1">
                  <strong>Pages:</strong> {book.pageCount}
                </p>
              )}
              {book.description && (
                <p className="text-sm text-gray-500 mt-3 text-justify max-h-60 overflow-auto">
                  {book.description}
                </p>
              )}
            </div>
            <div className="mt-6 text-right">
              <button
                onClick={onClose}
                className="text-sm text-indigo-600 hover:underline"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
