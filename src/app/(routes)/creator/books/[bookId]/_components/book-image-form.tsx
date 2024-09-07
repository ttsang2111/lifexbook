"use client";
import axios from "axios";
import { Book } from "@prisma/client";

import { z } from "zod";
import { useState } from "react";
import toast from "react-hot-toast";
import Image from "next/image";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { FileUpload } from "@/components/file-upload";

interface BookImageFormProps {
    initialData: Book;
    bookId: string;
}

const formSchema = z.object({
    imageUrl: z.string().min(1, {
        message: "Image is required",
    }),
})

const BookImageForm = ({
    initialData,
    bookId
}: BookImageFormProps) => {
    const [isEditting, setIsEditting] = useState(false);
    const router = useRouter();

    const toggleEditting = () => { setIsEditting((current) => !current) };

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            await axios.patch(`/api/books/${bookId}`, values);
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
                Book image
                <Button variant="ghost" onClick={toggleEditting}>
                    {isEditting && (<>Cancel</>)}
                    {!isEditting && !initialData.imageUrl && (
                        <>Add an image</>
                    )}
                    {!isEditting && initialData.imageUrl && (
                        <>Edit image</>
                    )}
                </Button>
            </div>
            <div>
                {isEditting && (
                    <div>
                     <FileUpload
                         endpoint="bookImage"
                         onChange={(url) => {
                             if (url) {
                                 onSubmit({ imageUrl: url });
                             }
                         }}
                     />
                     <div className="text-xs text-muted-foreground mt-4">
                         16:9 aspect ratio recommended
                     </div>
                    </div>
                )}
                {!isEditting && !initialData.imageUrl && (
                    <>Add an image</>
                )}
                {!isEditting && initialData.imageUrl && (
                    <div className="relative aspect-video mt-2">
                        <Image
                        alt="Upload"
                        src={initialData.imageUrl}
                        fill
                        className="object-cover rounded-md"
                        />
                    </div>
                )}
            </div>
        </div>
    );
}

export default BookImageForm;