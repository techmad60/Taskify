import { Suspense } from "react";
import MainPage from "@/components/MainPage";
import Loading from "@/components/Loading";

export default function mainPage () {
    return (
        <Suspense fallback={<Loading/>}> 
            <MainPage/>
        </Suspense>
    )
}

