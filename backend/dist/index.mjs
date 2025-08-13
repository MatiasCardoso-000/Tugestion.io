import express, { Router } from 'express';
import { Pool } from 'pg';
import jwt from 'jsonwebtoken';
import { z } from 'zod';
import bcrypt from 'bcrypt';
import cookieParser from 'cookie-parser';
import cors from 'cors';

const PORT = process.env.PORT || 8080;
const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN || "yoursecret";
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN || "yoursecret";

const connectionString = process.env.DATABASE_URL;
const pool = new Pool({
  allowExitOnIdle: true,
  connectionString
});
const checkDbConnection = async () => {
  try {
    const client = await pool.connect();
    await client.query("SELECT NOW()");
    console.info("database connected \u{1F680}\u{1F680}\u{1F680}");
    client.release();
  } catch (error) {
    console.error("database connection error \u274C\u274C\u274C", error);
    process.exit(1);
  }
};

const validateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Acceso denegado. No se provey\xF3 un token." });
  }
  const token = authHeader.split(" ")[1];
  try {
    if (!ACCESS_TOKEN_SECRET) ;
    const decoded = jwt.verify(token, ACCESS_TOKEN_SECRET);
    req.user = { uid: decoded.uid };
    next();
  } catch (error) {
    res.status(401).json({ message: "Token inv\xE1lido o expirado." });
  }
};

const create$2 = async ({
  username,
  email,
  password_hash
}) => {
  const query = {
    text: `
    INSERT INTO USERS(username,email,password_hash)
    VALUES($1,$2,$3)
    RETURNING username,email, user_id
    `,
    values: [username, email, password_hash]
  };
  const { rows } = await pool.query(query);
  return rows[0];
};
const findByEmailForAuth = async (email) => {
  const query = {
    text: `
      SELECT * FROM USERS
      WHERE EMAIL = $1
    `,
    values: [email]
  };
  const { rows } = await pool.query(query);
  return rows[0];
};
const findById$2 = async (user_id) => {
  const query = {
    text: `
    SELECT user_id,username,email,role,created_at FROM USERS
    WHERE user_id = $1
    `,
    values: [user_id]
  };
  const { rows } = await pool.query(query);
  return rows[0];
};
const updateUser = async ({
  email,
  username,
  role,
  user_id
}) => {
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
    values: [email, username, role, user_id]
  };
  const { rows } = await pool.query(query);
  return rows[0];
};
const remove$2 = async (user_id) => {
  const query = {
    text: `
      DELETE FROM USERS 
      WHERE user_id = $1
      RETURNING user_id, username, email, role
    `,
    values: [user_id]
  };
  const { rows } = await pool.query(query);
  return rows[0];
};
const UserModel = {
  create: create$2,
  findByEmailForAuth,
  findById: findById$2,
  updateUser,
  remove: remove$2
};

const adminAuthMiddleware = async (req, res, next) => {
  try {
    const user_id = req.user?.uid;
    if (!user_id) {
      return res.status(401).json({ message: "Usuario no autenticado." });
    }
    const userResult = await UserModel.findById(user_id);
    if (!userResult) {
      return res.status(404).json({ message: "Usuario no encontrado." });
    }
    const userRole = userResult.role;
    if (userRole !== "admin") {
      return res.status(403).json({ message: "Acceso denegado. Se requiere rol de administrador." });
    }
    next();
  } catch (error) {
    res.status(500).json({ message: "Error interno del servidor al verificar el rol." });
  }
};

