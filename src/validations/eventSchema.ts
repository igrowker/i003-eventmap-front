//terminar
import { z } from "zod";

const eventSchema = z.object({
  name: z
    .string()
    .min(3, { message: "Nombre debe tener al menos 3 caracteres." })
    .max(30, { message: "No puede ser de mas de 50 caracteres." }),

    address: z
    .string()
    .min(0, { message: "La dirección no puede" })
    .max(30, { message: "No puede ser de mas de 50 caracteres." }),
});
