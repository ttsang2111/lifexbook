import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(
    req: Request,
    { params }: { params: { bookId: string } }
) {
    try {
        const { userId } = auth();
        const { title } = await req.json();

        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const bookOwner = await db.book.findUnique({
            where: {
                id: params.bookId,
                userId: userId,
            }
        });

        if (!bookOwner) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const lastChapter = await db.chapter.findFirst({
            where: {
                bookId: params.bookId,
            },
            orderBy: {
                position: "desc",
            }
        });

        const newPosition = lastChapter ? lastChapter.position + 1 : 1;

        const chapter = await db.chapter.create({
            data: {
                title,
                bookId: params.bookId,
                position: newPosition,
            }
        });

        return NextResponse.json(chapter);
    } catch (error) {
        console.log("[CHAPTERS]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}