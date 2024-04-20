export interface Expense {
    id: number;
    category: Category;
    amount: number;
    date: Date;
    description: string;
    receiver: string;
    account: string;
}
export enum Category {
    FOOD = 'Food',
    TRANSPORTATION = 'Transportation',
    ENTERTAIMENT = 'Entertainment',
    SERVICES = 'Services',
    HEALTH = 'Health',
    OTHER = 'Other',
}
