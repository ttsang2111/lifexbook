import NavbarRoutes from "@/components/navbar-routes";
import { Book, Chapter } from "@prisma/client";
import BookMobileSidebar from "./book-mobile-sidebar";

interface BookNavbarProps {
    book: Book & {
        chapters: Chapter[]
    };
}

const BookNavbar = (
    {
        book
    }: BookNavbarProps
) => {
    return (
        <div className="p-4 border-b h-full flex items-center shadow-sm">
            <BookMobileSidebar
                book={book}
            />
            <NavbarRoutes />
        </div>
    );
}
 
export default BookNavbar