import { pool } from "../database/db";
import { RevokedToken } from "../types/revokedToken.types";

/**
 * Añade un refresh token a la "lista negra" de la base de datos para invalidarlo.
 * Esto se usa durante el proceso de logout.
 *
 * @param {string} token - El refresh token que se va a revocar.
 * @returns {Promise<RevokedToken>} Una promesa que se resuelve con el objeto del token
 * que acaba de ser insertado en la lista negra.
 */
const add = async(token:string):Promise<RevokedToken>=> {
  const query = {
    text: `
    INSERT INTO REVOKED_TOKENS (token)
    VALUES($1)
    RETURNING *
    `,
    values: [token]
  }
  const {rows} = await pool.query(query)
  return rows[0]
}

/**
 * Busca un token en la "lista negra" para verificar si ha sido revocado.
 * Esto se usa en el controlador de 'refreshToken' para rechazar tokens que
 * ya no son válidos.
 *
 * @param {string} token - El refresh token a verificar.
 * @returns {Promise<RevokedToken | undefined>} Una promesa que se resuelve con el objeto del token
 * si se encuentra, o `undefined` si el token es válido (no ha sido revocado).
 */
const find = async (token: string): Promise<RevokedToken | undefined> => {
    const query = {
        text: `
            SELECT * FROM REVOKED_TOKENS
            WHERE token = $1
        `,
        values: [token],
    };
    const { rows } = await pool.query(query);
    return rows[0];
};



export const TokenBlackListModel = {
  add,
  find
}