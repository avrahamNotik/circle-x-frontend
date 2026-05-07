import { z } from 'zod'

export const signUpSchema = z.object({
 firstName: z.string().min(2),
 lastName: z.string().min(2),
 password: z.string().min(8, 'Password Must includes at least 8 chars'),
 confirmPassword: z.string(),
 email: z.email('Email Is not correct'),
 birthDay: z.date()
}).refine((data) => data.password !== data.confirmPassword, {
 error: 'The passwords do not mach',
 path: ['confirmPassword']
})

export type SignUpFormType = z.infer<typeof signUpSchema>