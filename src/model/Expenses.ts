export class Expense {
    private category: string;
    private amount: number;
    private date: string;
    private description: string;
    private account: string;
    private receiver: string;
    private id: number;
    constructor(
        id: number,
        category: string,
        amount: number,
        date: string,
        description: string,
        account: string,
        receiver: string,
    ) {
        this.id = id;
        this.category = category;
        this.amount = amount;
        this.date = date;
        this.description = description;
        this.account = account;
        this.receiver = receiver;
    }
    public getId(): number {
        return this.id;
    }
    public getCategory(): string {
        return this.category;
    }
    public getAmount(): number {
        return this.amount;
    }
    public getDate(): string {
        return this.date;
    }
    public getDescription(): string {
        return this.description;
    }
    public getAccount(): string {
        return this.account;
    }
    public getReceiver(): string {
        return this.receiver;
    }
    public setId(id: number): void {
        this.id = id;
    }
    public setCategory(category: string): void {
        this.category = category;
    }
    public setAmount(amount: number): void {
        this.amount = amount;
    }
    public setDate(date: string): void {
        this.date = date;
    }
    public setDescription(description: string): void {
        this.description = description;
    }
    public setAccount(account: string): void {
        this.account = account;
    }
    public setReceiver(receiver: string): void {
        this.receiver = receiver;
    }
}
export enum Category {
    FOOD = 'Food',
    TRANSPORTATION = 'Transportation',
    ENTERTAIMENT = 'Entertainment',
    SERVICES = 'Services',
    HEALTH = 'Health',
    OTHER = 'Other',
}
