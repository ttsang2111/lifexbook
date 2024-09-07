import { Menu } from "lucide-react";
import { Book, Chapter } from "@prisma/client";

import {
    Sheet,
    SheetContent,
    SheetTrigger
} from "@/components/ui/sheet";

import BookSidebar from "./book-sidebar";

interface BookMobileSidebarProps {
    book: Book & {
        chapters: Chapter[]
    }
};

const BookMobileSidebar = ({
    book,
}: BookMobileSidebarProps) => {
    return (
        <Sheet>
            <SheetTrigger className="md:hidden pr-4 hover:opacity-75">
                <Menu />
            </SheetTrigger>
            <SheetContent side="left" className="p-0 bg-white w-72">
                <BookSidebar 
                    book={book}
                />
            </SheetContent>
        </Sheet>
    )
}

export default BookMobileSidebar;