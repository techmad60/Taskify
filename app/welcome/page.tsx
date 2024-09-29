import { Suspense} from "react";
import WelcomePage from "@/components/WelcomePage";
import Loading from "@/components/Loading";

export default function Welcome() {
    return (
        <Suspense fallback={<Loading/>}>
            <WelcomePage/>
        </Suspense>
    )
}