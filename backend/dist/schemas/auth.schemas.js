"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginSchema = exports.registerSchema = void 0;
const zod_1 = require("zod");
exports.registerSchema = zod_1.z.object({
    // Validación para el nombre de usuario (username)
    username: zod_1.z
        .string("El nombre de usuario es requerido.")
        .min(4, "El nombre de usuario debe tener al menos 6 caracteres.")
        .max(50, "El nombre de usuario no puede exceder los 50 caracteres.")
        .trim(), // Elimina espacios en blanco al inicio y al final
    // Validación para el correo electrónico (email)
    email: zod_1.z
        .string("El correo electrónico es requerido.")
        .email("Por favor, introduce un correo electrónico válido.")
        .trim()
        .toLowerCase(), // Convierte el email a minúsculas para consistencia
    // Validación para la contraseña (password)
    password: zod_1.z
        .string()
        .min(8, "La contraseña debe tener al menos 8 caracteres.")
        // Expresión regular para forzar una contraseña segura:
        // - Al menos una letra mayúscula (A-Z, Ñ)
        // - Al menos una letra minúscula (a-z, ñ)
        // - Al menos un número (0-9)
        // - Al menos un carácter especial (incluyendo @, $, _, -)
        .regex(/^(?=.*[a-zñ])(?=.*[A-ZÑ])(?=.*\d)(?=.*[@$!%*?&\-_])[A-Za-zñÑ\d@$!%*?&\-_]{8,}$/, "La contraseña debe contener al menos una mayúscula, una minúscula, un número y un carácter especial (ej: @, $, _, -)."),
});
exports.loginSchema = zod_1.z.object({
    // Validación para el correo electrónico (email)
    email: zod_1.z
        .string("El correo electrónico es requerido.")
        .email("Por favor, introduce un correo electrónico válido.")
        .trim()
        .toLowerCase(), // Convierte el email a minúsculas para consistencia
    // Validación para la contraseña (password)
    password: zod_1.z
        .string()
        .min(8, "La contraseña debe tener al menos 8 caracteres.")
        // Expresión regular para forzar una contraseña segura:
        // - Al menos una letra mayúscula (A-Z, Ñ)
        // - Al menos una letra minúscula (a-z, ñ)
        // - Al menos un número (0-9)
        // - Al menos un carácter especial (incluyendo @, $, _, -)
        .regex(/^(?=.*[a-zñ])(?=.*[A-ZÑ])(?=.*\d)(?=.*[@$!%*?&\-_])[A-Za-zñÑ\d@$!%*?&\-_]{8,}$/, "La contraseña debe contener al menos una mayúscula, una minúscula, un número y un carácter especial (ej: @, $, _, -)."),
});
