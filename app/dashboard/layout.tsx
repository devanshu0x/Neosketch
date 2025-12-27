import { Navbar } from "@/components/ui/navbar";

interface DashboardLayoutProps{
    children:React.ReactNode;
}

export default function DashboardLayout({children}:DashboardLayoutProps){
    return <div className="relative">
        <div className="fixed top-0 left-0 right-0">
            <Navbar/>
        </div>
        {children}
    </div>
}