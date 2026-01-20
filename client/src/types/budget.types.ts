export interface BudgetType {
    budget_id?: number;
    category_id: number;
    createdAt?: Date;
    updatedAt?: Date;
    amount: number;
    month: number;
    year: number;
}
