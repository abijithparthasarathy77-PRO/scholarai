import React, { useEffect } from 'react';
import { X } from 'lucide-react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  subtitle?: string;
  children: React.ReactNode;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '4xl' | '5xl';
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  subtitle,
  children,
  maxWidth = '2xl'
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const maxWidthStyles = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
    '2xl': 'max-w-2xl',
    '4xl': 'max-w-4xl',
    '5xl': 'max-w-5xl'
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-[#070B17]/80 backdrop-blur-md transition-opacity duration-300 animate-fadeIn"
      />

      {/* Modal Dialog */}
      <div
        role="dialog"
        aria-modal="true"
        className={`relative w-full ${maxWidthStyles[maxWidth]} glass-panel-elevated rounded-3xl p-6 sm:p-8 z-10 my-8 shadow-2xl border border-white/15 max-h-[90vh] flex flex-col`}
      >
        {/* Header */}
        <div className="flex items-start justify-between gap-4 pb-4 border-b border-white/10 shrink-0">
          <div>
            {title && (
              <h3 className="text-xl sm:text-2xl font-display font-bold text-[#F8FAFC] tracking-tight">
                {title}
              </h3>
            )}
            {subtitle && <p className="text-xs sm:text-sm text-[#A7B0C0] mt-1">{subtitle}</p>}
          </div>

          <button
            onClick={onClose}
            aria-label="Close modal"
            className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-[#A7B0C0] hover:text-white transition-colors border border-white/10"
          >
            <X size={18} />
          </button>
        </div>

        {/* Content body */}
        <div className="overflow-y-auto pr-1 py-4 flex-1 space-y-4">
          {children}
        </div>
      </div>
    </div>
  );
};
