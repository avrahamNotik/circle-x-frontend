import { Dayjs } from "dayjs";
import type { HTMLInputTypeAttribute } from "react";
import type { FieldValues } from "react-hook-form";
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

interface FormField<T extends FieldValues> {
  label: string;
  name: Extract<keyof T, string>;
  type: HTMLInputTypeAttribute;
  requierd: boolean;
}

export const signUpField: FormField<SignUpFormType>[] = [
  { label: "first name", name: "firstName", type: "text", requierd: true },
  { label: "last name", name: "lastName", type: "text", requierd: true },
  { label: "email", name: "email", type: "email", requierd: true },
  { label: "birth day", name: "birthDay", type: "date", requierd: false },
  {
    label: "password",
    name: "password",
    type: "password",
    requierd: true,
  },
  {
    label: "confirm password",
    name: "confirmPassword",
    type: "password",
    requierd: true,
  },
] as const;

export const signInSchema = z.object({
  email: z.email("Email is not correct"),
  password: z.string().min(8, "Password must include at least 8 chars"),
});

export type SignInFormType = z.infer<typeof signInSchema>;

export const signInField: FormField<SignInFormType>[] = [
  {
    label: "email",
    name: "email",
    requierd: true,
    type: "email",
  },
  {
    label: "password",
    name: "password",
    requierd: true,
    type: "password",
  },
];
