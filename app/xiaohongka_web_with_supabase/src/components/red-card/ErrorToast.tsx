"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { X, AlertCircle, CheckCircle, Info, AlertTriangle } from "lucide-react";

export interface ToastMessage {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message: string;
  duration?: number;
}

interface ErrorToastProps {
  toasts: ToastMessage[];
  onRemove: (id: string) => void;
}

export default function ErrorToast({ toasts, onRemove }: ErrorToastProps) {
  useEffect(() => {
    toasts.forEach(toast => {
      if (toast.duration && toast.duration > 0) {
        const timer = setTimeout(() => {
          onRemove(toast.id);
        }, toast.duration);
        
        return () => clearTimeout(timer);
      }
    });
  }, [toasts, onRemove]);

  const getIcon = (type: ToastMessage['type']) => {
    switch (type) {
      case 'success':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'error':
        return <AlertCircle className="h-5 w-5 text-red-500" />;
      case 'warning':
        return <AlertTriangle className="h-5 w-5 text-yellow-500" />;
      case 'info':
        return <Info className="h-5 w-5 text-blue-500" />;
      default:
        return <Info className="h-5 w-5 text-blue-500" />;
    }
  };

  const getColors = (type: ToastMessage['type']) => {
    switch (type) {
      case 'success':
        return {
          border: 'border-green-200 dark:border-green-800',
          bg: 'bg-green-50 dark:bg-green-950',
          text: 'text-green-800 dark:text-green-200'
        };
      case 'error':
        return {
          border: 'border-red-200 dark:border-red-800',
          bg: 'bg-red-50 dark:bg-red-950',
          text: 'text-red-800 dark:text-red-200'
        };
      case 'warning':
        return {
          border: 'border-yellow-200 dark:border-yellow-800',
          bg: 'bg-yellow-50 dark:bg-yellow-950',
          text: 'text-yellow-800 dark:text-yellow-200'
        };
      case 'info':
        return {
          border: 'border-blue-200 dark:border-blue-800',
          bg: 'bg-blue-50 dark:bg-blue-950',
          text: 'text-blue-800 dark:text-blue-200'
        };
      default:
        return {
          border: 'border-gray-200 dark:border-gray-800',
          bg: 'bg-gray-50 dark:bg-gray-950',
          text: 'text-gray-800 dark:text-gray-200'
        };
    }
  };

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2 max-w-md">
      <AnimatePresence>
        {toasts.map((toast) => {
          const colors = getColors(toast.type);
          
          return (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, x: 300, scale: 0.8 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 300, scale: 0.8 }}
              transition={{ duration: 0.3 }}
              className="cursor-pointer"
              onClick={() => onRemove(toast.id)}
            >
              <Card className={`${colors.border} ${colors.bg} shadow-lg`}>
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 mt-0.5">
                      {getIcon(toast.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className={`font-semibold ${colors.text} mb-1`}>
                        {toast.title}
                      </div>
                      <div className={`text-sm ${colors.text} opacity-90`}>
                        {toast.message}
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="flex-shrink-0 h-6 w-6 p-0 hover:bg-black/10"
                      onClick={(e) => {
                        e.stopPropagation();
                        onRemove(toast.id);
                      }}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}