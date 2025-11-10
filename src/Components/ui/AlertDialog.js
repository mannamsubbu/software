import React, { useState, useContext, createContext, cloneElement } from "react";

const AlertDialogContext = createContext({ open: false, setOpen: () => {} });

export function AlertDialog({ children }) {
  const [open, setOpen] = useState(false);
  return (
    <AlertDialogContext.Provider value={{ open, setOpen }}>
      {children}
    </AlertDialogContext.Provider>
  );
}

export function AlertDialogTrigger({ asChild, children }) {
  const { setOpen } = useContext(AlertDialogContext);
  const child = React.Children.only(children);
  return cloneElement(child, {
    onClick: (e) => {
      if (child.props.onClick) child.props.onClick(e);
      setOpen(true);
    },
  });
}

export function AlertDialogContent({ children }) {
  const { open } = useContext(AlertDialogContext);
  if (!open) return null;
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
  const { setOpen } = useContext(AlertDialogContext);
  return (
    <button
      onClick={(e) => {
        if (onClick) onClick(e);
        setOpen(false);
      }}
      className="px-4 py-2 rounded-md border border-gray-300 bg-white hover:bg-gray-100"
    >
      {children}
    </button>
  );
}

export function AlertDialogAction({ children, onClick }) {
  const { setOpen } = useContext(AlertDialogContext);
  return (
    <button
      onClick={async (e) => {
        if (onClick) await onClick(e);
        setOpen(false);
      }}
      className="px-4 py-2 rounded-md bg-red-600 text-white hover:bg-red-700"
    >
      {children}
    </button>
  );
}
