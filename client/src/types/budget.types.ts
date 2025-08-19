export interface BudgetType {
    budget_id?: string;
    category_id: number;
    budget_amount: number;
    budget_period: string;
    createdAt?: Date;
    updatedAt?: Date;
}
