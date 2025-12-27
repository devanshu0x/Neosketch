import { GroupSidebar } from "./_components/groupSidebar";
import { Sidebar } from "./_components/sidebar";


export default function Dashboard(){
    return <main className="h-full ">
        <GroupSidebar/>
        <Sidebar/>
        <div className="pl-15 md:pl-75 h-full">
            <div className="p-4">
                <h4 className="text-center text-xl md:hidden font-bold ">Pokemon Master Roadmap</h4>
            </div>
        </div>
    </main>
}