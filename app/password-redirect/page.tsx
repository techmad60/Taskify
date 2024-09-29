import { Suspense } from "react";
import Redirect from "@/components/Redirect";
import Loading from "@/components/Loading";

export default function PasswordRedirectPage () {
    return (
        <Suspense fallback={<Loading/>}> 
            <Redirect src="/images/reset.svg" heading="Forgot your password hehh?" paragraph="Check your email for a reset password token!"/>
        </Suspense>
    )
}

