import axios from 'axios';
import {create} from 'zustand';
import {Expense} from '../model/Expenses';

interface useExpenseStoreProps {
    opened: boolean;
    handleOpen: (expense?: Expense) => void;
    handleClose: () => void;
    selectedExpense: Expense;

    addExpense: (expense: Expense) => void;
    deleteExpense: (expenseId: Expense) => void;
    editExpense: (expense: Expense) => void;
    expenses: Expense[];
}
axios.get<Expense[]>('http://localhost:3001/api/expenses').then((response) => {
    useExpenseStore.setState({expenses: response.data});
});
const fetchExpenses = async () => {
    try {
        const response = await axios.get<Expense[]>(
            'http://localhost:3001/api/expenses',
        );
        useExpenseStore.setState({expenses: response.data});
    } catch (error) {
        console.error('Error fetching expenses', error);
    }
};

export const useExpenseStore = create<useExpenseStoreProps>((set) => ({
    opened: false,
    expenses: [],
    selectedExpense: {} as Expense,
    handleOpen: (expense?: Expense) =>
        set({opened: true, selectedExpense: expense}),

    handleClose: () => set({opened: false, selectedExpense: {} as Expense}),
    editExpense: async (expense: Expense) => {
        try {
            console.log('making request');
            await axios
                .put(
                    `http://localhost:3001/api/expenses/${expense.id}`,
                    expense,
                )
                .then((response) => {
                    console.log('response:', response.data);
                });

            fetchExpenses();
            set((state) => ({
                expenses: state.expenses.map((e) =>
                    e.id === expense.id ? expense : e,
                ),
            }));
        } catch (error) {
            console.error('Error editing expense', error);
        }
    },
    addExpense: async (expense: Expense) => {
        try {
            await axios.post('http://localhost:3001/api/expenses', expense);
            fetchExpenses();
            set((state) => ({
                expenses: [...state.expenses, expense],
            }));
        } catch (error) {
            console.error('Error adding expense', error);
        }
    },
    deleteExpense: async (expense: Expense) => {
        try {
            await axios.delete(
                `http://localhost:3001/api/expenses/${expense.id}`,
            );
            fetchExpenses();
        } catch (error) {
            console.error('Error deleting expense', error);
        }
        set((state) => ({
            expenses: state.expenses.filter((e) => e.id !== expense.id),
        }));
    },
}));