const create$1 = async ({
  category_id,
  user_id,
  amount,
  description,
  expense_date
}) => {
  const query = {
    text: `
    INSERT INTO EXPENSES(category_id, user_id, amount, description, expense_date)
      VALUES($1, $2, $3, $4, COALESCE($5,CURRENT_DATE))
      RETURNING *
    `,
    values: [category_id, user_id, amount, description, expense_date]
  };
  const { rows } = await pool.query(query);
  return rows[0];
};
const find$1 = async () => {
  const query = {
    text: `
    SELECT * FROM EXPENSES
    `
  };
  const { rows } = await pool.query(query);
  return rows;
};
const findById$1 = async (expense_id, user_id) => {
  const query = {
    text: `
    SELECT * FROM EXPENSES
   WHERE expense_id = $1 AND user_id = $2
    `,
    values: [expense_id, user_id]
  };
  const { rows } = await pool.query(query);
  return rows[0];
};
const findByUser$1 = async (user_id) => {
  const query = {
    text: `
    SELECT * FROM EXPENSES
   WHERE user_id = $1 
    `,
    values: [user_id]
  };
  const { rows } = await pool.query(query);
  return rows;
};
const update$1 = async ({
  expense_id,
  user_id,
  amount,
  category_id,
  description,
  expense_date
}) => {
  const query = {
    text: `
    UPDATE EXPENSES
      SET 
        amount = COALESCE($1, amount),
        description = COALESCE($2, description),
        category_id = COALESCE($3, category_id),
        expense_date = COALESCE($4, expense_date)
      WHERE expense_id = $5 AND user_id = $6
      RETURNING *

    `,
    values: [
      amount,
      description,
      category_id,
      expense_date,
      expense_id,
      user_id
    ]
  };
  const { rows } = await pool.query(query);
  return rows[0];
};
const remove$1 = async (expense_id, user_id) => {
  const query = {
    text: `
            DELETE FROM EXPENSES
            WHERE expense_id = $1 AND user_id = $2
            RETURNING *
        `,
    values: [expense_id, user_id]
  };
  const { rows } = await pool.query(query);
  return rows[0];
};
const ExpensesModel = {
  create: create$1,
  find: find$1,
  findById: findById$1,
  findByUser: findByUser$1,
  update: update$1,
  remove: remove$1
};

const create = async ({
  category_name,
  user_id
}) => {
  const query = {
    text: `
      INSERT INTO CATEGORY (category_name,user_id)
      VALUES ($1,$2)
      RETURNING *
    `,
    values: [category_name, user_id]
  };
  const { rows } = await pool.query(query);
  return rows[0];
};
const getAll = async () => {
  const query = {
    text: `
      SELECT * FROM CATEGORY
      WHERE user_id is NULL
      ORDER BY category_name ASC
    `
  };
  const { rows } = await pool.query(query);
  return rows;
};
const findById = async (user_id, category_id) => {
  const query = {
    text: `
      SELECT * FROM CATEGORY
      WHERE category_id = $1 AND (user_id = $2 OR user_id IS NULL)
      ORDER BY category_name ASC
    `,
    values: [category_id, user_id]
  };
  const { rows } = await pool.query(query);
  return rows[0];
};
const findByUser = async (user_id) => {
  const query = {
    text: `
      SELECT * FROM CATEGORY
      WHERE user_id = $1 OR user_id is NULL
      ORDER BY category_name ASC
    `,
    values: [user_id]
  };
  const { rows } = await pool.query(query);
  return rows;
};
const update = async ({
  category_id,
  user_id,
  category_name
}) => {
  const query = {
    text: `
            UPDATE CATEGORY
            SET category_name = $1
            WHERE category_id = $2 AND user_id = $3
            RETURNING *
        `,
    values: [category_name, category_id, user_id]
  };
  const { rows } = await pool.query(query);
  return rows[0];
};
const remove = async (category_id, user_id) => {
  const query = {
    text: `
            DELETE FROM CATEGORY
            WHERE category_id = $1 AND user_id = $2
            RETURNING *
        `,
    values: [category_id, user_id]
  };
  const { rows } = await pool.query(query);
  return rows[0];
};
const CategoryModel = {
  create,
  getAll,
  findById,
  findByUser,
  update,
  remove
};

