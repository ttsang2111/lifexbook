import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { LayoutDashboard, ListCheck } from "lucide-react";
import { redirect } from "next/navigation";

import { IconBadge } from "@/components/icon-badge";

import { BookChaptersForm } from "./_components/book-chapters-form";
import BookNameForm from "./_components/book-name-form";
import BookImageForm from "./_components/book-image-form";
import { BookActions } from "./_components/book-actions";
import BookDescriptionForm from "./_components/book-description-form";

const BookIdPage = async ({
    params
}: { params: { bookId: string } }) => {
    const { userId } = auth();

    if (!userId) {
        redirect("/");
    }

    const book = await db.book.findUnique({
        where: {
            id: params.bookId,
            userId
        },
        include: {
            chapters: {
                orderBy: {
                    position: "asc",
                }
            },
            attachments: {
                orderBy: {
                    createdAt: "desc",
                }
            }
        }
    });

    if (!book) {
        redirect("/");
    }

    const requiredFields = [
        book.name,
        book.description,
        book.imageUrl
    ]
    const totalFields = requiredFields.length;
    const completedFields = requiredFields.filter(Boolean).length;
    const completionFields = `(${completedFields} / ${totalFields})`;
    const isCompleted = requiredFields.every(Boolean);

    return (
        <div className="p-6">
            <div className="flex items-center justify-between">
                <div className="flex flex-col gap-y-2">
                    <h1 className="text-2xl font-medium">
                        Book Setup
                    </h1>
                    <span>
                        Comlete all fields {completionFields}
                    </span>
                </div>
                <BookActions
                    disabled={!isCompleted}
                    bookId={params.bookId}
                    isPublished={book.isPublished}
                />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
                <div className="space-y-6">
                    <div className="flex items-center gap-x-2">
                        <IconBadge icon={LayoutDashboard} />
                        <h2 className="text-xl">
                            Customize your book
                        </h2>
                    </div>
                    <BookNameForm initialData={book} bookId={book.id} />
                    <BookDescriptionForm initialData={book} bookId={book.id} />
                    <BookImageForm initialData={book} bookId={book.id} />
                </div>
                <div className="space-y-6">
                    <div className="flex items-center gap-x-2">
                        <IconBadge icon={ListCheck} />
                        <h2 className="text-xl">
                            Book chapters
                        </h2>
                    </div>
                    <div>
                        <BookChaptersForm initialData={book} bookId={book.id} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default BookIdPage;