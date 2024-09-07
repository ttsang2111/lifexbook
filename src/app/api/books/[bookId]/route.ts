import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function PATCH(
    req: Request,
    { params }: { params: { bookId: string }}
) {
    try {
        const { userId } = auth();
        const values = await req.json();

        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const updatedBook = await db.book.update({
            where: {
                userId,
                id: params.bookId
            },
            data: values
        })
        
        return NextResponse.json(updatedBook);
    } catch (error) {
        console.log("[BOOKID]", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}

export async function DELETE(
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

        const deletedBook = await db.book.delete({
            where: {
                id: params.bookId
            },
        });
        
        return NextResponse.json(deletedBook);
    } catch (error) {
        console.log("[BOOKID]", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}