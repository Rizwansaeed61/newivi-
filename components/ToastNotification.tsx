'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, AlertCircle, Trash2, Info, X, RotateCcw, Calendar } from 'lucide-react';

export interface ToastMessage {
  id: string;
  type: 'success' | 'info' | 'warning' | 'error' | 'delete';
  title: string;
  message: string;
  undoAction?: () => void;
  undoLabel?: string;
}

interface ToastNotificationProps {
  toasts: ToastMessage[];
  onDismiss: (id: string) => void;
}

export default function ToastNotification({ toasts, onDismiss }: ToastNotificationProps) {
  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 max-w-md w-full px-4 pointer-events-none">
      <AnimatePresence mode="sync">
        {toasts.map((toast) => {
          let bgColor = 'bg-[#1C1712] border-[#2C2419]';
          let iconColor = 'text-[#E59500] bg-[#E59500]/10';
          let Icon = CheckCircle2;

          if (toast.type === 'success') {
            bgColor = 'bg-[#1C1712] border-[#10B981]/40';
            iconColor = 'text-[#10B981] bg-[#10B981]/15';
            Icon = CheckCircle2;
          } else if (toast.type === 'delete') {
            bgColor = 'bg-[#1C1712] border-[#EF4444]/40';
            iconColor = 'text-[#EF4444] bg-[#EF4444]/15';
            Icon = Trash2;
          } else if (toast.type === 'warning' || toast.type === 'info') {
            bgColor = 'bg-[#1C1712] border-[#E59500]/40';
            iconColor = 'text-[#E59500] bg-[#E59500]/15';
            Icon = Info;
          } else if (toast.type === 'error') {
            bgColor = 'bg-[#1C1712] border-[#EF4444]/40';
            iconColor = 'text-[#EF4444] bg-[#EF4444]/15';
            Icon = AlertCircle;
          }

          return (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, x: 50, scale: 0.9 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className={`pointer-events-auto border ${bgColor} p-4 rounded-2xl shadow-2xl backdrop-blur-md flex items-start gap-3 relative overflow-hidden`}
            >
              {/* Left Indicator Strip */}
              <div
                className={`absolute left-0 top-0 bottom-0 w-1 ${
                  toast.type === 'success'
                    ? 'bg-[#10B981]'
                    : toast.type === 'delete'
                    ? 'bg-[#EF4444]'
                    : toast.type === 'error'
                    ? 'bg-[#EF4444]'
                    : 'bg-[#E59500]'
                }`}
              />

              {/* Icon */}
              <div className={`p-2 rounded-xl ${iconColor} shrink-0 mt-0.5`}>
                <Icon className="w-4 h-4" />
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0 pr-6">
                <h4 className="text-xs font-bold text-[#F9F7F2] font-mono tracking-wide">{toast.title}</h4>
                <p className="text-xs text-[#A69D92] mt-0.5 leading-relaxed">{toast.message}</p>

                {toast.undoAction && (
                  <button
                    onClick={() => {
                      toast.undoAction?.();
                      onDismiss(toast.id);
                    }}
                    className="mt-2 text-xs font-bold text-[#E59500] hover:text-[#F1A417] flex items-center gap-1.5 bg-[#E59500]/10 px-2.5 py-1 rounded-lg border border-[#E59500]/30 transition-all cursor-pointer"
                  >
                    <RotateCcw className="w-3 h-3" />
                    <span>{toast.undoLabel || 'Undo Action'}</span>
                  </button>
                )}
              </div>

              {/* Dismiss Button */}
              <button
                onClick={() => onDismiss(toast.id)}
                className="absolute top-3 right-3 text-[#A69D92] hover:text-[#F9F7F2] p-1 rounded-lg hover:bg-[#2C2419] transition-all cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}
