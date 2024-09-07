"use client";
import axios from "axios";
import { Book } from "@prisma/client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Pencil } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
} from "@/components/ui/form";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

interface BookNameFormProps {
    initialData: Book;
    bookId: string;
}

const formSchema = z.object({
    name: z.string().min(1),
})

const BookNameForm = ({
    initialData,
    bookId
}: BookNameFormProps) => {
    const [isEditting, setIsEditting] = useState(false);
    const router = useRouter();
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: initialData,
    });

    const { isValid, isSubmitting } = form.formState;

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
                Book name
                <Button variant="ghost" onClick={toggleEditting}>
                    {isEditting ? (
                        <>Cancel</>
                    ) : (
                        <>
                            <Pencil className="h-4 w-4 mr-2" />
                            Edit name
                        </>
                    )}
                </Button>
            </div>
            <div>
                {!isEditting && (
                    <p className="text-sm mt-2">
                        {initialData.name}
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
                                name="name"
                                render={( { field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <Input 
                                                disabled={isSubmitting}
                                                placeholder="e.g. 'Lotus sutra'"
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

export default BookNameForm;