"use client";

import { ConfirmModal } from "@/components/modals/confirm-modal";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

interface ChapterActionsProps {
    disabled: boolean;
    bookId: string;
    chapterId: string;
    isPublished: boolean;
}

export const ChapterActions = (
    { disabled, bookId, chapterId, isPublished }: ChapterActionsProps
) => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const onClick = async () => {
        try {
            setIsLoading(true);

            if (isPublished) {
                await axios.patch(`/api/books/${bookId}/chapters/${chapterId}/unpublish`);
                toast.success("Chapter unpublished");
            } else {
                await axios.patch(`/api/books/${bookId}/chapters/${chapterId}/publish`);
                toast.success("Chapter published");
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
            await axios.delete(`/api/books/${bookId}/chapters/${chapterId}`);
            toast.success("Chapter deleted");
            router.push(`/creator/books/${bookId}`);
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

