import Image from "next/image";

interface GoogleButtonProps {
  text: string;
}

const GoogleButton: React.FC<GoogleButtonProps> = ({ text }) => {
  return (
    <div className="flex items-center cursor-pointer justify-center bg-color-one py-3 px-6 rounded-[10px] gap-3">
      <Image 
        src={"/images/google-logo.svg"} 
        alt="Google logo" 
        width={20} 
        height={20}
      />
      <p className="text-sm font-light text-white">{text} with Google</p>
    </div>
  );
};

export default GoogleButton;
