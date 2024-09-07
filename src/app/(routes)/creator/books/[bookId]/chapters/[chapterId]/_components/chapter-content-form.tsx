"use client";

import { Chapter } from "@prisma/client";

import { useState } from "react";
import { Pencil } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Editor } from "@/components/ui/editor";
import { Preview } from "@/components/ui/preview";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import axios from "axios";
import { useRouter } from "next/navigation";

interface ChapterContentFormProps {
    initialData: Chapter;
    bookId: string;
    chapterId: string;
}

const formSchema = z.object({
    content: z.string().min(1),
});

const ChapterContentForm = ({
    initialData,
    bookId,
    chapterId
}: ChapterContentFormProps) => {
    const [isEditting, setIsEditting] = useState(false);
    const router = useRouter();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            content: initialData.content || "",
        }
    });

    const toggleEditting = () => { setIsEditting((current) => !current) };

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            await axios.patch(`/api/books/${bookId}/chapters/${chapterId}`, values);
            toast.success("Chapter updated");
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
                Chapter content
                <Button variant="ghost" onClick={toggleEditting}>
                    {isEditting ? (
                        <>Cancel</>
                    ) : (
                        <>
                            <Pencil className="h-4 w-4 mr-2" />
                            Edit content
                        </>
                    )}
                </Button>
            </div>
            <div>
                {!isEditting && (
                    <div className={cn("text-sm mt-2", !initialData.content && "text-slate-500 italic")}>
                        {!initialData.content && "No content"}
                        {initialData.content && (
                            <Preview value={initialData.content} />
                        )}
                    </div>
                )}
                {isEditting && (
                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className="space-y-4 mt-4"
                        >
                            <FormField 
                                control={form.control}
                                name="content"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <Editor
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <div className="flex items-center gap-x-2">
                                <Button
                                    type="submit"
                                >
                                    Save
                                </Button> 
                            </div>
                        </form>
                    </Form>
                )}
            </div>
        </div>
    );
}

export default ChapterContentForm;