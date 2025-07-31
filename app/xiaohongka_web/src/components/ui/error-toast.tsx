"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, AlertCircle, CheckCircle, Info } from "lucide-react";

export interface ErrorToastProps {
  message: string;
  type: 'error' | 'success' | 'info' | 'warning';
  onClose: () => void;
  duration?: number;
}

export default function ErrorToast({ 
  message, 
  type, 
  onClose, 
  duration = 5000 
}: ErrorToastProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const getIcon = () => {
    switch (type) {
      case 'error':
        return <AlertCircle className="h-5 w-5 text-red-500" />;
      case 'success':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'warning':
        return <AlertCircle className="h-5 w-5 text-yellow-500" />;
      case 'info':
        return <Info className="h-5 w-5 text-blue-500" />;
      default:
        return <Info className="h-5 w-5 text-gray-500" />;
    }
  };

  const getBgColor = () => {
    switch (type) {
      case 'error':
        return 'bg-red-50 border-red-200 dark:bg-red-950 dark:border-red-800';
      case 'success':
        return 'bg-green-50 border-green-200 dark:bg-green-950 dark:border-green-800';
      case 'warning':
        return 'bg-yellow-50 border-yellow-200 dark:bg-yellow-950 dark:border-yellow-800';
      case 'info':
        return 'bg-blue-50 border-blue-200 dark:bg-blue-950 dark:border-blue-800';
      default:
        return 'bg-gray-50 border-gray-200 dark:bg-gray-800 dark:border-gray-700';
    }
  };

  const getTextColor = () => {
    switch (type) {
      case 'error':
        return 'text-red-700 dark:text-red-300';
      case 'success':
        return 'text-green-700 dark:text-green-300';
      case 'warning':
        return 'text-yellow-700 dark:text-yellow-300';
      case 'info':
        return 'text-blue-700 dark:text-blue-300';
      default:
        return 'text-gray-700 dark:text-gray-300';
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -20, scale: 0.95 }}
        transition={{ duration: 0.3 }}
        className={`fixed top-4 right-4 z-50 max-w-sm p-4 rounded-lg border shadow-lg ${getBgColor()}`}
      >
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0">
            {getIcon()}
          </div>
          <div className="flex-1">
            <p className={`text-sm font-medium ${getTextColor()}`}>
              {message}
            </p>
          </div>
          <button
            onClick={onClose}
            className={`flex-shrink-0 ${getTextColor()} hover:opacity-70 transition-opacity`}
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}