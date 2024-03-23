import { create } from 'zustand';
import Expense from '../model/Expenses';
import { ExpenseList } from '../service/ExpenseAPI';

interface useExpenseStoreProps {
    opened: boolean;
    handleOpen: (expense?: Expense) => void;
    handleClose: () => void;
    expenses: Expense[]; // Add the 'expenses' property
    deleteExpense: (id: number) => void;
    addExpense: (expense: Expense) => void;
    selectedExpense: Expense | undefined;
    editExpense: (expense: Expense) => void;
}

const useExpenseStore = create<useExpenseStoreProps>((set) => ({
    opened: false,
    selectedExpense: {} as Expense,
    handleOpen: (expense?: Expense) =>
        set({opened: true, selectedExpense: expense}),
    editExpense: (expense: Expense) => {
        set((state) => ({
            expenses: state.expenses.map((e) =>
                e.id === expense.id ? expense : e,
            ),
        }));
    },
    handleClose: () => set({opened: false, selectedExpense: {} as Expense}),
    expenses: ExpenseList, // Add the 'expenses' property
    addExpense: (expense: Expense) =>
        set((state) => ({expenses: [...state.expenses, expense]})),
    deleteExpense: (id: number) =>
        set((state) => ({expenses: state.expenses.filter((e) => e.id !== id)})),
}));

export default useExpenseStore;
