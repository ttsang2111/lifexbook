import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function PATCH(
    req: Request,
    { params }: { params: { bookId: string, chapterId: string }}
) {
    try {
        const { bookId, chapterId } = params;
        const values = await req.json();
        const { userId } = auth();

        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const bookOwner = await db.book.findUnique({
            where: {
                userId,
                id: bookId,
            }
        });

        if (!bookOwner) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const updatedChapter = await db.chapter.update({
            where: {
                bookId,
                id: chapterId
            },
            data: {
                ...values
            }
        });

        return NextResponse.json(updatedChapter);
    } catch (error) {
        console.log("[BOOKS_CHAPTER_ID]", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}

export async function DELETE(
    req: Request,
    { params }: { params: { bookId: string, chapterId: string }}
) {
    try {
        const { bookId, chapterId } = params;
        const { userId } = auth();

        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const bookOwner = await db.book.findUnique({
            where: {
                userId,
                id: bookId,
            }
        });

        if (!bookOwner) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const deletedChapter = await db.chapter.delete({
            where: {
                bookId,
                id: chapterId
            }
        });

        return NextResponse.json(deletedChapter);
    } catch (error) {
        console.log("[BOOKS_CHAPTER_ID]", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}

