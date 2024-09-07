"use client";

import { ConfirmModal } from "@/components/modals/confirm-modal";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

interface BookActionsProps {
    disabled: boolean;
    bookId: string;
    isPublished: boolean;
}

export const BookActions = (
    { disabled, bookId, isPublished }: BookActionsProps
) => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const onClick = async () => {
        try {
            setIsLoading(true);

            if (isPublished) {
                await axios.patch(`/api/books/${bookId}/unpublish`);
                toast.success("Book unpublished");
            } else {
                await axios.patch(`/api/books/${bookId}/publish`);
                toast.success("Book published");
            }

            router.refresh();
        } catch(error) {
            toast.error("Something went wrong");
        } finally { 
            setIsLoading(false);
        }
    }

    const onDelete = async () => {
        try {
            setIsLoading(true);
            await axios.delete(`/api/books/${bookId}`);
            toast.success("Book deleted");
            router.push(`/creator/books/`);
            router.refresh();
        } catch (error) {
            toast.error("Something went wrong");
        } finally {
            setIsLoading(false);
        }
    };
    return (
        <div className="flex items-center gap-x-2">
            <Button
                onClick={onClick}
                disabled={disabled || isLoading}
                variant="outline"
                size="sm"
            >
                {isPublished ? "Unpublish" : "Publish"}
            </Button>
            <ConfirmModal onConfirm={onDelete}>
                <Button size="sm" disabled={isLoading}>
                    <Trash className="w-4 h-4 mr"/>
                </Button>
            </ConfirmModal>
        </div>
    )
};

