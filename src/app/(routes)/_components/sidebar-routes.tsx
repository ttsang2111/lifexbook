"use client";

import { Book, Home } from "lucide-react";
import SidebarItem from "./sidebar-item";
import { usePathname } from "next/navigation";

const readerRoutes = [
    {
        icon: Home,
        label: "Home",
        href: "/",
    },
];

const creatorRoutes = [
    {
        icon: Book,
        label: "Books",
        href: "/creator/books",
    }
];

const SidebarRoutes = () => {
    const pathname = usePathname();
    const isCreatorPage = pathname.startsWith('/creator');
    const routes = isCreatorPage ? creatorRoutes : readerRoutes;
    return (
        <div className="flex flex-col w-full">
            {
                routes.map(route => (
                    <SidebarItem
                        key={route.href}
                        Icon={route.icon}
                        label={route.label}
                        href={route.href}
                    />
                ))
            }
        </div>
    );
};

export default SidebarRoutes;