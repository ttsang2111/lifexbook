"use client";

import axios from "axios";
import { Chapter } from "@prisma/client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Pencil } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
} from "@/components/ui/form";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

interface ChapterDescriptionFormProps {
    initialData: Chapter;
    bookId: string;
    chapterId: string;
}

const formSchema = z.object({
    description: z.string().min(1),
})

const ChapterDescriptionForm = ({
    initialData,
    bookId,
    chapterId
}: ChapterDescriptionFormProps) => {
    const [isEditting, setIsEditting] = useState(false);
    const router = useRouter();
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            description: "",
        }
    });

    const { isValid, isSubmitting } = form.formState;

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
                Chapter description
                <Button variant="ghost" onClick={toggleEditting}>
                    {isEditting ? (
                        <>Cancel</>
                    ) : (
                        <>
                            <Pencil className="h-4 w-4 mr-2" />
                            Edit description
                        </>
                    )}
                </Button>
            </div>
            <div>
                {!isEditting && (
                    <p className={cn("text-sm mt-2", !initialData.description && "text-slate-500 italic")}>
                        {initialData.description || "No description yet."}
                    </p>
                )}
                {isEditting && (
                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className="space-y-4 mt-4"
                        >
                            <FormField
                                control={form.control}
                                name="description"
                                render={( { field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <Textarea 
                                                disabled={isSubmitting}
                                                placeholder="..."
                                                {...field}
                                            />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                            <div className="flex items-center gap-x-2">
                                <Button
                                    disabled={!isValid || isSubmitting}
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

export default ChapterDescriptionForm;