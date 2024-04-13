import {Expense} from '../model/Expenses';

export type ExpenseContextType = {
    expenses: Expense[];
    addExpense: (expense: Expense) => void;
    deleteExpense: (id: number) => void;
    editExpense: (expense: Expense) => void;
    getExpenseById: (id: number) => Expense;
};

export type ExpenseProviderType = {
    expenseContext: ExpenseContextType;
    children: React.ReactNode;
};
