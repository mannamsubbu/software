import React, { createContext, useContext, useState } from "react";
const SidebarContext = createContext();
export function SidebarProvider({ children }) {
  const [isOpen, setIsOpen] = useState(true);
  return <SidebarContext.Provider value={{ isOpen, setIsOpen }}>{children}</SidebarContext.Provider>;
}
export function Sidebar({ children, className = "" }) { return <aside className={`w-64 ${className}`}>{children}</aside>; }
export function SidebarHeader({ children, className = "" }) { return <div className={`p-4 ${className}`}>{children}</div>; }
export function SidebarContent({ children, className = "" }) { return <div className={className}>{children}</div>; }
export function SidebarFooter({ children, className = "" }) { return <div className={`p-4 ${className}`}>{children}</div>; }
export function SidebarGroup({ children }) { return <div className="mb-4">{children}</div>; }
export function SidebarGroupLabel({ children, className = "" }) { return <div className={`px-3 text-sm font-semibold ${className}`}>{children}</div>; }
export function SidebarGroupContent({ children }) { return <div>{children}</div>; }
export function SidebarMenu({ children, className = "" }) { return <ul className={`space-y-1 ${className}`}>{children}</ul>; }
export function SidebarMenuItem({ children }) { return <li>{children}</li>; }
export function SidebarMenuButton({ children, asChild = false, className = "" }) {
  return asChild ? children : <button className={`w-full text-left px-3 py-2 ${className}`}>{children}</button>;
}
export function SidebarTrigger({ className = "" }) {
  const { setIsOpen } = useContext(SidebarContext);
  return <button onClick={() => setIsOpen(v => !v)} className={`p-2 ${className}`}>☰</button>;
}
