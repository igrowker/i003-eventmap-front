import { AiOutlineEye } from "react-icons/ai";

export const iconHidePassword = (toggleFunction: () => void) => {
    return (
      <AiOutlineEye
        className="absolute right-3"
        color="#5C5F5F"
        size={24}
        onClick={toggleFunction}
      />
    );
  };