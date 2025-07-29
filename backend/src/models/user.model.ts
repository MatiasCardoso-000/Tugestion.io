import { pool } from "../database/db";
import { CreateUserInput, User, UserForAuth } from "../types/user.types";

/**
 * Crea un nuevo usuario en la base de datos.
 * Esta función es segura y no devuelve información sensible.
 *
 * @param {CreateUserInput} input - Un objeto que contiene los datos del nuevo usuario.
 * @param {string} input.username - El nombre de usuario.
 * @param {string} input.email - El correo electrónico del usuario (debe ser único).
 * @param {string} input.password_hash - El hash de la contraseña ya procesado con bcrypt.
 * @returns {Promise<User>} Una promesa que se resuelve con el objeto del usuario recién creado,
 * excluyendo datos sensibles como el hash de la contraseña.
 * @throws {Error} Lanza un error si el correo electrónico ya está en uso (violación de la restricción UNIQUE de la base de datos).
 */
const create = async ({
  username,
  email,
  password_hash,
}: CreateUserInput): Promise<UserForAuth> => {
  const query = {
    text: `
    INSERT INTO USERS(username,email,password_hash)
    VALUES($1,$2,$3)
    RETURNING username,email, user_id
    `,
    values: [username, email, password_hash],
  };

  const { rows } = await pool.query(query);
  return rows[0];
};

/**
 * Busca a un usuario por su email para el proceso de autenticación.
 * ¡ADVERTENCIA DE SEGURIDAD! Esta función devuelve el password_hash del usuario.
 * Debe usarse SOLAMENTE para verificar la contraseña durante el login.
 * NUNCA se debe devolver el objeto resultante directamente en una respuesta de API.
 * @param email - El email del usuario a buscar.
 * @returns El objeto completo del usuario (incluyendo hash) o undefined si no se encuentra.
 */
const findByEmailForAuth = async (
  email: string
): Promise<UserForAuth | undefined> => {
  const query = {
    text: `
      SELECT * FROM USERS
      WHERE EMAIL = $1
    `,
    values: [email],
  };
  const { rows } = await pool.query(query);
  return rows[0];
};

/**
 * Busca un usuario por su ID de forma segura.
 * Esta función es ideal para uso general en la aplicación, ya que excluye
 * explícitamente el `password_hash` y otros datos sensibles del resultado.
 *
 * @param {string} user_id - El ID único del usuario a buscar.
 * @returns {Promise<User | undefined>} Una promesa que se resuelve con el objeto del usuario
 * si se encuentra, o `undefined` si no existe un usuario con ese ID.
 */
const findById = async (user_id: string): Promise<User | undefined> => {
  const query = {
    text: `
    SELECT user_id,username,email,role FROM USERS
    WHERE user_id = $1
    `,
    values: [user_id],
  };
  const { rows } = await pool.query(query);
  return rows[0];
};

// --- Función del Modelo ---

/**
 * Actualiza los datos de un usuario específico en la base de datos.
 * Es una función genérica; la lógica de permisos (quién puede actualizar qué)
 * debe ser manejada por el controlador que la llama.
 *
 * @param {UpdateUserInput} input - Un objeto con el 'user_id' a actualizar y los campos opcionales a modificar.
 * @returns {Promise<User | undefined>} Una promesa que se resuelve con el objeto del usuario actualizado
 * (sin datos sensibles) o `undefined` si el usuario no fue encontrado.
 */
const updateUser = async ({
  email,
  username,
  role,
  user_id,
}: User): Promise<User | undefined> => {
  const query = {
    text: `
    UPDATE USERS
      SET
        email = COALESCE($1, email),
        username = COALESCE($2, username),
        role = COALESCE($3, role)
      WHERE user_id = $4
      RETURNING user_id, username, email, role
    `,
    values: [email, username, role, user_id],
  };
  const { rows } = await pool.query(query);
  return rows[0];
};

/**
 * Elimina un usuario específico de la base de datos por su ID.
 * ¡ADVERTENCIA! Esta es una operación destructiva y permanente.
 * Gracias a la configuración 'ON DELETE CASCADE' en la base de datos,
 * al eliminar un usuario también se eliminarán en cascada todos sus
 * gastos y categorías asociadas.
 *
 * @param {string} user_id - El ID único del usuario a eliminar.
 * @returns {Promise<User | undefined>} Una promesa que se resuelve con el objeto
 * del usuario eliminado (sin datos sensibles) o `undefined` si no se encontró
 * ningún usuario con ese ID.
 */
const remove = async(user_id:string):Promise<User | undefined>=> {
  const query= { 
    text:`
      DELETE FROM USERS 
      WHERE user_id = $1
      RETURNING user_id, username, email, role
    `,
    values: [user_id]
  }
const {rows} = await pool.query(query)
return rows[0]
}


export const UserModel = {
  create,
  findByEmailForAuth,
  findById,
  updateUser,
  remove
};
