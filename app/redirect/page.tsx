// import Image from "next/image";
// import { pixelify} from "@/fonts/fonts";
// import Logo from "@/components/Logo";
import Redirect from "@/components/Redirect";

export default function RedirectPage () {
    return (
       <Redirect src="/images/redirect.svg" heading="You&apos;re almost there!" paragraph="Check your email for a verification token!"/>
    )
}
