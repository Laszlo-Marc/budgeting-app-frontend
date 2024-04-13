import {createContext} from 'react';
import {
    ExpenseContextType,
    ExpenseProviderType,
} from './ExpenseContextTypes.types';

export const ExpenseContext = createContext<ExpenseContextType | null>(null);
function ExpenseContextProvider({
    expenseContext,
    children,
}: ExpenseProviderType) {
    return (
        <ExpenseContext.Provider value={expenseContext}>
            {children}
        </ExpenseContext.Provider>
    );
}

export default ExpenseContextProvider;
