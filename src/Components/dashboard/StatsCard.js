import React from "react";
import { Card, CardContent } from "../ui/Card";   // fixed import
import { motion } from "framer-motion";

export default function StatsCard({ 
  title, 
  value, 
  subtitle, 
  icon: Icon, 
  color,
  bgColor,
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
    >
      <Card className="border-none shadow-md hover:shadow-xl transition-all duration-300 group bg-white overflow-hidden">
        <CardContent className="p-6 relative">
          <div className="absolute top-0 right-0 w-24 h-24 opacity-10 group-hover:opacity-20 transition-opacity">
            <Icon className={`w-full h-full ${color}`} />
          </div>
          <div className="relative z-10">
            <div className={`p-3 rounded-lg ${bgColor} inline-block mb-4`}>
              <Icon className={`w-6 h-6 ${color}`} />
            </div>
            <p className="text-sm font-medium text-gray-500 uppercase tracking-wide">
              {title}
            </p>
            <p className="text-4xl font-bold text-gray-800 mt-1">
              {value}
            </p>
            <p className="text-sm text-gray-600 font-medium mt-2">
              {subtitle}
            </p>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
