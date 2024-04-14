import { Expense } from '../model/Expenses';

export type ExpenseContextType = {
    expenses: Expense[];
};

export type ExpenseProviderType = {
    expenseContext: ExpenseContextType;
    children: React.ReactNode;
};
