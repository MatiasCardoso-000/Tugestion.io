export interface BudgetType {
    budget_id?: string;
    category_id: string;
    budget_amount: number;
    budget_period: string;
    createdAt?: Date;
    updatedAt?: Date;
}
