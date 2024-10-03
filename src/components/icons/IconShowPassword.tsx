import { AiOutlineEyeInvisible } from "react-icons/ai";


export const iconShowPassword = (toggleFunction: () => void) => {
    return (
      <AiOutlineEyeInvisible
        className="absolute right-3"
        size={24}
        color="#5C5F5F"
        onClick={toggleFunction}
      />
    );
  };
