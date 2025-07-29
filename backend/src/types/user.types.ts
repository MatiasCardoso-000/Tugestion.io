// Representa un usuario como existe en la DB (sin el hash)
export interface User {
  user_id: string;
  username: string;
  email: string;
  role: 'user' | 'admin'; // Incluimos el rol
}

// Datos necesarios para crear un usuario
export interface CreateUserInput {
  username: string;
  email: string;
  password_hash: string; // El hash solo se usa para el INSERT
}

export interface UserForAuth extends User {
  password_hash: string;
}

