import {create} from '@mui/material/styles/createTransitions';
import Expense from '../model/Expenses';

interface useExpenseStoreProps {
    opened: boolean;
    handleOpen: (expense?: Expense) => void;
    handleClose: () => void;
    expenses: Expense[];
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
    editDog: (expense: Expense) => {
        set((state) => ({
            expenses: state.expenses.map((e) =>
                e.id === expense.id ? expense : e,
            ),
        }));
    },
    handleClose: () => set({opened: false, selectedExpense: {} as Expense}),
    expenses: ExpenseList,
    addExpense: (expense: Expense) =>
        set((state) => ({expenses: [...state.expenses, expense]})),
    deleteExpense: (dogId: number) =>
        set((state) => ({expenses: state.expenses.filter((e) => e.id !== id)})),
}));
