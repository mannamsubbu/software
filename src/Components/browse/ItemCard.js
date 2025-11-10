import React from "react";
import { Card, CardContent } from "../ui/Card";   // fixed
import { Button } from "../ui/Button";            // fixed
import { Calendar, Eye } from "lucide-react";     // removed MapPin (unused)
import { format } from "date-fns";
import { motion } from "framer-motion";

// FIX 1: All keys are now lowercase and match your database model's enum
const CATEGORY_ICONS = {
  electronics: "📱",
  clothing: "👕",
  "id card": "🆔", // Changed from 'documents'
  keys: "🗝️",
  other: "📦",
  // Removed unused keys
};

export default function ItemCard({ item, index, onCardClick }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      onClick={onCardClick}
      className="cursor-pointer group"
    >
      <Card className="hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1.5 border-none shadow-md overflow-hidden bg-white h-full flex flex-col">
        {/* Image or Category Icon */}
        <div className="aspect-video flex items-center justify-center text-5xl relative overflow-hidden">
          
          {/* FIX 2: Use item.imageUrl (capital 'U') */}
          {item.imageUrl ? (
            <img
              src={item.imageUrl}
              alt={item.itemName} // <-- Also fixed here
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="w-full h-full bg-gray-100 flex items-center justify-center">
              <span className="grayscale opacity-50 text-6xl">
                {CATEGORY_ICONS[item.category] || "📦"}
              </span>
            </div>
          )}
          <div className="absolute top-2 right-2 bg-white/80 backdrop-blur-sm p-2 rounded-full text-2xl shadow-sm">
            {CATEGORY_ICONS[item.category]}
          </div>
        </div>

        {/* Content */}
        <CardContent className="p-4 flex flex-col flex-grow">
          {/* FIX 3: Use item.itemName */}
          <h3 className="font-bold text-md text-gray-800 truncate group-hover:text-amrita-blue transition-colors duration-200">
            {item.itemName}
          </h3>
          <p className="text-gray-600 text-sm mb-3 line-clamp-2 h-10 flex-grow">
            {item.description}
          </p>
          <div className="space-y-1.5 text-xs text-gray-500 mb-4 border-t pt-3 mt-auto">
            <div className="flex items-center gap-2">
              <Calendar className="w-3 h-3" />
              <span>
                On:{" "}
                {/* FIX 4: Use item.dateFound (capital 'F') */}
                {item.dateFound
                  ? format(new Date(item.dateFound), "MMM d, yyyy")
                  : "Unknown date"}
              </span>
            </div>
          </div>
          <Button
            variant="outline"
            className="w-full border-amrita-blue/30 text-amrita-blue hover:bg-amrita-light-blue hover:text-amrita-blue font-semibold"
          >
            <Eye className="w-4 h-4 mr-2" /> View Details
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );
}