const createExpenseSchema = z.object({
  amount: z.string(),
  category_id: z.string(),
  description: z.string().min(1, "La descripci\xF3n es requerida.").max(255),
  expense_date: z.string().datetime().optional()
  // Fecha como string ISO 8601, opcional
});
const updateExpenseSchema = z.object({
  amount: z.string(),
  category_id: z.string(),
  description: z.string().min(1).max(255).optional(),
  expense_date: z.string().datetime().optional()
});
const registerExpense = async (req, res) => {
  try {
    const validationResult = createExpenseSchema.safeParse(req.body);
    if (!validationResult.success) {
      return res.status(400).json({ errors: validationResult.error.flatten().fieldErrors });
    }
    const { category_id, amount, description, expense_date } = validationResult.data;
    const user_id = req.user?.uid;
    if (!user_id) {
      return res.status(401).json({ message: "User not authenticated" });
    }
    const category = await CategoryModel.findById(category_id, user_id);
    if (!category) {
      return res.status(403).json({
        message: "La categor\xEDa no existe o no tienes permiso para usarla."
      });
    }
    const newExpense = await ExpensesModel.create({
      category_id,
      user_id,
      amount,
      description,
      expense_date: expense_date ? new Date(expense_date) : void 0
    });
    res.status(201).json(newExpense);
  } catch (error) {
    console.error("Error en registerExpense:", error);
    res.status(500).json({ message: "Error en el servidor al registrar el gasto." });
  }
};
const getAllExpenses = async (req, res) => {
  try {
    const user_id = req.user?.uid;
    const expenses = await ExpensesModel.find();
    if (!user_id) {
      return res.status(401).json({ message: "User not authenticated" });
    }
    const user = await UserModel.findById(user_id);
    if (!user?.role) {
      return res.status(403).json({
        message: "No existen gastos  o no tienes permiso para acceder a ellos."
      });
    }
    if (!expenses) {
      return res.status(404).json({ message: "Error al obtener todos los gastos." });
    }
    res.json(expenses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const getExpensesByUser = async (req, res) => {
  try {
    const user_id = req.user.uid;
    if (!user_id) {
      return res.status(401).json({ message: "User not authenticated" });
    }
    const expenses = await ExpensesModel.findByUser(user_id);
    res.json(expenses);
  } catch (error) {
    console.error("Error en getExpensesByUser:", error);
    res.status(500).json({ message: "Error al obtener los gastos." });
  }
};
const getExpenseById = async (req, res) => {
  try {
    const { id } = req.params;
    const user_id = req.user.uid;
    const expense = await ExpensesModel.findById(id, user_id);
    if (!expense) {
      return res.status(404).json({ message: "Expense not found" });
    }
    return res.json({ expense });
  } catch (error) {
    console.error("Error en getExpenseById:", error);
    res.status(500).json({ message: error.message });
  }
};
const updateExpense = async (req, res) => {
  try {
    const { id } = req.params;
    const user_id = req.user?.uid;
    if (!user_id) {
      return res.status(401).json({ message: "User not authenticated" });
    }
    const validationResult = updateExpenseSchema.safeParse(req.body);
    if (!validationResult.success) {
      return res.status(400).json({ errors: validationResult.error.flatten().fieldErrors });
    }
    const { amount, category_id, description, expense_date } = validationResult.data;
    const updatedExpense = await ExpensesModel.update({
      expense_id: id,
      user_id,
      // Para el WHERE
      amount,
      category_id,
      description,
      expense_date: expense_date ? new Date(expense_date) : void 0
    });
    if (!updatedExpense) {
      return res.status(404).json({
        message: "Gasto no encontrado o no tienes permiso para actualizarlo."
      });
    }
    res.json(updatedExpense);
  } catch (error) {
    console.error("Error at updateExpense:", error);
    return res.status(500).json({ message: "Error interno del servidor." });
  }
};
const deleteExpense = async (req, res) => {
  try {
    const { id } = req.params;
    const user_id = req.user?.uid;
    if (!user_id) {
      return res.status(401).json({ message: "User not authenticated" });
    }
    const deletedExpense = await ExpensesModel.remove(id, user_id);
    if (!deletedExpense) {
      return res.status(404).json({
        message: "Gasto no encontrado o no tienes permiso para borrarlo."
      });
    }
    res.json(deletedExpense);
  } catch (error) {
    console.error("Error en deleteExpense:", error);
    res.status(500).json({ message: "Error al borrar el gasto." });
  }
};
const ExpensesController = {
  registerExpense,
  getAllExpenses,
  getExpensesByUser,
  getExpenseById,
  updateExpense,
  deleteExpense
};

const router$4 = Router();
router$4.get(
  "/admin/expenses",
  validateToken,
  adminAuthMiddleware,
  ExpensesController.getAllExpenses
  // Este es el controlador que trae todo
);

const validateSchema = (schema) => (req, res, next) => {
  try {
    const result = schema.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({ errors: result.error.flatten().fieldErrors });
    }
    next();
  } catch (error2) {
    res.status(500).json({ errors: ["Internal server error"] });
  }
};

const generateTokens = (payload) => {
  const accessToken = jwt.sign(payload, ACCESS_TOKEN_SECRET, {
    expiresIn: "15m"
  });
  const refreshToken = jwt.sign(payload, REFRESH_TOKEN_SECRET, {
    expiresIn: "7d"
  });
  return { accessToken, refreshToken };
};

const add = async (token) => {
  const query = {
    text: `
    INSERT INTO REVOKED_TOKENS (token)
    VALUES($1)
    RETURNING *
    `,
    values: [token]
  };
  const { rows } = await pool.query(query);
  return rows[0];
};
const find = async (token) => {
  const query = {
    text: `
            SELECT * FROM REVOKED_TOKENS
            WHERE token = $1
        `,
    values: [token]
  };
  const { rows } = await pool.query(query);
  return rows[0];
};
const TokenBlackListModel = {
  add,
  find
};

const register = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const password_hash = await bcrypt.hash(password, 12);
    const user = await UserModel.findByEmailForAuth(email);
    if (user) {
      return res.status(400).json({ emailInUse: ["El correo electr\xF3nico esta en uso."] });
    }
    const newUser = await UserModel.create({ username, email, password_hash });
    const { accessToken, refreshToken } = generateTokens({
      uid: newUser.user_id
    });
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1e3
    });
    const registeredUser = {
      username: newUser.username,
      email: newUser.email,
      role: newUser.role,
      user_id: newUser.user_id
    };
    res.status(201).json({ user: registeredUser, accessToken });
  } catch (error) {
    console.error("Error en el registro de usuario:", error);
    res.status(500).json({ message: ["Error interno del servidor."] });
  }
};
const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const userFound = await UserModel.findByEmailForAuth(email);
    if (!userFound) {
      return res.status(400).json({ message: ["Invalid credentials"] });
    }
    const checkPassword = await bcrypt.compare(
      password,
      userFound.password_hash
    );
    if (!checkPassword) {
      return res.status(400).json({ message: ["Invalid credentials"] });
    }
    const { accessToken, refreshToken } = generateTokens({
      uid: userFound.user_id
    });
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1e3
    });
    const userLogged = {
      username: userFound.username,
      email: userFound.email,
      role: userFound.role
    };
    res.json({ user: userLogged, accessToken });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const getUser = async (req, res) => {
  try {
    const { uid } = req.params;
    const userFound = await UserModel.findById(uid);
    if (!userFound) {
      res.status(404).json({ message: [] });
      return;
    }
    res.json(userFound);
  } catch (error) {
    res.status(500).json({ message: [error.message] });
  }
};
const logout = async (req, res) => {
  try {
    const { refreshToken } = req.cookies;
    if (refreshToken) {
      await TokenBlackListModel.add(refreshToken);
    }
    res.clearCookie("refreshToken");
    res.status(200).json("User logged out succesfully");
  } catch (error) {
    console.error("Error en el logout:", error);
    res.status(500).json({ message: "Error interno del servidor." });
  }
};
const refreshTokenController = async (req, res) => {
  try {
    const { refreshToken } = req.cookies;
    if (!refreshToken) {
      return res.status(401).json({
        message: "Acceso denegado. No se provey\xF3 un token de refresco."
      });
    }
    const isRevoked = await TokenBlackListModel.find(refreshToken);
    if (isRevoked) {
      return res.status(403).json({ message: "Token inv\xE1lido o sesi\xF3n cerrada." });
    }
    if (!REFRESH_TOKEN_SECRET) ;
    const decodedPayload = jwt.verify(
      refreshToken,
      REFRESH_TOKEN_SECRET
    );
    const user = await UserModel.findById(decodedPayload.uid);
    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado." });
    }
    if (!ACCESS_TOKEN_SECRET) ;
    const newAccessToken = jwt.sign(
      { uid: decodedPayload.uid },
      // Usamos el uid del token verificado
      ACCESS_TOKEN_SECRET,
      { expiresIn: "15m" }
      // Nueva vida de 15 minutos
    );
    res.json({ user, accessToken: newAccessToken });
  } catch (error) {
    console.error("Error al refrescar el token:", error);
    return res.status(403).json({ message: "Token de refresco inv\xE1lido o expirado." });
  }
};
const UserController = {
  register,
  login,
  getUser,
  logout,
  refreshTokenController
};

