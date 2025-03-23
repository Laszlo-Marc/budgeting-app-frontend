import axios from 'axios';
import {create} from 'zustand';
import {Expense} from '../model/Expenses';

interface useExpenseStoreProps {
    opened: boolean;
    handleOpen: (expense?: Expense) => void;
    handleClose: () => void;
    selectedExpense: Expense;
    fetchMoreExpenses: (page: number, userid: number) => void;
    fetchExpenses: (userid: number) => void;
    addExpense: (expense: Expense) => void;
    deleteExpense: (expenseId: Expense) => void;
    editExpense: (expense: Expense) => void;
    expenses: Expense[];
    setExpenses: (expenses: Expense[]) => void;
    clearExpenses: () => void;
}
// axios
//     .get<Expense[]>('http://localhost:3001/api/expenses', {
//     })
//     .then((response) => {
//         useExpenseStore.setState({expenses: response.data});
//     });
// const FetchExpenses = async () => {
//     const {selectedUser} = useUserStore();
//     try {
//         const response = await axios.get<Expense[]>(
//             'http://localhost:3001/api/expenses',
//             {params: {userid: selectedUser.uid}},
//         );
//         useExpenseStore.setState({expenses: response.data});
//     } catch (error) {
//         console.error('Error fetching expenses', error);
//     }
// };

export const useExpenseStore = create<useExpenseStoreProps>((set) => ({
    opened: false,
    expenses: [],
    selectedExpense: {} as Expense,
    setExpenses: (expenses: Expense[]) => set({expenses}),
    clearExpenses: () => set(() => ({expenses: []})),
    handleOpen: (expense?: Expense) =>
        set({opened: true, selectedExpense: expense}),
    fetchExpenses: async (userid: number) => {
        try {
            const response = await axios.get<Expense[]>(
                'http://localhost:3001/api/expenses',
                {params: {userid: userid}},
            );
            useExpenseStore.setState({expenses: response.data});
        } catch (error) {
            console.error('Error fetching expenses', error);
        }
    },

    fetchMoreExpenses: async (page: number, userid: number) => {
        try {
            console.log('fetching more expenses');
            console.log('page:', page);
            console.log('userid:', userid);
            const response = await axios.get<Expense[]>(
                'http://localhost:3001/api/expenses',
                {params: {page: page, userid: userid}},
            );

            set((state) => ({expenses: [...state.expenses, ...response.data]}));
        } catch (error) {
            console.error('Error fetching more expenses', error);
        }
    },
    handleClose: () => set({opened: false, selectedExpense: {} as Expense}),
    editExpense: async (expense: Expense) => {
        try {
            console.log('making request');
            console.log(expense);
            await axios
                .put(
                    `http://localhost:3001/api/expenses/${expense.eid}`,
                    expense,
                )
                .then((response) => {
                    console.log('response:', response.data);
                });

            //FetchExpenses();
            set((state) => ({
                expenses: state.expenses.map((e) =>
                    e.eid === expense.eid ? expense : e,
                ),
            }));
        } catch (error) {
            console.error('Error editing expense', error);
        }
    },
    addExpense: async (expense: Expense) => {
        try {
            await axios.post('http://localhost:3001/api/expenses', expense);
            //FetchExpenses();
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
                `http://localhost:3001/api/expenses/${expense.eid}`,
            );
            //FetchExpenses();
        } catch (error) {
            console.error('Error deleting expense', error);
        }
        set((state) => ({
            expenses: state.expenses.filter((e) => e.eid !== expense.eid),
        }));
    },
}));
