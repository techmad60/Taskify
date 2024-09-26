import { poppinsFont } from "@/fonts/fonts"

export default function FormButton ({ButtonText=""}) {
    return (
        <button type="submit" className={`${poppinsFont.className}flex justify-center self-center text-sm bg-primary-color duration-300 hover:bg-secondary-color my-6 py-2 px-3 rounded-sm outline outline-offset-2 outline-1 outline-blue-400`}>
            {ButtonText}
        </button>
       
    )
}