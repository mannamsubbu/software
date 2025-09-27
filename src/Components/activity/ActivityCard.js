import React from "react";
import { Button } from "../ui/Button";     // fixed
import { Badge } from "../ui/Badge";       // fixed
import { Check, CheckCheck, Send, UserCheck, HelpCircle } from "lucide-react";
import { format } from "date-fns";

const StatusIndicator = ({ item }) => {
  const { status, finder_confirmed_return, claimant_confirmed_receipt } = item;

  if (status === "returned") {
    return (
      <Badge className="bg-green-100 text-green-800 flex items-center gap-1.5">
        <CheckCheck className="w-4 h-4" />
        Returned
      </Badge>
    );
  }

  if (status === "claimed") {
    if (finder_confirmed_return && !claimant_confirmed_receipt) {
      return (
        <Badge className="bg-blue-100 text-blue-800 flex items-center gap-1.5">
          <UserCheck className="w-4 h-4" />
          Awaiting Claimant Confirmation
        </Badge>
      );
    }
    if (!finder_confirmed_return && claimant_confirmed_receipt) {
      return (
        <Badge className="bg-blue-100 text-blue-800 flex items-center gap-1.5">
          <Send className="w-4 h-4" />
          Awaiting Finder Confirmation
        </Badge>
      );
    }
    return (
      <Badge className="bg-yellow-100 text-yellow-800 flex items-center gap-1.5">
        <HelpCircle className="w-4 h-4" />
        Awaiting Confirmation
      </Badge>
    );
  }

  return null;
};

export default function ActivityCard({ item, userRole, onConfirm }) {
  const getButton = () => {
    if (item.status === "returned") return null;

    if (userRole === "finder" && !item.finder_confirmed_return) {
      return (
        <Button size="sm" onClick={() => onConfirm(item)}>
          <Check className="w-4 h-4 mr-2" />
          Confirm Return
        </Button>
      );
    }

    if (
      userRole === "claimant" &&
      item.finder_confirmed_return &&
      !item.claimant_confirmed_receipt
    ) {
      return (
        <Button size="sm" onClick={() => onConfirm(item)}>
          <CheckCheck className="w-4 h-4 mr-2" />
          Confirm Receipt
        </Button>
      );
    }

    return null;
  };

  return (
    <div className="p-4 border rounded-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-gray-50/50">
      <div className="flex items-center gap-4">
        {item.image_url ? (
          <img
            src={item.image_url}
            alt={item.title}
            className="w-16 h-16 object-cover rounded-md"
          />
        ) : (
          <div className="w-16 h-16 bg-gray-200 rounded-md flex items-center justify-center text-2xl">
            📦
          </div>
        )}
        <div>
          <h4 className="font-semibold text-gray-900">{item.title}</h4>
          <p className="text-sm text-gray-600">
            {userRole === "finder"
              ? `Claimed by: ${item.claimer_email || "N/A"}`
              : `Found by: ${item.contact_email || "N/A"}`}
          </p>
          <div className="mt-2">
            <StatusIndicator item={item} />
          </div>
        </div>
      </div>
      <div className="w-full sm:w-auto flex-shrink-0">{getButton()}</div>
    </div>
  );
}
