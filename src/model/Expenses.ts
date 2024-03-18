export default interface Expense {
    category: string;
    amount: number;
    date: Date;
    description: string;
    id: number;
}
export enum Category {
    FOOD = 'Food',
    TRANSPORTATION = 'Transportation',
    ENTERTAIMENT = 'Entertainment',
    SERVICES = 'Services',
    HEALTH = 'Health',
    OTHER = 'Other',
}


