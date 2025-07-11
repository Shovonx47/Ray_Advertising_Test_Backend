import { z } from 'zod';
export const createUserSchema = z.object({
  name: z.string()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name must not exceed 100 characters')
    .trim(),
  
  phone: z.string()
    .regex(/^[0-9+\-\s()]{10,15}$/, 'Invalid phone number format')
    .trim(),
  
  email: z.string()
    .email('Invalid email format')
    .max(255, 'Email must not exceed 255 characters')
    .toLowerCase()
    .trim(),
  
  address: z.string()
    .min(10, 'Address must be at least 10 characters')
    .max(500, 'Address must not exceed 500 characters')
    .trim(),
  
  city: z.string()
    .min(2, 'City must be at least 2 characters')
    .max(100, 'City must not exceed 100 characters')
    .trim(),
  
  employer: z.string()
    .min(2, 'Employer must be at least 2 characters')
    .max(100, 'Employer must not exceed 100 characters')
    .trim(),
});
export const updateUserSchema = createUserSchema.partial();


export type CreateUserInput = z.infer<typeof createUserSchema>;
export type UpdateUserInput = z.infer<typeof updateUserSchema>;


export const validateCreateUser = (data: unknown) => {
  return createUserSchema.safeParse(data);
};

export const validateUpdateUser = (data: unknown) => {
  return updateUserSchema.safeParse(data);
};


export const createUserSchemaStrict = z.object({
  name: z.string()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name must not exceed 100 characters')
    .trim(),
  
  phone: z.string()
    .regex(/^\+?[1-9]\d{1,14}$/, 'Phone must be in valid international format')
    .trim(),
  
  email: z.string()
    .email('Invalid email format')
    .max(255, 'Email must not exceed 255 characters')
    .toLowerCase()
    .trim(),
  
  address: z.string()
    .min(10, 'Address must be at least 10 characters')
    .max(500, 'Address must not exceed 500 characters')
    .trim(),
  
  city: z.string()
    .min(2, 'City must be at least 2 characters')
    .max(100, 'City must not exceed 100 characters')
    .trim(),
  
  employer: z.string()
    .min(2, 'Employer must be at least 2 characters')
    .max(100, 'Employer must not exceed 100 characters')
    .trim(),
});

export const updateUserSchemaStrict = createUserSchemaStrict.partial();