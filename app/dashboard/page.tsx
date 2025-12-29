import { fetchGroups } from "../actions/group";
import { DesignCard } from "./_components/designCard";
import { GroupSidebar } from "./_components/groupSidebar";
import { Navbar } from "../../components/ui/navbar";
import { Sidebar } from "./_components/sidebar";

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
    

    return<>
     <main className="h-full max-h-dvh">
        <GroupSidebar groups={groups} selectedGroupId={selectedGroupId} />
        <Sidebar selectedGroupId={selectedGroupId} />
        <div className="pl-15 md:pl-75 h-full pt-17 ">
            <div className="p-4">
                <h4 className="text-center text-xl md:hidden font-bold ">Pokemon Master Roadmap</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-1 gap-y-1">
                    <DesignCard id="0" name="Create New Project" />
                    <DesignCard id="hi1" name="yo" />
                    <DesignCard id="hi2" name="yo" />
                    <DesignCard id="hi3" name="yo" />
                    <DesignCard id="hi4" name="yo" />
                    <DesignCard id="hi5" name="yo" />
                    <DesignCard id="hi6" name="yo" />
                    <DesignCard id="hi7" name="yo" />
                    <DesignCard id="hi8" name="yo" />
                    <DesignCard id="hi9" name="yo" />
                    <DesignCard id="hi10" name="yo" />
                    <DesignCard id="hi11" name="yo" />

                </div>
            </div>
        </div>
    </main>
    </>
}