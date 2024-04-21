import {Expense} from './Expenses';

export interface User {
    id: number;
    name: string;
    age: number;
    email: string;
    password: string;
    expenses: Expense[];
}
