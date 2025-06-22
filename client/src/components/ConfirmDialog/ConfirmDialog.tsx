import React from 'react';

export interface ConfirmDialogProps {
  isOpen: boolean;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel: () => void;
  isLoading?: boolean;
  variant?: 'danger' | 'warning' | 'info';
}

const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
  isOpen,
  title,
  message,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  onConfirm,
  onCancel,
  isLoading = false,
  variant = 'danger',
}) => {
  if (!isOpen) return null;

  const variantStyles = {
    danger: {
      icon: '⚠️',
      iconBg: 'bg-red-100',
      iconColor: 'text-red-600',
      confirmBtn: 'bg-red-600 hover:bg-red-700 focus:ring-red-500',
      titleColor: 'text-red-600',
    },
    warning: {
      icon: '⚠️',
      iconBg: 'bg-yellow-100',
      iconColor: 'text-yellow-600',
      confirmBtn: 'bg-yellow-600 hover:bg-yellow-700 focus:ring-yellow-500',
      titleColor: 'text-yellow-600',
    },
    info: {
      icon: 'ℹ️',
      iconBg: 'bg-blue-100',
      iconColor: 'text-blue-600',
      confirmBtn: 'bg-blue-600 hover:bg-blue-700 focus:ring-blue-500',
      titleColor: 'text-blue-600',
    },
  };

  const styles = variantStyles[variant];

  return (
    <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4'>
      <div className='bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden'>
        <div className='p-6'>
          {/* Icon */}
          <div className={`mx-auto flex items-center justify-center h-12 w-12 rounded-full ${styles.iconBg} mb-4`}>
            <span className={`text-2xl ${styles.iconColor}`}>{styles.icon}</span>
          </div>

          {/* Title */}
          <h3 className={`text-lg font-semibold text-center mb-2 ${styles.titleColor}`}>{title}</h3>

          {/* Message */}
          <p className='text-gray-600 text-center mb-6 leading-relaxed'>{message}</p>

          {/* Actions */}
          <div className='flex gap-3'>
            <button
              type='button'
              onClick={onCancel}
              disabled={isLoading}
              className='flex-1 px-4 py-2.5 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-all font-medium disabled:opacity-50 disabled:cursor-not-allowed'
            >
              {cancelText}
            </button>
            <button
              type='button'
              onClick={onConfirm}
              disabled={isLoading}
              className={`flex-1 px-4 py-2.5 text-white rounded-lg focus:ring-2 focus:ring-offset-2 transition-all font-medium disabled:opacity-50 disabled:cursor-not-allowed ${styles.confirmBtn}`}
            >
              {isLoading ? (
                <div className='flex items-center justify-center'>
                  <div className='animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2'></div>
                  Loading...
                </div>
              ) : (
                confirmText
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDialog;
