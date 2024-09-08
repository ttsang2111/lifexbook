import Link from "next/link";
import SidebarMobile from "./sidebar-mobile";
import NavbarRoutes from "@/components/navbar-routes";
import Logo from "./logo";

const Navbar = () => {
    return (
        <div className="p-4 gap-x-4 border-b h-full flex items-center bg-white shadow-sm">
            <Link href="/">
                <Logo />
            </Link>
            <SidebarMobile />
            <NavbarRoutes />
        </div>
    );
}

export default Navbar;  