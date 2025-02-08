import { z } from "zod";

export const registerSchema = z.object({
  name: z.string().min(3, {
    message: "Name must be at least 3 characters.",
  }),
  email: z.string().email("Invalid email"),
  phone: z
    .string()
    .regex(/^\+?[0-9]\d{9,14}$/, "Invalid phone number")
    .optional(),
  role: z.enum(["Developer", "Designer", "Manager"], {
    errorMap: () => ({ message: "Please select a valid Role" }),
  }),
  joiningDate: z
    .string()
    .refine(
      (val) =>
        new Date([...new Date(val).toDateString()].join("")) <=
        new Date([...new Date().toDateString()].join("")),
      "Date must be in the past or today"
    ),
});

export type TregisterSchema = z.infer<typeof registerSchema>;
