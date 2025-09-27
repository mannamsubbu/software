import React, { useState, useEffect } from "react";
import FoundItem from "../Entities/FoundItem";
import User from "../Entities/User"; // create this if not done yet
import { Link } from "react-router-dom";
import { createPageUrl } from "../utils"; // keep utils.js in src/
import { Button } from "../Components/ui/Button";
import { 
  PlusSquare, 
  Search,
  Sparkles,
  ClipboardList,
  CheckCircle,
  Users
} from "lucide-react";

import StatsCard from "../Components/dashboard/StatsCard";
import RecentActivity from "../Components/dashboard/RecentActivity";

export default function Dashboard() {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    loadData();
    const fetchUser = async () => {
      try {
        const currentUser = await User.me();
        setUser(currentUser);
      } catch (e) {
        /* not logged in */
      }
    };
    fetchUser();
  }, []);

  const loadData = async () => {
    setIsLoading(true);
    try {
      const data = await FoundItem.list("-created_date", 10);
      setItems(data);
    } catch (error) {
      console.error("Error loading data:", error);
    }
    setIsLoading(false);
  };
  
  const totalReturned = items.filter(i => i.status === "returned").length;

  return (
    <div className="p-4 md:p-8 bg-gray-50/50 min-h-screen">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Hero Section */}
        <div className="text-center py-12 px-6 rounded-2xl bg-white shadow-sm border border-gray-200/80 relative overflow-hidden">
          <div className="absolute -top-1/2 -left-1/4 w-96 h-96 bg-amrita-saffron/10 rounded-full filter blur-3xl opacity-50"></div>
          <div className="absolute -bottom-1/2 -right-1/4 w-96 h-96 bg-amrita-blue/10 rounded-full filter blur-3xl opacity-50"></div>
          
          <div className="relative">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 rounded-full text-amrita-blue text-sm font-medium mb-6">
              <Sparkles className="w-4 h-4 text-amrita-saffron" />
              Amrita Lost & Found Portal
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-amrita-blue mb-4">
              Welcome to Back2You
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
              The official place to report and find lost items on campus. Let's help each other bring belongings back to their owners.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to={createPageUrl("ReportFound")}>
                <Button className="bg-amrita-blue hover:bg-amrita-blue-dark text-white px-8 py-3 text-lg font-semibold rounded-lg shadow-lg shadow-blue-500/20 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5">
                  <PlusSquare className="w-5 h-5 mr-3" />
                  Report a Found Item
                </Button>
              </Link>
              <Link to={createPageUrl("BrowseFound")}>
                <Button variant="outline" className="border-2 border-gray-300 hover:border-amrita-blue px-8 py-3 text-lg font-semibold rounded-lg bg-white/80 backdrop-blur-sm hover:bg-gray-50 transition-all duration-300">
                  <Search className="w-5 h-5 mr-3" />
                  Browse Found Items
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <StatsCard
            title="Items Found"
            value={items.length}
            subtitle="Waiting for their owners"
            icon={ClipboardList}
            color="text-amrita-blue"
            bgColor="bg-blue-100"
          />
          <StatsCard
            title="Items Returned"
            value={totalReturned}
            subtitle="Successfully reunited"
            icon={CheckCircle}
            color="text-green-600"
            bgColor="bg-green-100"
          />
          <StatsCard
            title="Community Members"
            value="1,500+"
            subtitle="Helping each other out"
            icon={Users}
            color="text-amrita-saffron"
            bgColor="bg-yellow-100"
          />
        </div>

        {/* Recent Activity */}
        <RecentActivity items={items} isLoading={isLoading} />
      </div>
    </div>
  );
}
