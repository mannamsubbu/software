import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/Card";
import ActivityCard from "./ActivityCard";

export default function ActivityList({
  title,
  items,
  userRole,
  onConfirm,
  emptyIcon: EmptyIcon,
  emptyText,
  onViewDetails,
  onViewClaims, // optional
  onOpenChat,   // optional: forward chat open to parent
}) {
  return (
    <>
      <Card className="bg-white shadow-lg border-none">
        <CardHeader>
          <CardTitle>{title}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {items.length > 0 ? (
            items.map((item) => (
              <ActivityCard
                key={item._id} 
                item={item}
                userRole={userRole}
                onConfirm={onConfirm}
                onOpenChat={onOpenChat ? () => onOpenChat(item) : undefined}
                onViewDetails={() => onViewDetails(item)}
                onViewClaims={onViewClaims ? () => onViewClaims(item) : undefined} // guard optional
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

    </>
  );
}