import { Sidebar } from "@/components/Layout/Sidebar";
import { MobileNav } from "@/components/Layout/MobileNav";

export default function AppLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="h-full relative">
            {/* Desktop sidebar */}
            <div className="hidden h-full md:flex md:w-72 md:flex-col md:fixed md:inset-y-0 z-[80]">
                <Sidebar />
            </div>

            {/* Main content — extra bottom padding on mobile for the nav bar */}
            <main className="md:pl-72 h-full bg-background pb-16 md:pb-0">
                {children}
            </main>

            {/* Mobile bottom nav */}
            <MobileNav />
        </div>
    );
}
