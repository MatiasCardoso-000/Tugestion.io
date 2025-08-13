import { z } from "zod";
export var budgetSchema = z.object({
    amount: z
        .number()
        .positive("Debe ser un número positivo.")
        .min(1, "Monto minimo es 1."),
    period: z.string().optional(),
});
