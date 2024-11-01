"use client";

import { cn } from "@/lib/utils";
import { usePathname, useRouter } from "next/navigation";

interface BookSidebarItemProps {
    id: string;
    bookId: string;
    label: string;
}

const BookSidebarItem = ({
    id, bookId, label
}: BookSidebarItemProps) => {
    const pathname = usePathname();
    const router = useRouter();

    const isActive = pathname?.includes(id);

    const onClick = () => {
        router.push(`/reader/${bookId}/chapters/${id}`);
    }

    return ( 
        <button
            onClick={onClick}
            type="button"
            className={cn(
                "flex items-center gap-x-2 text-slate-500 text-sm font-[500] pl-6 transition-all hover:text-slate-600 hover: bg-slate-300/20",
                isActive && "text-slate-700 bg-slate-200/20 hover:bg-slate-200/20 hover:text-slate-700",
            )}
        >
            <div className="flex items-center gap-x-2 py-4">
                {label}
            </div>
            <div className={cn(
                "ml-auto opacity-0 border-2 border-slate-700 h-full transition-all",
                isActive && "opacity-100",
            )}/>
        </button>
        
     );
}
 
export default BookSidebarItem;