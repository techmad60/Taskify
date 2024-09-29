import { Suspense } from "react";
import Redirect from "@/components/Redirect";
import Loading from "@/components/Loading";

export default function RedirectPage () {
    return (
        <Suspense fallback={<Loading/>}>
            <Redirect src="/images/redirect.svg" heading="You&apos;re almost there!" paragraph="Check your email for a verification token!"/>
        </Suspense>
      
    )
}
