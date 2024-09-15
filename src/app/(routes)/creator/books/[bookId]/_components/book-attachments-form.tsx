"use client";
import axios from "axios";
import { Book, Attachment } from "@prisma/client";

import { z } from "zod";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { FileUpload } from "@/components/file-upload";
import { PlusCircle } from "lucide-react";

interface BookAttachmentsFormProps {
    initialData: Book & { attachments: Attachment[] };
    bookId: string;
}

const formSchema = z.object({
    url: z.string().min(1),
})

const BookAttachmentsForm = ({
    initialData,
    bookId
}: BookAttachmentsFormProps) => {
    const [isEditting, setIsEditting] = useState(false);
    const router = useRouter();

    const toggleEditting = () => { setIsEditting((current) => !current) };

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            await axios.post(`/api/books/${bookId}/attachments`, values);
            toast.success("Book updated");
            toggleEditting();
            router.refresh();
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong");
        }
    }

    return (
        <div className="relative border bg-slate-100 rounded-md p-4">
            <div className="font-medium flex items-center justify-between">
                Book attachments
                <Button variant="ghost" onClick={toggleEditting}>
                    {!isEditting && (
                        <>
                            <PlusCircle className="h-4 w-4 mr-2"/>
                            Add an attachment
                        </>
                    )}
                    {isEditting && (<>Cancel</>)}
                </Button>
            </div>
            <div>
                {isEditting && (
                    <div>
                        <FileUpload
                            endpoint="bookAttachment"
                            onChange={(url) => {
                                if (url) {
                                    onSubmit({ url });
                                }
                            }}
                        />
                        <div className="text-xs text-muted-foreground mt-4">
                            16:9 aspect ratio recommended
                        </div>
                    </div>
                )}
                {!isEditting && initialData.attachments.length === 0 && (
                    <p className="text-slate-500 italic text-sm mt-2">
                        No attachments
                    </p>

                )}
                {!isEditting && initialData.attachments.length > 0 && (
                    <div className="space-y-2">
                        {initialData.attachments.map((attachment) => (
                            <div key={attachment.id} 
                                className="flex items-center p-3 w-full bg-sky-100 border-sky-200 border text-sky-700 rounded-md"
                            >
                                <p className="text-xs line-clamp-1">
                                    {attachment.name}
                                </p>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default BookAttachmentsForm;