import { Book } from "@prisma/client";
import BookCard from "./book-card";

interface BookListProps {
    items: (Book & {
        chapters: { id: string}[],
    })[];
}

const BookList = (
    { items }: BookListProps
) => {
    return ( 
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-4">
            {items.map((item) => (
                <BookCard
                    key={item.id}
                    id={item.id}
                    name={item.name}
                    imageUrl={item.imageUrl!}
                    chaptersLength={item.chapters.length}
                />
            ))}
            {items.length === 0 && (
                <div className="text-center text-sm text-muted-foreground mt-10">
                    No books found
                </div>
            )}
        </div>
     );
}
 
export default BookList;