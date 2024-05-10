export interface Expense {
    eid: number;
    category: Category;
    amount: number;
    date: string;
    description: string;
    receiver: string;
    account: string;
    userid: number;
}
export enum Category {
    FOOD = 'Food',
    TRANSPORTATION = 'Transportation',
    ENTERTAIMENT = 'Entertainment',
    SERVICES = 'Services',
    HEALTH = 'Health',
    OTHER = 'Other',
}