const registerSchema = z.object({
  // Validación para el nombre de usuario (username)
  username: z.string("El nombre de usuario es requerido.").min(4, "El nombre de usuario debe tener al menos 6 caracteres.").max(50, "El nombre de usuario no puede exceder los 50 caracteres.").trim(),
  // Elimina espacios en blanco al inicio y al final
  // Validación para el correo electrónico (email)
  email: z.string("El correo electr\xF3nico es requerido.").email("Por favor, introduce un correo electr\xF3nico v\xE1lido.").trim().toLowerCase(),
  // Convierte el email a minúsculas para consistencia
  // Validación para la contraseña (password)
  password: z.string().min(8, "La contrase\xF1a debe tener al menos 8 caracteres.").regex(
    /^(?=.*[a-zñ])(?=.*[A-ZÑ])(?=.*\d)(?=.*[@$!%*?&\-_])[A-Za-zñÑ\d@$!%*?&\-_]{8,}$/,
    "La contrase\xF1a debe contener al menos una may\xFAscula, una min\xFAscula, un n\xFAmero y un car\xE1cter especial (ej: @, $, _, -)."
  )
});
const loginSchema = z.object({
  // Validación para el correo electrónico (email)
  email: z.string("El correo electr\xF3nico es requerido.").email("Por favor, introduce un correo electr\xF3nico v\xE1lido.").trim().toLowerCase(),
  // Convierte el email a minúsculas para consistencia
  // Validación para la contraseña (password)
  password: z.string().min(8, "La contrase\xF1a debe tener al menos 8 caracteres.").regex(
    /^(?=.*[a-zñ])(?=.*[A-ZÑ])(?=.*\d)(?=.*[@$!%*?&\-_])[A-Za-zñÑ\d@$!%*?&\-_]{8,}$/,
    "La contrase\xF1a debe contener al menos una may\xFAscula, una min\xFAscula, un n\xFAmero y un car\xE1cter especial (ej: @, $, _, -)."
  )
});

