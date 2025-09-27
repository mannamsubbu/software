import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { createPageUrl } from "./utils"; // fixed
import User from "./Entities/User";     // fixed
import { Search, Home, PlusSquare, Shield, LogOut, ClipboardList } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
  SidebarProvider,
  SidebarTrigger,
} from "./Components/ui/Sidebar";       // fixed
import { Button } from "./Components/ui/Button"; // fixed

export default function Layout({ children, currentPageName }) {
  const location = useLocation();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const currentUser = await User.me();
        setUser(currentUser);
      } catch (error) {
        setUser(null); // Not logged in
      }
    };
    fetchUser();
  }, [location.pathname]);

  const navigationItems = [
    { title: "Dashboard", url: createPageUrl("Dashboard"), icon: Home },
    { title: "Report Found Item", url: createPageUrl("ReportFound"), icon: PlusSquare },
    { title: "Browse Items", url: createPageUrl("BrowseFound"), icon: Search },
    { title: "My Activity", url: createPageUrl("MyActivity"), icon: ClipboardList },
  ];

  const adminNavigationItem = {
    title: "Admin Dashboard",
    url: createPageUrl("AdminDashboard"),
    icon: Shield,
  };

  return (
    <SidebarProvider>
      <style>
        {`
          :root {
            --amrita-blue: #003366;
            --amrita-saffron: #FF9933;
            --amrita-bg: #F8F9FA;
            --amrita-light-blue: #e0e8f0;
          }
          .text-amrita-blue { color: var(--amrita-blue); }
          .bg-amrita-blue { background-color: var(--amrita-blue); }
          .border-amrita-blue { border-color: var(--amrita-blue); }
          .hover\\:bg-amrita-blue-dark:hover { background-color: #002244; }
          .text-amrita-saffron { color: var(--amrita-saffron); }
          .bg-amrita-saffron { background-color: var(--amrita-saffron); }
          .hover\\:bg-amrita-saffron-dark:hover { background-color: #E68A2E; }
          .bg-amrita-light-blue { background-color: var(--amrita-light-blue); }
        `}
      </style>
      <div className="min-h-screen flex w-full bg-gray-50">
        <Sidebar className="border-r border-gray-200/60 bg-white/95 backdrop-blur-sm">
          <SidebarHeader className="border-b border-gray-200/60 p-5">
            <Link to={createPageUrl("Dashboard")} className="flex items-center gap-3">
              <div className="flex items-center gap-3">
  <img 
    src="/logo.png" 
    alt="Back2U Logo" 
    className="w-10 h-10 object-contain"
  />
  <div>
    <h2 className="font-bold text-amrita-blue text-lg">Back2You</h2>
    <p className="text-sm text-gray-500 font-medium">Amrita Lost & Found</p>
  </div>
</div>

            </Link>
          </SidebarHeader>

          <SidebarContent className="p-3">
            <SidebarGroup>
              <SidebarGroupLabel className="text-xs font-semibold text-gray-400 uppercase tracking-wider px-3 py-2">
                Menu
              </SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu className="space-y-1">
                  {navigationItems.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton
                        asChild
                        className={`transition-all duration-200 rounded-lg text-sm ${location.pathname === item.url
                          ? "bg-amrita-light-blue text-amrita-blue shadow-sm"
                          : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                          }`}
                      >
                        <Link to={item.url} className="flex items-center gap-3 px-3 py-2.5">
                          <item.icon className="w-5 h-5" />
                          <span className="font-semibold">{item.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                  {user && user.role === "admin" && (
                    <SidebarMenuItem>
                      <SidebarMenuButton
                        asChild
                        className={`transition-all duration-200 rounded-lg text-sm ${location.pathname === adminNavigationItem.url
                          ? "bg-amrita-light-blue text-amrita-blue shadow-sm"
                          : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                          }`}
                      >
                        <Link to={adminNavigationItem.url} className="flex items-center gap-3 px-3 py-2.5">
                          <adminNavigationItem.icon className="w-5 h-5" />
                          <span className="font-semibold">{adminNavigationItem.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  )}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>

          <SidebarFooter className="border-t border-gray-200/80 p-3">
            {user ? (
              <div className="flex items-center gap-3 px-2 py-2">
                <div className="w-10 h-10 bg-amrita-saffron rounded-full flex items-center justify-center">
                  <span className="text-white font-semibold text-lg">
                    {user.full_name ? user.full_name.charAt(0).toUpperCase() : "U"}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-gray-800 text-sm truncate">{user.full_name}</p>
                  <p className="text-xs text-gray-500 truncate">{user.email}</p>
                </div>
                <Button variant="ghost" size="icon" onClick={() => User.logout()} title="Logout">
                  <LogOut className="w-5 h-5 text-gray-500 hover:text-amrita-blue" />
                </Button>
              </div>
            ) : (
              <Button
                className="w-full bg-amrita-blue hover:bg-amrita-blue-dark text-white"
                onClick={() => User.login()}
              >
                Login with Campus ID
              </Button>
            )}
          </SidebarFooter>
        </Sidebar>

        <main className="flex-1 flex flex-col bg-gray-50/50">
          <header className="bg-white/90 backdrop-blur-sm border-b border-gray-200/60 px-6 py-4 md:hidden">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <SidebarTrigger className="hover:bg-gray-100 p-2 rounded-xl transition-colors duration-200" />
                <h1 className="text-lg font-bold text-amrita-blue">Back2You</h1>
              </div>
              {!user && (
                <Button
                  size="sm"
                  className="bg-amrita-blue hover:bg-amrita-blue-dark text-white"
                  onClick={() => User.login()}
                >
                  Login
                </Button>
              )}
            </div>
          </header>

          <div className="flex-1 overflow-auto">{children}</div>
        </main>
      </div>
    </SidebarProvider>
  );
}
