import {create} from 'zustand';

interface useExpenseStoreProps {
    opened: boolean;
    handleOpen: (expenseID?: number) => void;
    handleClose: () => void;
    selectedExpenseId: number | null;
}

export const useExpenseStore = create<useExpenseStoreProps>((set) => ({
    opened: false,
    selectedExpenseId: null,
    handleOpen: (expenseId?: number) =>
        set({opened: true, selectedExpenseId: expenseId || null}),

    handleClose: () => set({opened: false, selectedExpenseId: {} as number}),
}));
