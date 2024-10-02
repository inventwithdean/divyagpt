"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import Sidebar from "@/components/sidebar";
import { Menu } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

interface MobileSidebarProps {
  generations: number;
  maxGenerations: number;
}

const MobileSidebar = ({ generations, maxGenerations }: MobileSidebarProps) => {
  const [isMounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  if (!isMounted) {
    return null;
  }
  return (
    <Sheet>
      <SheetTrigger>
        <Button
          variant={"ghost"}
          size={"icon"}
          className="md:hidden w-5 h-5"
          asChild
        >
          <Menu></Menu>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="p-0">
        <SheetTitle className="hidden">Menu</SheetTitle>
        <SheetDescription className="hidden">Menu</SheetDescription>
        <Sidebar generations={generations} maxGenerations={maxGenerations} />
      </SheetContent>
    </Sheet>
  );
};

export default MobileSidebar;
