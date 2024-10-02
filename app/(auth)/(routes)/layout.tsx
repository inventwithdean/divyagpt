import React from "react";

interface Props {
  children: React.ReactNode;
}

const layout = ({ children }: Props) => {
  return (
    <div className="h-screen w-full flex items-center justify-center">
      {children}
    </div>
  );
};

export default layout;