const router$3 = Router();
router$3.post(
  "/register",
  validateSchema(registerSchema),
  UserController.register
);
router$3.post(
  "/login",
  validateSchema(loginSchema),
  UserController.login
);
router$3.get("/user/:uid", validateToken, UserController.getUser);
router$3.post("/logout", UserController.logout);
router$3.post("/refresh-token", UserController.refreshTokenController);

const router$2 = Router();
router$2.post("/", validateToken, ExpensesController.registerExpense);
router$2.get("/", validateToken, ExpensesController.getExpensesByUser);
router$2.get("/:id", validateToken, ExpensesController.getExpenseById);
router$2.put("/:id", validateToken, ExpensesController.updateExpense);
router$2.delete("/:id", validateToken, ExpensesController.deleteExpense);

const categorySchema = z.object({
  category_name: z.string("El nombre de la categor\xEDa es requerido.").min(1, "El nombre no puede estar vac\xEDo.").max(100, "El nombre no puede exceder los 100 caracteres.").trim()
});
const createCategory = async (req, res) => {
  try {
    const validationResult = categorySchema.safeParse(req.body);
    if (!validationResult.success) {
      return res.status(400).json({ errors: validationResult.error.flatten().fieldErrors });
    }
    const { category_name } = validationResult.data;
    const user_id = req.user.uid;
    const newCategory = await CategoryModel.create({
      category_name,
      user_id
    });
    res.status(201).json(newCategory);
  } catch (error) {
    if (error.code === "23505") {
      return res.status(409).json({ message: "Ya tienes una categor\xEDa con ese nombre." });
    }
    console.error("Error en createCategory:", error);
    res.status(500).json({ message: "Error en el servidor al crear la categor\xEDa." });
  }
};
const getCategoriesByUser = async (req, res) => {
  try {
    const user_id = req.user.uid;
    const categories = await CategoryModel.findByUser(user_id);
    res.json(categories);
  } catch (error) {
    console.error("Error en getCategoriesByUser:", error);
    res.status(500).json({ message: "Error al obtener las categor\xEDas." });
  }
};
const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const user_id = req.user.uid;
    const validationResult = categorySchema.safeParse(req.body);
    if (!validationResult.success) {
      return res.status(400).json({ errors: validationResult.error.flatten().fieldErrors });
    }
    const { category_name } = validationResult.data;
    console.log(category_name);
    const updatedCategory = await CategoryModel.update({
      category_id: id,
      user_id,
      category_name
    });
    if (!updatedCategory) {
      return res.status(404).json({
        message: "Categor\xEDa no encontrada o no tienes permiso para actualizarla."
      });
    }
    res.json(updatedCategory);
  } catch (error) {
    if (error.code === "23505") {
      return res.status(409).json({ message: "Ya tienes otra categor\xEDa con ese nombre." });
    }
    console.error("Error en updateCategory:", error);
    res.status(500).json({ message: "Error al actualizar la categor\xEDa." });
  }
};
const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const user_id = req.user.uid;
    const deletedCategory = await CategoryModel.remove(id, user_id);
    if (!deletedCategory) {
      return res.status(404).json({
        message: "Categor\xEDa no encontrada o no tienes permiso para borrarla."
      });
    }
    res.json(deletedCategory);
  } catch (error) {
    if (error.code === "23503") {
      return res.status(409).json({
        message: "No se puede borrar la categor\xEDa porque tiene gastos asociados."
      });
    }
    console.error("Error en deleteCategory:", error);
    res.status(500).json({ message: "Error al eliminar la categor\xEDa." });
  }
};
const CategoryController = {
  createCategory,
  getCategoriesByUser,
  updateCategory,
  deleteCategory
};

