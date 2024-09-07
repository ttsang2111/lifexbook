import { Preview } from "@/components/ui/preview";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";

const ChapterIdPage = async ({
    params
}: {
    params: { bookId: string, chapterId: string }
}) => {
    const chapter = await db.chapter.findUnique({
        where: {
            id: params.chapterId,
            bookId: params.bookId,
        },
    });

    if (!chapter) {
        redirect('/');
    }
    return (
    <div className="flex items-center justify-center p-10">
        <Preview 
            value={chapter.content || ""}
        />
    </div> 
);
}
 
export default ChapterIdPage;