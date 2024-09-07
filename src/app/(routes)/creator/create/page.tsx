"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

import {
    Form,
    FormField,
    FormItem,
    FormLabel,
    FormControl,
    FormDescription,
    FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const formSchema = z.object({
    name: z.string().min(1),
});

const CreateBookPage = () => {
    const router = useRouter();
    
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
        }
    });

    const { isSubmitting, isValid } = form.formState;

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            const response = await axios.post('/api/books', values);
            router.push(`/creator/books/${response.data.id}`);
            toast.success("Book created successfully");
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong");
        }
    }

    return (
        <div className="max-w-5xl mx-auto flex md:items-center md:justify-center h-full p-6">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-2xl">Your book name</FormLabel>
                                <FormDescription className="text-sm">
                                What would you like to name your book? Don&apos;t
                                worry, you can change it later.
                                </FormDescription>
                                <FormControl>
                                    <Input
                                        placeholder="e.g. 'Lotus sutra'"
                                        disabled={isSubmitting}
                                        {...field} />
                                </FormControl>
                                <FormDescription className="text-sm">
                                    What will you write this book?
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <div className="flex gap-x-2">
                        <Link href="/creator/books">
                            <Button type="button" variant='ghost'>Cancel</Button>
                        </Link>
                        <Button disabled={!isValid || isSubmitting} type="submit">Continue</Button>
                    </div>
                </form>
            </Form>
        </div>
    );
}

export default CreateBookPage;