import { fetchGroups } from "../actions/group";
import { DesignCard } from "./_components/designCard";
import { GroupSidebar } from "./_components/groupSidebar";
import { Navbar } from "../../components/ui/navbar";
import { Sidebar } from "./_components/sidebar";
import { fetchProjects } from "../actions/project";

interface DashboardProps{
    searchParams:Promise<{
        groupId?:string;
    }>
}

export default async function Dashboard({
    searchParams
}:DashboardProps){
    const groups=await fetchGroups();
    const resolvedSearchParams = await searchParams;

    const selectedGroup=groups.find(g=>g.groupId===resolvedSearchParams.groupId) ?? null;
    const selectedGroupId=selectedGroup?.groupId ?? null;

    const projects= await fetchProjects(selectedGroupId || "");
    

    return<>
     <main >
        <GroupSidebar groups={groups} selectedGroupId={selectedGroupId} />
        <Sidebar selectedGroupId={selectedGroupId} />
        <div className="pl-15 md:pl-75 h-full pt-4 ">
            <div className="p-4">
                <h4 className="text-center text-xl md:hidden font-bold ">Pokemon Master Roadmap</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-1 gap-y-1">
                    {
                        selectedGroup &&
                            <DesignCard groupId={selectedGroupId!} id="0" name="Create New Project" />
                        
                    }
                    <ul>
                    {
                        projects.map((project)=>{
                            return <li key={project.projectId}>
                                <DesignCard id={project.projectId} name={project.projectName}/>
                            </li>
                        })
                    }
                    </ul>

                </div>
            </div>
        </div>
    </main>
    </>
}