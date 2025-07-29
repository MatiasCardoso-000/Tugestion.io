// Definimos un tipo para la categoría en la DB
export interface Category {
    category_id: number;
    category_name: string;
    user_id: string;
}

// Un tipo específico para los datos de entrada
export interface CreateCategoryInput {
    category_name: string;
    user_id: string;
}


// Datos necesarios para actualizar una categoría.
export interface UpdateCategoryInput {
  category_id: number;
  user_id: string;
  category_name: string;
}