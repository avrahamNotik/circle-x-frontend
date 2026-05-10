import { Dayjs } from "dayjs";
import { z } from "zod";

export const signUpSchema = z
  .object({
    firstName: z.string().min(2, "First name too short"),
    lastName: z.string().min(2, "Last name too short"),
    password: z.string().min(8, "Password must include at least 8 chars"),
    confirmPassword: z.string(),
    email: z.email("Email is not correct"),
    birthDay: z.custom<Dayjs>(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    error: "The passwords do not mach",
    path: ["confirmPassword"],
  });

export type SignUpFormType = z.infer<typeof signUpSchema>;
