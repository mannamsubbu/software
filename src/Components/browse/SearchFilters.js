import React from "react";
import { Input } from "../ui/Input";      // fixed
import { Select } from "../ui/Select";    // fixed
import { motion } from "framer-motion";
import { Search } from "lucide-react";

const CATEGORIES = [
  { value: "all", label: "All Categories" },
  { value: "electronics", label: "📱 Electronics" },
  { value: "clothing", label: "👕 Clothing" },
  { value: "books", label: "📚 Books & Stationery" },
  { value: "jewelry", label: "💍 Jewelry & Accessories" },
  { value: "keys", label: "🗝️ Keys" },
  { value: "bags", label: "🎒 Bags & Backpacks" },
  { value: "documents", label: "📄 Documents & ID" },
  { value: "sports_equipment", label: "⚽ Sports Equipment" },
  { value: "other", label: "📦 Other" },
];

export default function SearchFilters({
  searchTerm,
  setSearchTerm,
  selectedCategory,
  setSelectedCategory,
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="mb-8 p-4 bg-white/80 backdrop-blur-sm rounded-xl shadow-sm border border-gray-200/80 sticky top-4 z-20"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Search Box */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Search by keyword (e.g., 'watch', 'black')"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Category Dropdown */}
        <Select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          {CATEGORIES.map((cat) => (
            <option key={cat.value} value={cat.value}>
              {cat.label}
            </option>
          ))}
        </Select>
      </div>
    </motion.div>
  );
}
