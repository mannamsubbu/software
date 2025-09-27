import React, { useState, useEffect } from "react";
import FoundItem from "../Entities/FoundItem";
import  User  from "../Entities/User"; // create this if not done yet

// UI components
import { Button } from "../Components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "../Components/ui/Card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../Components/ui/Table";
import { Badge } from "../Components/ui/Badge";

// Icons
import { Trash2, Check, Shield, UserX, UserCheck, CheckCheck } from "lucide-react";

// Date formatting
import { format } from "date-fns";

// Alert Dialog
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../Components/ui/AlertDialog";

export default function AdminDashboard() {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const checkAuthAndFetch = async () => {
      try {
        const currentUser = await User.me();
        setUser(currentUser);
        if (currentUser.role !== "admin") {
          setError("Access Denied: You must be an admin to view this page.");
          setIsLoading(false);
          return;
        }
        loadItems();
      } catch (e) {
        setError("Please log in to access this page.");
        setIsLoading(false);
      }
    };
    checkAuthAndFetch();
  }, []);

  const loadItems = async () => {
    setIsLoading(true);
    const data = await FoundItem.list("-created_date");
    setItems(data);
    setIsLoading(false);
  };

  const handleDelete = async (itemId) => {
    await FoundItem.delete(itemId);
    loadItems();
  };

  const markAsReturned = async (item) => {
    await FoundItem.update(item.id, {
      status: "returned",
      finder_confirmed_return: true,
      claimant_confirmed_receipt: true,
    });
    loadItems();
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case "available":
        return <Badge variant="secondary" className="bg-green-100 text-green-800">Available</Badge>;
      case "claimed":
        return <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">Claimed</Badge>;
      case "returned":
        return <Badge variant="secondary" className="bg-blue-100 text-blue-800">Returned</Badge>;
      case "disputed":
        return <Badge variant="destructive">Disputed</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen bg-amrita-bg">
        <Card className="w-full max-w-md mx-auto text-center p-8 bg-white shadow-lg">
          <UserX className="w-16 h-16 mx-auto mb-4 text-red-500" />
          <h1 className="text-2xl font-bold text-amrita-blue">Access Denied</h1>
          <p className="text-gray-600 mt-2">{error}</p>
        </Card>
      </div>
    );
  }

  if (isLoading) return <p>Loading admin data...</p>;

  return (
    <div className="p-4 md:p-8 bg-amrita-bg min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-amrita-blue flex items-center gap-3">
            <Shield className="w-8 h-8" />
            Admin Dashboard
          </h1>
          <p className="text-gray-600">Manage all found item posts on the platform.</p>
        </div>
        <Card className="bg-white shadow-lg border-none">
          <CardHeader>
            <CardTitle>All Items ({items.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Item</TableHead>
                  <TableHead>Finder</TableHead>
                  <TableHead>Claimant</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Confirmations</TableHead>
                  <TableHead>Date Found</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {items.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className="font-medium">{item.title}</TableCell>
                    <TableCell>{item.contact_email}</TableCell>
                    <TableCell>{item.claimer_email || "N/A"}</TableCell>
                    <TableCell>{getStatusBadge(item.status)}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <span title="Finder Confirmed">
                          <UserCheck className={`w-4 h-4 ${item.finder_confirmed_return ? "text-green-600" : "text-gray-300"}`} />
                        </span>
                        <span title="Claimant Confirmed">
                          <CheckCheck className={`w-4 h-4 ${item.claimant_confirmed_receipt ? "text-green-600" : "text-gray-300"}`} />
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>{format(new Date(item.date_found), "yyyy-MM-dd")}</TableCell>
                    <TableCell className="space-x-2">
                      {item.status === "claimed" && (
                        <Button variant="outline" size="sm" onClick={() => markAsReturned(item)} title="Mark as Returned">
                          <Check className="w-4 h-4" />
                        </Button>
                      )}
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="destructive" size="sm" title="Delete Post">
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                            <AlertDialogDescription>
                              This action cannot be undone. This will permanently delete the post for "{item.title}".
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={() => handleDelete(item.id)}>Delete</AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
