export interface Expense {
  id: string;
  user_id: string;
  category_id: string;
  amount: string;
  description: string;
  date: Date;
  transaction_type:string;
}

export interface CreateExpense {
  user_id: string;
  category_id?: string;
  amount: string;
  description?: string;
  date?: Date;
  transaction_type:string
}

export interface UpdateExpenseInput {
  id: string;
  user_id: string; // ¡CRÍTICO! Necesitamos el user_id para seguridad.
  amount?: string;
  description?: string;
  category_id?: string;
  date?: Date;
}
