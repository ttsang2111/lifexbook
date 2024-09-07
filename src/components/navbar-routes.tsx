"use client";
import { usePathname } from "next/navigation";
import { UserButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { LogOut } from "lucide-react";

const NavbarRoutes = () => {
    const pathname = usePathname();

    const isCreatorPage = pathname?.startsWith('/creator');
    const isReaderPage = pathname?.startsWith('/reader');
    return (
        <>
            <div className="flex gap-x-2 ml-auto">
                {isCreatorPage || isReaderPage ?
                    (
                        <Link href="/">
                            <Button variant="ghost" className="font-semibold">
                                <LogOut className="h-4 w-4 mr-2" />
                                Exit
                            </Button>
                        </Link>
                    ) :
                    (
                        <Link href="/creator/books">
                            <Button variant="ghost" className="font-semibold">
                                Creator
                            </Button>
                        </Link>
                    )
                }
                <UserButton />
            </div>
        </>
    );
}

export default NavbarRoutes;