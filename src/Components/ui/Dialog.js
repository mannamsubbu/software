import React from "react";

export function Dialog({ open = true, onOpenChange = () => {}, children }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="bg-white rounded-lg shadow-lg p-4 w-full max-w-lg relative">
        {children}
        <button onClick={() => onOpenChange(false)} className="absolute top-2 right-2">✖</button>
      </div>
    </div>
  );
}
export function DialogContent({ children, className = "" }) { return <div className={className}>{children}</div>; }
export function DialogHeader({ children }) { return <div className="mb-4">{children}</div>; }
export function DialogTitle({ children }) { return <h2 className="text-xl font-bold">{children}</h2>; }
export function DialogDescription({ children }) { return <p className="text-gray-600">{children}</p>; }
export function DialogFooter({ children, className = "" }) { return <div className={`mt-4 ${className}`}>{children}</div>; }
