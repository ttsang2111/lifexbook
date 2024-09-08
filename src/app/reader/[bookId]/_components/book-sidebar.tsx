"use client";

import { Book, Chapter } from "@prisma/client";
import BookSidebarItem from "./book-sidebar-item";
import { useRouter } from "next/navigation";

interface BookSidebarProps {
    book: Book & {
        chapters: Chapter[],
    };
}

const BookSidebar = (
    {
        book, 
    }: BookSidebarProps
) => {
    const router = useRouter();
    const onClick = () => {
        router.push(`/reader/${book.id}`);
    }
    return (
        <div className="h-full border-r flex flex-col overflow-y-auto shadow-sm">
            <button className="p-8 flex flex-col border-b" onClick={onClick}>
                <h1 className="flex items-center justify-center font-semibold">
                    {book.name}
                </h1>
            </button>
            <div className="flex flex-col w-full">
                {book.chapters.map((chapter) => (
                    <BookSidebarItem 
                        key={chapter.id}
                        id={chapter.id}
                        bookId={book.id}
                        label={chapter.title}
                    />
                ))}
            </div>
        </div>
    );
}

export default BookSidebar;