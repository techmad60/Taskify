import { Suspense } from "react";
import TaskDetails from "@/components/TaskDetails";
import Loading from "@/components/Loading";

export default function ScheduledPage () {
    return (
        <Suspense fallback={<Loading/>}> 
            <TaskDetails/>
        </Suspense>
    )
}

