"use client";

import { UserButton } from "@clerk/nextjs";
import MobileSidebar from "./mobile-sidebar";

interface NavbarProps {
  generations: number;
  maxGenerations: number;
}

const Navbar = ({ generations, maxGenerations }: NavbarProps) => {
  return (
    <div className="flex items-center p-4">
      <MobileSidebar
        generations={generations}
        maxGenerations={maxGenerations}
      />
      <div className="flex w-full justify-end">
        <UserButton />
      </div>
    </div>
  );
};

export default Navbar;
