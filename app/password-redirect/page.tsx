// import Image from "next/image";
// import { pixelify} from "@/fonts/fonts";
// import Logo from "@/components/Logo";
import Redirect from "@/components/Redirect";

export default function PasswordRedirectPage () {
    return (
       <Redirect src="/images/reset.svg" heading="Forgot your password hehh?" paragraph="Check your email for a reset password token!"/>
    )
}
