"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.budgetSchema = void 0;
const zod_1 = require("zod");
exports.budgetSchema = zod_1.z.object({
    amount: zod_1.z
        .number()
        .positive("Debe ser un número positivo.")
        .min(1, "Monto minimo es 1."),
    period: zod_1.z.string().optional(),
});
