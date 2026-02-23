import { z } from "zod";

const loginSchema = z.object({
  email: z.email("Invalid email"),
  password: z.string(),
});

export const signUpSchema = loginSchema
  .extend({
    password: z
      .string()
      .min(6, { message: "Password must be at least 6 characters long" })
      .max(32, { message: "Password cannot be longer than 32 characters" })
      .refine((password) => /[A-Za-z]/.test(password), {
        message:
          "Field must contain at least one uppercase and one lowercase letter",
      })
      .refine((password) => /[0-9]/.test(password), {
        message: "Field must contain at least one number",
      })
      .refine((password) => /[!@#$%^&*]/.test(password), {
        message: "Field must contain at least one special character(!@#$%^&*)",
      }),
    confirmPassword: z.string(),
    userName: z.string(),
  })
  .superRefine((data, ctx) => {
    if (data.password !== data.confirmPassword) {
      ctx.addIssue({
        path: ["confirmPassword"],
        message: "Passwords don't match",
      });
    }
  });

export const createPostSchema = z.object({
  title: z
    .string()
    .min(3, "Title must be at least 3 characters long"),
  body: z
    .string()
    .min(10, "Body must be at least 10 characters long"),
  tags: z.array(z.string()).optional(),
});




export const loginFormFields = {
  email: {
    label: "Email",
    htmlFor: "email",
    type: "email",
    name: "email",
  },
  password: {
    label: "Password",
    htmlFor: "password",
    type: "password",
    name: "password",
  },
  schema: loginSchema,
};

export const signUpFormFields = {
  email: loginFormFields.email,
  password: loginFormFields.password,
  confirmPassword: {
    label: "Confirm password",
    htmlFor: "confirm-password",
    type: "password",
    name: "confirmPassword",
  },
  userName: {
    label: "User Name",
    htmlFor: "user-name",
    type: "text",
    name: "userName",
    rows: 1,
  },
  schema: signUpSchema,
};
