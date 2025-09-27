import React from "react";
export const Textarea = React.forwardRef(({ className = "", ...props }, ref) => (
  <textarea ref={ref} className={`border rounded-md px-3 py-2 w-full focus:ring-2 focus:ring-blue-500 ${className}`} {...props} />
));
