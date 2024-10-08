import React from "react";

interface CardContainerProps {
  children: React.ReactNode;
}

const CardContainer: React.FC<CardContainerProps> = ({
  children,
}) => {
  return (
    <div
      className={`w-24 h-32 rounded-2xl flex items-center justify-center shadow-md shadow-gray-400 mx-2`}
    >
      {children}
    </div>
  );
};

export default CardContainer;
