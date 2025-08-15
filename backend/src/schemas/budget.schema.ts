import { z } from "zod";
import ca from "zod/v4/locales/ca.cjs";

export const budgetSchema = z.object({
  amount: z
    .number()
    .positive("Debe ser un número positivo.")
    .min(1, "Monto minimo es 1."),
  period: z.string().optional(),
  category_id: z.string().optional(),
});

