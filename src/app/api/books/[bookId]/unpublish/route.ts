import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function PATCH(
    req: Request,
    { params }: { params: { bookId: string }}
) {
    try {
        const { userId } = auth();

        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const book = await db.book.findUnique({
            where: {
                userId,
                id: params.bookId
            }
        });

        if (!book) {
            return new NextResponse("Not Found", { status: 404 });
        }

        const unpublishedBook = await db.book.update({
            where: {
                userId,
                id: params.bookId
            },
            data: {
                isPublished: false
            }
        });
        
        return NextResponse.json(unpublishedBook);
    } catch (error) {
        console.log("[BOOKID_UNPUBLISH]", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}
