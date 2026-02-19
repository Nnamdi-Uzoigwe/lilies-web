import DashboardHeader from "@/components/dashboard/sections/DashboardHeader";
import { DashboardLayout } from "../../components/dashboard/ui/DashboardLayout";
import DashboardFoods from "@/components/dashboard/sections/DashboardFoods";

export default function UserDashboard() {
    return (
        <DashboardLayout>
            <DashboardHeader />
            <DashboardFoods />
        </DashboardLayout>
    )
}