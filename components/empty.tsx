import Image from "next/image";
import { usePathname } from "next/navigation";
import React from "react";
import { Poppins } from "next/font/google";
import { cn } from "@/lib/utils";

const poppins = Poppins({ weight: "400", subsets: ["latin"] });

const Empty = () => {
  const path = usePathname();
  let src, label;
  switch (path) {
    case "/chat":
      src = "/chat.png";
      label = "Ready to explore?";
      break;
    case "/problem-solving":
      src = "/dsa.png";
      label = "Ready to Decode?";
      break;
    case "/settings":
      src = "/settings.png";
      label = "Nothing here?";
      break;
    default:
      src = "/empty.png";
      label = "Start the conversation!";
      break;
  }
  return (
    <div className="h-full flex flex-col p-20 items-center justify-center">
      <div className="relative h-72 w-72">
        {/* <a href="https://storyset.com/transport">Transport illustrations by Storyset</a> */}
        <Image alt="Empty" fill src={src}></Image>
      </div>
      <p
        className={cn(
          "text-muted-foreground text-sm text-center mt-5",
          poppins.className
        )}
      >
        {label}
      </p>
    </div>
  );
};

export default Empty;
