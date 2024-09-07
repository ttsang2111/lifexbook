import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function PUT(
    req: Request,
    { params }: { params: { bookId: string } }
) {
    try {
        const { userId } = auth();
        if(!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const ownerbook = await db.book.findUnique({
            where: {
                id: params.bookId,
                userId
            }
        });
        if (!ownerbook) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const { list } = await req.json();
        for (const item of list) {
            await db.chapter.update({
                where: { id: item.id },
                data: { position: item.position }
            });
        }

        return new NextResponse("Success", { status: 200 });
    } catch (error) {
        console.log("[REORDER]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }    
}