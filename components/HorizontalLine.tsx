export default function HorizontalLine () {
    return (
        <div className="line-container flex justify-center items-center text-center my-6">
            <hr className="line h-[2px] bg-black w-[80px]" />
            <span className="or-text text-color-one text-sm font-light px-4">Or</span>
            <hr className="line h-[2px] bg-black w-[80px]" />
        </div>
    )
}