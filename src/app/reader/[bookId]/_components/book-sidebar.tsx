import { Book, Chapter } from "@prisma/client";

import BookSidebarItem from "./book-sidebar-item";

interface BookSidebarProps {
    book: Book & {
        chapters: Chapter[],
    };
}

const BookSidebar = async (
    {
        book, 
    }: BookSidebarProps
) => {
    return (
        <div className="h-full border-r flex flex-col overflow-y-auto shadow-sm">
            <div className="p-8 flex flex-col border-b">
                <h1 className="flex items-center justify-center font-semibold">
                    {book.name}
                </h1>
            </div>
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