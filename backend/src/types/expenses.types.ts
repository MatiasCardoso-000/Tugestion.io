export interface Expense {
  expense_id: string;
  user_id: string;
  category_id: string;
  amount: string;
  description: string;
  expense_date: Date;
}

export interface CreateExpense {
  user_id: string;
  category_id: string;
  amount: string;
  description?: string;
  expense_date?: Date;
}

export interface UpdateExpenseInput {
  expense_id: string;
  user_id: string; // ¡CRÍTICO! Necesitamos el user_id para seguridad.
  amount?: string;
  description?: string;
  category_id?: string;
  expense_date?: Date;
}
