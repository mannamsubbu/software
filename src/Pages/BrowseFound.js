import React, { useState, useEffect } from "react";
import FoundItem from "../Entities/FoundItem";
import  User  from "../Entities/User";  // make sure this exists
import { Link } from "react-router-dom";
import { createPageUrl } from "../utils";  // put utils.js inside src/
import { Button } from "../Components/ui/Button";
import { motion } from "framer-motion";
import { Frown } from "lucide-react";

// Browse components (fix casing to Components/)
import ItemCard from "../Components/browse/ItemCard";
import SearchFilters from "../Components/browse/SearchFilters";
import ItemDetailsModal from "../Components/browse/ItemDetailsModal";

export default function BrowseFound() {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    const fetchUserAndItems = async () => {
      setIsLoading(true);
      try {
        const currentUser = await User.me();
        setUser(currentUser);
        const data = await FoundItem.filter({ status: "available" }, "-created_date");
        setItems(data);
      } catch (e) {
        setUser(null);
        const data = await FoundItem.filter({ status: "available" }, "-created_date");
        setItems(data);
      }
      setIsLoading(false);
    };
    fetchUserAndItems();
  }, []);
  
  const handleClaimItem = async (item) => {
    if (!user) {
      User.loginWithRedirect(window.location.href);
      return;
    }
    
    const updatedItem = {
      ...item,
      status: "claimed",
      claimer_email: user.email,
      claimed_date: new Date().toISOString(),
    };
    await FoundItem.update(item.id, updatedItem);
    setItems(items.filter((i) => i.id !== item.id));
    setSelectedItem(null);
  };

  const filteredItems = items.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="p-4 md:p-8 bg-gray-50/50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-amrita-blue mb-2">
              Find Your Lost Item
            </h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Browse items found by the campus community. If you see yours, click to view details and claim it.
            </p>
          </div>
        </motion.div>

        <SearchFilters
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {isLoading ? (
            Array(8).fill(0).map((_, i) => (
              <div key={i} className="animate-pulse bg-white rounded-lg shadow-md h-80"></div>
            ))
          ) : filteredItems.length > 0 ? (
            filteredItems.map((item, index) => (
              <ItemCard
                key={item.id}
                item={item}
                index={index}
                onCardClick={() => setSelectedItem(item)}
              />
            ))
          ) : (
            <div className="col-span-full text-center py-16 bg-white rounded-xl shadow-sm">
              <Frown className="w-16 h-16 mx-auto mb-4 text-gray-300" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                No Matching Items Found
              </h3>
              <p className="text-gray-600 max-w-md mx-auto">
                Try adjusting your search or filters. New items are added daily!
              </p>
            </div>
          )}
        </div>
      </div>
      
      {selectedItem && (
        <ItemDetailsModal
          item={selectedItem}
          isOpen={!!selectedItem}
          onClose={() => setSelectedItem(null)}
          onClaim={handleClaimItem}
          isLoggedIn={!!user}
        />
      )}
    </div>
  );
}