const router$1 = Router();
router$1.post("/", validateToken, CategoryController.createCategory);
router$1.get(
  "/",
  validateToken,
  CategoryController.getCategoriesByUser
);
router$1.put(
  "/:id",
  validateToken,
  CategoryController.updateCategory
);
router$1.delete(
  "/:id",
  validateToken,
  CategoryController.deleteCategory
);

const budgetSchema = z.object({
  amount: z.number().positive("Debe ser un n\xFAmero positivo.").min(1, "Monto minimo es 1."),
  period: z.string().optional()
});

const createBudget = async (user_id, category_id, amount, month, year) => {
  const query = {
    text: `
    INSERT INTO BUDGETS(user_id, category_id,amount,month,year)
    VALUES(
    $1,
    $2,
    $3,
    COALESCE($4, EXTRACT(MONTH FROM NOW())),
    COALESCE($5, EXTRACT(YEAR FROM NOW()))
  )
    RETURNING *
    `,
    values: [user_id, category_id, amount, month, year]
  };
  const { rows } = await pool.query(query);
  return rows[0];
};
const findByUserAndMonth = async (user_id, month, year) => {
  const query = {
    text: `
  SELECT * FROM BUDGETS WHERE user_id = $1 AND month = $2 AND year = $3
  `,
    values: [user_id, month, year]
  };
  const { rows } = await pool.query(query);
  return rows[0];
};
const updateBudget = async (amount, month, year, budget_id) => {
  const query = {
    text: `
    UPDATE BUDGETS
    SET amount = $1, month = $2 , year = $3
    WHERE budget_id = $4
    RETURNING *
    `,
    values: [amount, month, year, budget_id]
  };
  const { rows } = await pool.query(query);
  return rows[0];
};
const deleteBudget = async (user_id) => {
  const query = {
    text: `
    DELETE FROM BUDGET
    WHERE user_id = $1
    RETURNING *
    `,
    values: [user_id]
  };
  const { rows } = await pool.query(query);
  return rows[0];
};
const BudgetModel = {
  createBudget,
  findByUserAndMonth,
  updateBudget,
  deleteBudget
};

const setBudget = async (req, res) => {
  try {
    const user_id = req.user.uid;
    const { amount, category_id, month, year } = req.body;
    if (!user_id) {
      return res.status(401).json({ message: "User not authenticated" });
    }
    const newBudget = await BudgetModel.createBudget(
      user_id,
      category_id,
      amount,
      month,
      year
    );
    return res.status(200).json(newBudget);
  } catch (error) {
    console.error("Error setting budget:", error);
    if (error.code === "23505") {
      return res.status(409).json({
        message: "Ya existe un presupuesto para esa categor\xEDa en este per\xEDodo."
      });
    }
    return res.status(500).json({ message: "Error interno del servidor." });
  }
};
const getBudget = async (req, res) => {
  try {
    const userId = req.user.uid;
    let { month, year } = req.query;
    if (!userId) {
      return res.status(401).json({ message: "Usuario no autenticado." });
    }
    const budget = await BudgetModel.findByUserAndMonth(userId, month, year);
    if (!budget) {
      return res.status(404).json({ message: "Presupuesto no encontrado." });
    }
    return res.status(200).json(budget);
  } catch (error) {
    console.error("Error getting budget:", error);
    return res.status(500).json({ message: "Error interno del servidor." });
  }
};
const budgetController = {
  setBudget,
  getBudget
};

const router = Router();
router.post(
  "/",
  validateToken,
  validateSchema(budgetSchema),
  budgetController.setBudget
);
router.get("/", validateToken, budgetController.getBudget);

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true
};
app.use(cors(corsOptions));
app.use("/api/admin", router$4);
app.use("/api/auth", router$3);
app.use("/api/expenses", router$2);
app.use("/api/categories", router$1);
app.use("/api/budgets", router);
const startServer = async () => {
  await checkDbConnection();
  app.listen(PORT, () => {
    console.info(`\u{1F680} Server is running on port ${PORT}`);
  });
};
startServer();
