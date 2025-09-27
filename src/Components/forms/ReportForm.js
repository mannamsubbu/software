import React, { useState } from "react";
import { UploadFile } from "../../integrations/Core"; // adjust path to where Core.js is (or mock it)
import { Button } from "../ui/Button";
import { Input } from "../ui/Input";
import { Textarea } from "../ui/Textarea";
import { Label } from "../ui/Label";
import { Select } from "../ui/Select";
import { Card, CardContent } from "../ui/Card";
import { Upload, Loader2, PlusSquare } from "lucide-react";
import { motion } from "framer-motion";

const CATEGORIES = [
  { value: "electronics", label: "Electronics", icon: "📱" },
  { value: "clothing", label: "Clothing", icon: "👕" },
  { value: "books", label: "Books & Stationery", icon: "📚" },
  { value: "jewelry", label: "Jewelry & Accessories", icon: "💍" },
  { value: "keys", label: "Keys", icon: "🗝️" },
  { value: "bags", label: "Bags & Backpacks", icon: "🎒" },
  { value: "documents", label: "Documents & ID", icon: "📄" },
  { value: "sports_equipment", label: "Sports Equipment", icon: "⚽" },
  { value: "other", label: "Other", icon: "📦" },
];

export default function ReportForm({
  onSubmit,
  isSubmitting,
  title,
  subtitle,
  buttonText,
  fields,
}) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    [fields.date]: "",
    contact_phone: "",
    image_url: "",
  });

  const [imageUploading, setImageUploading] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setImageUploading(true);
    try {
      const reader = new FileReader();
      reader.onload = (e) => setImagePreview(e.target.result);
      reader.readAsDataURL(file);

      // If no real backend, just simulate URL
      let file_url = URL.createObjectURL(file);
      if (UploadFile) {
        const uploaded = await UploadFile({ file });
        file_url = uploaded.file_url || file_url;
      }

      handleInputChange("image_url", file_url);
    } catch (error) {
      console.error("Error uploading image:", error);
    }
    setImageUploading(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await onSubmit(formData);
  };

  const isValid =
    formData.title && formData.description && formData.category && formData[fields.date];

  return (
    <div className="p-4 md:p-8 bg-gray-50/50 min-h-screen">
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="text-center">
            <h1 className="text-3xl font-bold text-amrita-blue mb-2">{title}</h1>
            <p className="text-gray-600">{subtitle}</p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="shadow-lg border-none bg-white">
            <CardContent className="p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Title */}
                <div>
                  <Label htmlFor="title">Item Name *</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => handleInputChange("title", e.target.value)}
                    placeholder="e.g., iPhone 13, Blue backpack"
                    required
                  />
                </div>

                {/* Description */}
                <div>
                  <Label htmlFor="description">Description *</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => handleInputChange("description", e.target.value)}
                    placeholder="Color, brand, distinguishing features..."
                    className="h-24"
                    required
                  />
                </div>

                {/* Category */}
                <div>
                  <Label htmlFor="category">Category *</Label>
                  <Select
                    value={formData.category}
                    onChange={(e) => handleInputChange("category", e.target.value)}
                  >
                    <option value="">Select a category</option>
                    {CATEGORIES.map((cat) => (
                      <option key={cat.value} value={cat.value}>
                        {cat.icon} {cat.label}
                      </option>
                    ))}
                  </Select>
                </div>

                {/* Date */}
                <div>
                  <Label htmlFor="date">{fields.dateLabel} *</Label>
                  <Input
                    id="date"
                    type="date"
                    value={formData[fields.date]}
                    onChange={(e) => handleInputChange(fields.date, e.target.value)}
                    required
                  />
                </div>

                {/* Phone */}
                <div>
                  <Label htmlFor="phone">Your Mobile Number (Optional)</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.contact_phone}
                    onChange={(e) => handleInputChange("contact_phone", e.target.value)}
                    placeholder="e.g., 9876543210"
                  />
                </div>

                {/* Image Upload */}
                <div>
                  <Label>Photo (Optional)</Label>
                  <div className="mt-1 border-2 border-dashed border-gray-200 rounded-lg p-6 text-center hover:border-gray-300">
                    {imagePreview ? (
                      <div className="space-y-4">
                        <img
                          src={imagePreview}
                          alt="Preview"
                          className="max-w-full h-40 object-contain mx-auto rounded-md"
                        />
                        <p className="text-sm text-green-600">Image uploaded!</p>
                      </div>
                    ) : (
                      <div>
                        <div className="w-12 h-12 mx-auto mb-2 bg-gray-100 rounded-lg flex items-center justify-center">
                          <Upload className="w-6 h-6 text-gray-400" />
                        </div>
                        <Label htmlFor="image" className="cursor-pointer text-amrita-blue font-medium">
                          {imageUploading ? "Uploading..." : "Click to upload"}
                        </Label>
                        <p className="text-xs text-gray-500 mt-1">PNG, JPG up to 10MB</p>
                        <Input
                          id="image"
                          type="file"
                          accept="image/*"
                          onChange={handleImageUpload}
                          className="hidden"
                          disabled={imageUploading}
                        />
                      </div>
                    )}
                  </div>
                </div>

                {/* Submit */}
                <div className="pt-4 border-t border-gray-100">
                  <Button
                    type="submit"
                    className="w-full py-3 text-lg font-medium rounded-xl shadow-md hover:shadow-lg bg-amrita-blue hover:bg-amrita-blue-dark"
                    disabled={!isValid || isSubmitting}
                  >
                    {isSubmitting ? (
                      <Loader2 className="w-5 h-5 animate-spin" />
                    ) : (
                      <span className="flex items-center justify-center gap-2">
                        <PlusSquare />
                        {buttonText}
                      </span>
                    )}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
