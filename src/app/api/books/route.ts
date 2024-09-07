import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(
    req: Request
) {
    try {
        const { userId } = auth();
        const { name } = await req.json(); 

        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const book = await db.book.create({
            data: {
                userId,
                name
            },
        });

        return NextResponse.json(book);
    } catch (error) {
        console.log("[BOOKS]", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}