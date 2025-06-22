import { useState, useCallback } from 'react';

interface UseConfirmDialogOptions {
    title: string;
    message: string;
    confirmText?: string;
    cancelText?: string;
    variant?: 'danger' | 'warning' | 'info';
}

interface ConfirmDialogState extends UseConfirmDialogOptions {
    isOpen: boolean;
    isLoading: boolean;
}

interface UseConfirmDialogReturn {
    confirmDialog: ConfirmDialogState & { onConfirm: () => void; onCancel: () => void };
    showConfirmDialog: (options: UseConfirmDialogOptions) => Promise<boolean>;
    hideConfirmDialog: () => void;
    setLoading: (loading: boolean) => void;
}

export const useConfirmDialog = (): UseConfirmDialogReturn => {
    const [confirmDialog, setState] = useState<ConfirmDialogState>({
        isOpen: false,
        isLoading: false,
        title: '',
        message: '',
        confirmText: 'Confirm',
        cancelText: 'Cancel',
        variant: 'danger'
    });

    const [resolvePromise, setResolvePromise] = useState<((value: boolean) => void) | null>(null);

    const showConfirmDialog = useCallback((options: UseConfirmDialogOptions): Promise<boolean> => {
        return new Promise<boolean>((resolve) => {
            setState({
                isOpen: true,
                isLoading: false,
                title: options.title,
                message: options.message,
                confirmText: options.confirmText ?? 'Confirm',
                cancelText: options.cancelText ?? 'Cancel',
                variant: options.variant ?? 'danger'
            });
            setResolvePromise(() => resolve);
        });
    }, []);

    const hideConfirmDialog = useCallback(() => {
        setState(prev => ({ ...prev, isOpen: false, isLoading: false }));
        if (resolvePromise) {
            resolvePromise(false);
            setResolvePromise(null);
        }
    }, [resolvePromise]);

    const handleConfirm = useCallback(() => {
        if (resolvePromise) {
            resolvePromise(true);
            setResolvePromise(null);
        }
        setState(prev => ({ ...prev, isOpen: false, isLoading: false }));
    }, [resolvePromise]);

    const handleCancel = useCallback(() => {
        hideConfirmDialog();
    }, [hideConfirmDialog]);

    const setLoading = useCallback((loading: boolean) => {
        setState(prev => ({ ...prev, isLoading: loading }));
    }, []);

    return {
        confirmDialog: {
            ...confirmDialog,
            onConfirm: handleConfirm,
            onCancel: handleCancel
        },
        showConfirmDialog,
        hideConfirmDialog,
        setLoading
    };
}; 