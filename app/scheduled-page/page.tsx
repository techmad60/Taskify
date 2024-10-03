import { Suspense } from "react";
import ScheduledTasksPage from "@/components/ScheduledTask";
import Loading from "@/components/Loading";

export default function ScheduledPage () {
    return (
        <Suspense fallback={<Loading/>}> 
            <ScheduledTasksPage/>
        </Suspense>
    )
}

