import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "../ui/Dialog";
import { Button } from "../ui/Button";
import { useNavigate } from "react-router-dom";
import { Calendar, Mail, User as UserIcon, Info, Phone } from "lucide-react";
import { format } from "date-fns";

// Helper function to format the date
const formatDate = (dateString, formatStr = "EEEE, MMMM d, yyyy") => {
  if (!dateString) {
    return "Unknown date";
  }
  try {
    return format(new Date(dateString), formatStr);
  } catch (error) {
    console.error("Invalid date:", dateString, error);
    return "Invalid date";
  }
};

export default function ItemDetailsModal({
  item,
  isOpen,
  onClose,
  onClaim,
  isLoggedIn,
  showClaimButton = true, // <-- 1. ADDED THIS PROP
  pageType = 'found',
}) {
  const navigate = useNavigate();
  const isLost = pageType === 'lost';

  if (!item) return null;

  const handleLoginClick = () => {
    navigate("/login");
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-2xl text-amrita-blue">
            {item.itemName || "Item Details"}
          </DialogTitle>
          <DialogDescription>
            {isLost ? (
              <>Lost on {formatDate(item.dateLost)}</>
            ) : (
              <>Found on {formatDate(item.dateFound)}</>
            )}
          </DialogDescription>
        </DialogHeader>

        <div className="my-4 space-y-4">
          {item.imageUrl && (
            <div className="rounded-lg overflow-hidden border">
              <img
                src={item.imageUrl}
                alt={item.itemName}
                className="w-full h-auto object-cover max-h-64"
              />
            </div>
          )}
          <p className="text-gray-700">{item.description}</p>

          <div className="space-y-4 pt-4 border-t">
            {/* Contact section varies by context */}
            <div className="flex items-start gap-3">
              <UserIcon className="w-4 h-4 mt-0.5 text-amrita-blue flex-shrink-0" />
              <div>
                <p className="font-semibold text-gray-800">{isLost ? "Loser's Contact" : "Finder's Contact"}</p>
                <div className="text-gray-600 flex items-center gap-2">
                  <Mail className="w-3 h-3" />
                  <span>
                    {isLost
                      ? (item.lostBy && (item.lostBy.name || item.lostBy.email) ? (item.lostBy.name || item.lostBy.email) : "N/A")
                      : (item.reportedBy ? item.reportedBy.name : "N/A")}
                  </span>
                </div>
                {item.contact_phone && (
                  <div className="text-gray-600 flex items-center gap-2 mt-1">
                    <Phone className="w-3 h-3" />
                    <span>{item.contact_phone}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Date field varies by context */}
            <div className="flex items-start gap-3">
              <Calendar className="w-4 h-4 mt-0.5 text-amrita-blue flex-shrink-0" />
              <div>
                <p className="font-semibold text-gray-800">{isLost ? "Date Lost" : "Date Found"}</p>
                <p className="text-gray-600">
                  {isLost ? formatDate(item.dateLost, "MMM d, yyyy") : formatDate(item.dateFound, "MMM d, yyyy")}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <DialogFooter className="sm:justify-start flex-col sm:flex-col sm:space-x-0 gap-2">
          
          {/* --- 2. WRAPPED BUTTONS IN LOGIC --- */}
          {isLoggedIn && showClaimButton && (
            <Button
              className="w-full bg-amrita-blue hover:bg-amrita-blue-dark"
              onClick={() => onClaim(item)}
            >
              {isLost ? "I Found This Item" : "This is Mine - Claim Item"}
            </Button>
          )}
          {!isLoggedIn && showClaimButton && (
            <Button className="w-full" onClick={handleLoginClick}>
              Login to Claim Item
            </Button>
          )}
          {/* ---------------------------------- */}

          <div className="flex items-center gap-2 p-3 bg-yellow-50 text-yellow-800 rounded-lg text-sm">
            <Info className="w-8 h-8 flex-shrink-0" />
            <p>
              Please contact the finder to arrange pickup. Claiming an item that
              is not yours may result in disciplinary action.
            </p>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}