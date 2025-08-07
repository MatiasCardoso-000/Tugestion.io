import { pool } from "../database/db";
import {
  CreateCategoryInput,
  Category,
  UpdateCategoryInput,
} from "../types/category.types";

/**
 * Crea una nueva categoría en la base de datos para un usuario específico.
 * Falla si el usuario ya tiene una categoría con el mismo nombre (debido a la restricción UNIQUE).
 * @param input - Un objeto con 'category_name' y 'user_id'.
 * @returns La categoría recién creada.
 */
const create = async ({
  category_name,
  user_id,
}: CreateCategoryInput): Promise<Category> => {
  const query = {
    text: `
      INSERT INTO CATEGORY (category_name,user_id)
      VALUES ($1,$2)
      RETURNING *
    `,
    values: [category_name, user_id],
  };
  const { rows } = await pool.query(query);
  return rows[0];
};

/**
 * Busca una categoría específica por su ID, asegurando que le pertenezca al usuario.
 * @param category_id - El ID de la categoría a buscar.
 * @param user_id - El ID del usuario que realiza la petición.
 * @returns La categoría encontrada o undefined si no existe o no le pertenece al usuario.
 */
const getAll = async (): Promise<Category[] | undefined> => {
  const query = {
    text: `
      SELECT * FROM CATEGORY
      WHERE user_id is NULL
      ORDER BY category_name ASC
    `,
  };
  const { rows } = await pool.query(query);
  return rows;
};

const findById = async (
  user_id: string,
  category_id: string
): Promise<Category | undefined> => {
  const query = {
    text: `
      SELECT * FROM CATEGORY
      WHERE category_id = $1 AND (user_id = $2 OR user_id IS NULL)
      ORDER BY category_name ASC
    `,
    values: [category_id, user_id],
  };
  const { rows } = await pool.query(query);

  // Devolvemos la categoría encontrada o undefined si no existe.
  return rows[0];
};
/**
 * Busca y devuelve todas las categorías que le pertenecen a un usuario específico.
 * @param user_id - El ID del usuario del que se quieren obtener las categorías.
 * @returns Una promesa que se resuelve con un array de categorías.
 */
const findByUser = async (user_id: string): Promise<Category[]> => {
  const query = {
    text: `
      SELECT * FROM CATEGORY
      WHERE user_id = $1 OR user_id is NULL
      ORDER BY category_name ASC
    `,
    values: [user_id],
  };

  const { rows } = await pool.query(query);

  // Devolvemos el array completo de resultados.
  // Si el usuario no tiene categorías, devolverá un array vacío [].
  return rows;
};

/**
 * Actualiza el nombre de una categoría específica, verificando que le pertenezca al usuario.
 * Falla si el nuevo nombre ya existe para ese usuario (debido a la restricción UNIQUE).
 * @param input - Un objeto con 'category_id', 'user_id' y el nuevo 'category_name'.
 * @returns La categoría actualizada o undefined si no se encontró.
 */
const update = async ({
  category_id,
  user_id,
  category_name,
}: UpdateCategoryInput): Promise<Category | undefined> => {
  const query = {
    text: `
            UPDATE CATEGORY
            SET category_name = $1
            WHERE category_id = $2 AND user_id = $3
            RETURNING *
        `,
    values: [category_name, category_id, user_id],
  };
  const { rows } = await pool.query(query);
  return rows[0];
};

/**
 * Elimina una categoría específica, verificando que le pertenezca al usuario.
 * Falla si la categoría tiene gastos asociados (debido a la restricción ON DELETE RESTRICT).
 * @param category_id - El ID de la categoría a eliminar.
 * @param user_id - El ID del usuario propietario.
 * @returns La categoría eliminada o undefined si no se encontró.
 */
const remove = async (
  category_id: string,
  user_id: string
): Promise<Category | undefined> => {
  const query = {
    text: `
            DELETE FROM CATEGORY
            WHERE category_id = $1 AND user_id = $2
            RETURNING *
        `,
    values: [category_id, user_id],
  };
  const { rows } = await pool.query(query);
  return rows[0];
};

export const CategoryModel = {
  create,
  getAll,
  findById,
  findByUser,
  update,
  remove,
};
