import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function PATCH(
    req: Request,
    { params }: { params: { bookId: string, chapterId: string }}
) {
    try {
        const { userId } = auth();

        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const bookOwner = await db.book.findUnique({
            where: {
                userId,
                id: params.bookId
            }
        });

        if (!bookOwner) {
            return new NextResponse("Unauthorized", { status: 401 });

        }

        const chapter = await db.chapter.findUnique({
            where: {
                id: params.chapterId,
                bookId: params.bookId,
            }
        })

        if (!chapter?.title || !chapter.content) {
            return new NextResponse("Missing required fields", { status: 400 });
        }

        const publishedChapter = await db.chapter.update({
            where: {
                bookId: params.bookId,
                id: params.chapterId
            },
            data: {
                isPublished: true
            }
        });
        
        return NextResponse.json(publishedChapter);
    } catch (error) {
        console.log("[BOOKID_CHAPTERID_PUBLISH]", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}
