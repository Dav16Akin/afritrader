'use client';

import { useUIStore } from '@/lib/stores/ui-store';
import { cn } from '@/lib/utils/cn';
import { useEffect } from 'react';

const typeStyles = {
  success: 'bg-[#1A5C38] text-white',
  error: 'bg-red-500 text-white',
  info: 'bg-blue-600 text-white',
};

function ToastItem({ id, message, type }: { id: string; message: string; type: 'success' | 'error' | 'info' }) {
  const removeToast = useUIStore((s) => s.removeToast);

  useEffect(() => {
    const timer = setTimeout(() => removeToast(id), 4000);
    return () => clearTimeout(timer);
  }, [id, removeToast]);

  return (
    <div
      className={cn(
        'animate-slide-up rounded-lg px-4 py-3 text-sm font-medium shadow-lg',
        typeStyles[type],
      )}
      role="alert"
    >
      {message}
      <button onClick={() => removeToast(id)} className="ml-3 opacity-70 hover:opacity-100" aria-label="Dismiss">
        ✕
      </button>
    </div>
  );
}

export function ToastContainer() {
  const toasts = useUIStore((s) => s.toasts);

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2">
      {toasts.map((toast) => (
        <ToastItem key={toast.id} {...toast} />
      ))}
    </div>
  );
}
