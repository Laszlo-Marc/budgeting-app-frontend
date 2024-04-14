import {create} from 'zustand';

interface useExpenseStoreProps {
    opened: boolean;
    handleOpen: (expenseID?: number) => void;
    handleClose: () => void;
    selectedExpenseId: number | null;
    setSelctedExpenseId: (expenseId: number | undefined) => void;
}

export const useExpenseStore = create<useExpenseStoreProps>((set) => ({
    opened: false,
    selectedExpenseId: null,
    setSelctedExpenseId: (expenseId: number | undefined) =>
        set({selectedExpenseId: expenseId}),
    handleOpen: (expenseId?: number) =>
        set({opened: true, selectedExpenseId: expenseId}),

    handleClose: () => set({opened: false, selectedExpenseId: {} as number}),
}));
