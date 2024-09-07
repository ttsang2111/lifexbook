import SidebarMobile from "./sidebar-mobile";
import NavbarRoutes from "@/components/navbar-routes";

const Navbar = () => {
    return (
        <div className="p-4 border-b h-full flex items-center bg-white shadow-sm">
            <SidebarMobile />
            <NavbarRoutes />
        </div>
    );
}

export default Navbar;