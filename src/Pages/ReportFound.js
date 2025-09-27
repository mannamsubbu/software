import React, { useState } from "react";
import FoundItem from "../Entities/FoundItem";   // fixed
import User from "../Entities/User";         // fixed
import { useNavigate } from "react-router-dom";
import { createPageUrl } from "../utils";        // fixed

import ReportForm from "../Components/forms/ReportForm"; // fixed

export default function ReportFound() {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleSubmit = async (formData) => {
    setIsSubmitting(true);
    try {
      const user = await User.me();
      await FoundItem.create({ ...formData, contact_email: user.email });
      navigate(createPageUrl("Dashboard"));
    } catch (error) {
      if (error.message.includes("401")) {
        // User not logged in, redirect to login
        User.loginWithRedirect(window.location.href);
      } else {
        console.error("Error creating found item:", error);
      }
    }
    setIsSubmitting(false);
  };

  return (
    <ReportForm
      type="found"
      onSubmit={handleSubmit}
      isSubmitting={isSubmitting}
      title="Report a Found Item"
      subtitle="Thank you for helping our campus community."
      buttonText="Submit Found Item"
      fields={{
        date: "date_found",
        dateLabel: "Date item was found"
      }}
    />
  );
}
