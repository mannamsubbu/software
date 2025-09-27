import React from "react";
export const Input = React.forwardRef(({ className = "", ...props }, ref) => (
  <input ref={ref} className={`border rounded-md px-3 py-2 w-full focus:ring-2 focus:ring-blue-500 ${className}`} {...props} />
));
