import Image from "next/image";
import React from "react";
import { Poppins } from "next/font/google";
import { cn } from "@/lib/utils";

const poppins = Poppins({ weight: "400", subsets: ["latin"] });

const Loader = () => {
  return (
    <div className="h-full flex flex-col gap-y-4 items-center justify-center">
      <div className="w-10 h-10 relative animate-bounce">
        <Image fill alt="Loader" src="/logic.png"></Image>
      </div>
      <p className={cn("text-sm text-muted-foreground", poppins.className)}>
        Thinking...
      </p>
    </div>
  );
};

export default Loader;
