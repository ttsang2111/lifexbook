import Navbar from "./_components/navbar";
import Sidebar from "./_components/sidebar";

const DashboardLayout = ({ children }: { children: React.ReactNode}) => {
    return (
    <div className="h-full">
        <div className="h-[80px] fixed inset-y-0 w-full z-50">
            <Navbar />
        </div>
        <div className="pt-[80px] h-full w-56 hidden md:flex flex-col fixed insert-y-0 z-10">
            <Sidebar />
        </div>
        <main className="md:pl-56 pt-[80px] bg-white h-full">
            {children}
        </main>
    </div> 
    );
}
 
export default DashboardLayout;