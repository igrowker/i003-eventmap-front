import React from "react";

interface CardContainerProps {
  gradient: string;
  children: React.ReactNode;
}

const CardContainer: React.FC<CardContainerProps> = ({
  gradient,
  children,
}) => {
  return (
    <div
      className={`${gradient} w-24 h-32 rounded-2xl flex items-center justify-center shadow-md mx-2`}
    >
      {children}
    </div>
  );
};

export default CardContainer;
