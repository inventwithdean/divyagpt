import Navbar from "@/components/navbar";
import Sidebar from "@/components/sidebar";
import React from "react";
import { getuserStatsCount } from "@/lib/api-limit";

interface Props {
  children: React.ReactNode;
}

const DashboardLayout = async ({ children }: Props) => {
  const { generations, maxGenerations } = await getuserStatsCount();
  return (
    <div className="h-full relative">
      <div className="h-full hidden md:flex md:w-72 md:fixed md:inset-y-0 bg-gray-900">
        <Sidebar generations={generations} maxGenerations={maxGenerations} />
      </div>
      <main className="md:pl-72 h-100">
        <Navbar generations={generations} maxGenerations={maxGenerations} />
        {children}
      </main>
    </div>
  );
};

export default DashboardLayout;
