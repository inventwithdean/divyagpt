import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const DivyaAvatar = () => {
  return (
    <Avatar className="h-8 w-8">
      <AvatarImage className="p-1" src="/logo.png" />
      <AvatarFallback>333</AvatarFallback>
    </Avatar>
  );
};

export default DivyaAvatar;
