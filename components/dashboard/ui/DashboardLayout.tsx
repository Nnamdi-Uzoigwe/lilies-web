"use client";

import React, { useState } from "react";
import { Sidebar } from "./Sidebar";
import Header from "./Header";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({
  children,
}) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Sidebar (fixed, outside content flow) */}
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      {/* Content wrapper */}
      <div
        className={`flex flex-col min-h-screen transition-all duration-300 ml-0 lg:ml-64`}
      >
        <Header onMenuClick={() => setIsSidebarOpen(true)} />

        <main className="flex-1 overflow-y-auto px-6 lg:px-20  p-4 pt-8 bg-white">{children}</main>
      </div>
    </div>
  );
};
