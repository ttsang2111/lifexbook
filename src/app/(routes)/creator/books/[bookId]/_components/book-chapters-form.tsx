"use client";

import * as z from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Book, Chapter } from "@prisma/client";
import { Loader2, PlusCircle } from "lucide-react";
import toast from "react-hot-toast";

import { 
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import ChaptersList from "./book-chapters-list";

interface BookChaptersFormProps {
    initialData: Book & { chapters: Chapter[]};
    bookId: string;
};

const formSchema = z.object({
    title: z.string().min(1)
});

export const BookChaptersForm = ({initialData, bookId}: BookChaptersFormProps) => {
    const router = useRouter();
    const [isCreating, setIsCreating] = useState(false);
    const [isUpdating, setIsUpdating] = useState(false);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: "",
        },
    });

    const { isSubmitting, isValid } = form.formState;

    const toggleCreating = () => setIsCreating((current) => !current);

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            await axios.post(`/api/books/${bookId}/chapters`, values);
            toast.success("Chapter created");
            toggleCreating();
            router.refresh();
        } catch (err) {
            toast.error("Something went wrong");
        }
    };

    const onReorder = async (updateData: {id: string, position: number}[]) => {
        try {
            // At least 2 lists are reordered unless nothing is changed.
            if (updateData.length <= 1) {
                return;
            }

            setIsUpdating(true);
            await axios.put(`/api/books/${bookId}/chapters/reorder`, {
                list: updateData
            });
            toast.success("Chapters reordered");
            router.refresh();
        } catch (error) {
            toast.error("Something went wrong");
        } finally {
            setIsUpdating(false);
        }
    };

    const onEdit = (id: string) => {
        router.push(`/creator/books/${bookId}/chapters/${id}`);
    }
    return (
        <div className="relative mt-6 border bg-slate-100 rounded-md p-4">
            {isUpdating && (
                <div className="absolute h-full w-full bg-slate-500/20 top-0 right-0 rounded-m flex items-center justify-center">
                    <Loader2 className="animate-spin h-6 w-6 text-sky-700" />
                </div>
            )}
            <div className="font-medium flex items-center justify-between">
            Book chapters
            <Button variant="ghost" onClick={toggleCreating}>
                {isCreating ? (
                    <>Cancel</>
                ): (
                    <>
                      <PlusCircle className="h-4 w-4 mr-2" />
                      Add a chapter
                    </>
                )}
            </Button>
            </div>
            {isCreating && (
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-4 mt-4"
                    >
                        <FormField
                            control={form.control}
                            name="title"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input 
                                            disabled={isSubmitting}
                                            placeholder="e.g. 'Introduction'"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button 
                            disabled={!isValid || isSubmitting}
                            type="submit"
                        >
                            Create
                        </Button>
                    </form>
                </Form>
            )}
            {!isCreating && (
                <div className={cn(
                    "text-sm mt-2",
                    !initialData.chapters.length && "text-slate-500 italic"
                )}>
                    {!initialData.chapters.length && "No chapters"}
                    <ChaptersList 
                        onEdit={onEdit}
                        onReorder={onReorder}
                        items={initialData.chapters || []}
                    />
                </div>
            )}
            {!isCreating && (
                <p className="text-xs text-muted-foreground mt-4">
                    Drap and drop to reorder the chapters
                </p>
            )}
        </div>
    );
}