import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/Card";  // fixed
import ActivityCard from "./ActivityCard";

export default function ActivityList({
  title,
  items,
  userRole,
  onConfirm,
  emptyIcon: EmptyIcon,
  emptyText,
}) {
  return (
    <Card className="bg-white shadow-lg border-none">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {items.length > 0 ? (
          items.map((item) => (
            <ActivityCard
              key={item.id}
              item={item}
              userRole={userRole}
              onConfirm={onConfirm}
            />
          ))
        ) : (
          <div className="text-center py-12 text-gray-500 border-2 border-dashed border-gray-200 rounded-lg">
            <EmptyIcon className="w-12 h-12 mx-auto mb-4 text-gray-300" />
            <p className="font-medium">{emptyText}</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
