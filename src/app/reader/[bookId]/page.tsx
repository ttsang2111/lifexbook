import { db } from "@/lib/db";
import { redirect } from "next/navigation";

const ReaderPage = async ({
    params
}: {
    params: { bookId: string },
}) => {
    const book = await db.book.findUnique({
        where: {
            id: params.bookId,
            isPublished: true
        }
    });
    
    if (!book) {
        redirect('/');
    }

    return ( 
        <div className="flex items-center justify-center">
            <p>{book.description}</p>
        </div>
     );
}
 
export default ReaderPage;