import React from "react";
export function Select({ value, onValueChange = () => {}, onChange, children, className = "" }) {
  // support both onValueChange(value) and native onChange
  const handle = (e) => { if (onValueChange) onValueChange(e.target.value); if (onChange) onChange(e); };
  return <select value={value} onChange={handle} className={`border rounded-md px-3 py-2 w-full ${className}`}>{children}</select>;
}
export function SelectTrigger(){return null;}
export function SelectValue(){return null;}
export function SelectContent({ children }){ return <>{children}</>; }
export function SelectItem({ value, children }){ return <option value={value}>{children}</option>; }
