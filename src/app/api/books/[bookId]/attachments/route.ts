import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(
    req: Request,
    { params } : { params: { bookId: string }}
) {
    try {
        const { userId } = auth();
        const { url } = await req.json();

        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const bookOwner = await db.book.findUnique({
            where: {
                userId,
                id: params.bookId
            },
        });

        if (!bookOwner) {
            return new NextResponse("Not Found", { status: 404 });
        }

        const attachment = await db.attachment.create({
            data: {
                url,
                bookId: params.bookId,
                name: url.split("/").pop(),
            }
        })
        
        return NextResponse.json(attachment);
    } catch (error) {
        console.log("[BOOK_ID_ATTACHMENTS]", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}