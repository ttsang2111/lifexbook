import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";

import Link from "next/link";
import { redirect } from "next/navigation";
import { ArrowLeft, Book, LayoutDashboard } from "lucide-react";

import { IconBadge } from "@/components/icon-badge";

import ChapterTitleForm from "./_components/chapter-title-form";
import ChapterDescriptionForm from "./_components/chapter-description-form";
import ChapterContentForm from "./_components/chapter-content-form";
import { ChapterActions } from "./_components/chapter-actions";

const ChapterId = async ({
    params
}: { params: { bookId: string, chapterId: string } }) => {
    const { userId } = auth();

    if (!userId) {
        redirect("/");
    }
    const chapter = await db.chapter.findUnique({
        where: {
            id: params.chapterId,
            bookId: params.bookId,
        }
    });

    if (!chapter) {
        redirect("/");
    }

    const requiredFields = [
        chapter.title,
        // chapter.description,
        chapter.content
    ];
    const totalFields = requiredFields.length;
    const completedFields = requiredFields.filter(Boolean).length;
    const completionFields = `(${completedFields} / ${totalFields})`;
    const isCompleted = requiredFields.every(Boolean);

    return (
        <div className="p-6">
            <div className="flex items-center justify-between">
                <div className="w-full">
                    <Link
                        href={`/creator/books/${params.bookId}`}
                        className="flex items-center text-sm hover:opacity-75 transition mb-6"
                    >
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Back to the book setup
                    </Link>
                    <div className="flex items-center justify-between w-full">
                        <div className="flex flex-col gap-y-2">
                            <h1 className="text-2xl font-medium">
                                Chapter Creation
                            </h1>
                            <span className="text-sm text-slate-700">
                                Complete all fields {completionFields}
                            </span>
                        </div>
                        <ChapterActions 
                            bookId={params.bookId} 
                            chapterId={params.chapterId}
                            isPublished={chapter.isPublished}
                            disabled={!isCompleted}
                        />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
                        <div className="space-y-4">
                            <div className="flex items-center gap-x-2">
                                <IconBadge icon={LayoutDashboard} />
                                <h2 className="text-xl">
                                    Customize your chapter
                                </h2>
                            </div>
                            <ChapterTitleForm initialData={chapter} bookId={params.bookId} chapterId={params.chapterId} />
                            <ChapterDescriptionForm initialData={chapter} bookId={params.bookId} chapterId={params.chapterId} />
                        </div>
                        <div className="space-y-4">
                            <div className="flex items-center gap-x-2">
                                <IconBadge icon={Book} />
                                <h2 className="text-xl">
                                    Chapter content
                                </h2>
                            </div>
                            <ChapterContentForm initialData={chapter} bookId={params.bookId} chapterId={params.chapterId} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ChapterId;