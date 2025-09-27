import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "../ui/Dialog";          // fixed
import { Button } from "../ui/Button";          // fixed
import User from "../../Entities/User";      // fixed
import { Calendar, Mail, User as UserIcon, Info, Phone } from "lucide-react";
import { format } from "date-fns";

export default function ItemDetailsModal({
  item,
  isOpen,
  onClose,
  onClaim,
  isLoggedIn,
}) {
  if (!item) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-2xl text-amrita-blue">
            {item.title}
          </DialogTitle>
          <DialogDescription>
            Found on{" "}
            {item.date_found
              ? format(new Date(item.date_found), "EEEE, MMMM d, yyyy")
              : "Unknown date"}
          </DialogDescription>
        </DialogHeader>

        <div className="my-4 space-y-4">
          {item.image_url && (
            <div className="rounded-lg overflow-hidden">
              <img
                src={item.image_url}
                alt={item.title}
                className="w-full h-auto object-cover max-h-64"
              />
            </div>
          )}
          <p className="text-gray-700">{item.description}</p>

          <div className="space-y-4 pt-4 border-t">
            {/* Finder's Contact */}
            <div className="flex items-start gap-3">
              <UserIcon className="w-4 h-4 mt-0.5 text-amrita-blue flex-shrink-0" />
              <div>
                <p className="font-semibold text-gray-800">Finder's Contact</p>
                <div className="text-gray-600 flex items-center gap-2">
                  <Mail className="w-3 h-3" />
                  <span>{item.contact_email}</span>
                </div>
                {item.contact_phone && (
                  <div className="text-gray-600 flex items-center gap-2 mt-1">
                    <Phone className="w-3 h-3" />
                    <span>{item.contact_phone}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Date Found */}
            <div className="flex items-start gap-3">
              <Calendar className="w-4 h-4 mt-0.5 text-amrita-blue flex-shrink-0" />
              <div>
                <p className="font-semibold text-gray-800">Date Found</p>
                <p className="text-gray-600">
                  {item.date_found
                    ? format(new Date(item.date_found), "MMM d, yyyy")
                    : "Unknown date"}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <DialogFooter className="sm:justify-start flex-col sm:flex-col sm:space-x-0 gap-2">
          {isLoggedIn ? (
            <Button
              className="w-full bg-amrita-blue hover:bg-amrita-blue-dark"
              onClick={() => onClaim(item)}
            >
              This is Mine - Claim Item
            </Button>
          ) : (
            <Button className="w-full" onClick={() => User.loginWithRedirect()}>
              Login to Claim Item
            </Button>
          )}

          <div className="flex items-center gap-2 p-3 bg-yellow-50 text-yellow-800 rounded-lg text-sm">
            <Info className="w-8 h-8" />
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
