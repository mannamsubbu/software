import React, { useState, useEffect } from "react";
import  User  from "../Entities/User";        // instead of @/entities/all
import FoundItem from "../Entities/FoundItem"; 
import { useNavigate } from "react-router-dom";
import { createPageUrl } from "../utils";     // make sure utils.js exists
import { Card, CardHeader, CardTitle, CardContent } from "../Components/ui/Card";
import { Loader2, PackageSearch, PackageCheck } from "lucide-react";

import ActivityList from "../Components/activity/ActivityList";  // capitalized

export default function MyActivity() {
  const [user, setUser] = useState(null);
  const [foundByMe, setFoundByMe] = useState([]);
  const [claimedByMe, setClaimedByMe] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserAndActivity = async () => {
      setIsLoading(true);
      try {
        const currentUser = await User.me();
        setUser(currentUser);
        fetchActivity(currentUser);
      } catch (e) {
        User.loginWithRedirect(window.location.href);
      }
    };
    fetchUserAndActivity();
  }, []);

  const fetchActivity = async (currentUser) => {
    if (!currentUser) return;
    const [foundItems, claimedItems] = await Promise.all([
      FoundItem.filter({ contact_email: currentUser.email }),
      FoundItem.filter({ claimer_email: currentUser.email }),
    ]);
    setFoundByMe(foundItems.filter((item) => item.status !== "available"));
    setClaimedByMe(claimedItems);
    setIsLoading(false);
  };
  
  const handleConfirmation = async (item, confirmationType) => {
    let updateData = {};
    let otherConfirmation = false;
    
    if (confirmationType === "finder") {
      updateData.finder_confirmed_return = true;
      otherConfirmation = item.claimant_confirmed_receipt;
    } else if (confirmationType === "claimant") {
      updateData.claimant_confirmed_receipt = true;
      otherConfirmation = item.finder_confirmed_return;
    }

    if (otherConfirmation) {
      updateData.status = "returned";
    }

    await FoundItem.update(item.id, updateData);
    fetchActivity(user);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50">
        <Loader2 className="w-12 h-12 text-amrita-blue animate-spin" />
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8 bg-gray-50/50 min-h-screen">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-amrita-blue mb-2">
            My Activity
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Manage your found item reports and claims. Confirm returns to close cases.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <ActivityList
            title="Items I Found"
            items={foundByMe}
            userRole="finder"
            onConfirm={(item) => handleConfirmation(item, "finder")}
            emptyIcon={PackageSearch}
            emptyText="You haven't reported any found items that have been claimed yet."
          />
          <ActivityList
            title="Items I Claimed"
            items={claimedByMe}
            userRole="claimant"
            onConfirm={(item) => handleConfirmation(item, "claimant")}
            emptyIcon={PackageCheck}
            emptyText="You haven't claimed any items yet."
          />
        </div>
      </div>
    </div>
  );
}
