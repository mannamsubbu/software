import React, { useState } from "react";

export function AlertDialog({ children }) {
  return <>{children}</>;
}

export function AlertDialogTrigger({ asChild, children }) {
  return <>{children}</>;
}

export function AlertDialogContent({ children }) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-6">{children}</div>
    </div>
  );
}

export function AlertDialogHeader({ children }) {
  return <div className="mb-4">{children}</div>;
}

export function AlertDialogTitle({ children }) {
  return <h2 className="text-lg font-bold">{children}</h2>;
}

export function AlertDialogDescription({ children }) {
  return <p className="text-gray-600">{children}</p>;
}

export function AlertDialogFooter({ children }) {
  return <div className="mt-4 flex justify-end gap-2">{children}</div>;
}

export function AlertDialogCancel({ children, onClick }) {
  return (
    <button
      onClick={onClick}
      className="px-4 py-2 rounded-md border border-gray-300 bg-white hover:bg-gray-100"
    >
      {children}
    </button>
  );
}

export function AlertDialogAction({ children, onClick }) {
  return (
    <button
      onClick={onClick}
      className="px-4 py-2 rounded-md bg-red-600 text-white hover:bg-red-700"
    >
      {children}
    </button>
  );
}
