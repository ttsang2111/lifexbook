import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import BookNavbar from "./_components/book-navbar";
import BookSidebar from "./_components/book-sidebar";
import ScrollToTopButton from "@/components/scroll-to-top-button";

const ReaderBookId = async ({
    children,
    params
}: {
    children: React.ReactNode,
    params: { bookId: string}
}) => {

    const book = await db.book.findUnique({
        where: {
            id: params.bookId,
            isPublished: true,
        },
        include: {
            chapters: {
                where: {
                    isPublished: true,
                },
                orderBy: {
                    position: "asc",
                },
            },
        },
    });

    if (!book) {
        redirect("/");
    }

    return ( 
        <div className="h-full">
                <div className="h-[80px] md:pl-80 fixed inset-y-0 w-full z-50">
                    <BookNavbar
                        book={book}
                    />
                </div>
            <div className="hidden md:flex h-full w-80 flex-col fixed inset-y-0 z-50">
                <BookSidebar
                    book={book}
                />
            </div>
            <main className="md:pl-80 pt-[80px] h-full">
                <ScrollToTopButton />
                {children}
            </main>
        </div>
     );
}
 
export default ReaderBookId;