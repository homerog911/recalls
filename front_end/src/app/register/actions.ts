"use server";

import { z } from "zod";
import { registerUserApi } from "../lib/auth";

const passwordSchema = z
  .string()
  .min(8, { message: "* Password must be at least 8 characters long" })
  .regex(/[a-z]/, {
    message: "* Password must contain at least one lowercase letter",
  })
  .regex(/[A-Z]/, {
    message: "* Password must contain at least one uppercase letter",
  })
  .regex(/\d/, { message: "* Password must contain at least one number" })
  .regex(/[!@#$%^&*(),.?":{}|<>]/, {
    message: "* Password must contain at least one special character",
  });

const registrationSchema = z
  .object({
    email: z.email({ message: "*Invalid email address" }),
    password: passwordSchema,
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"], // Associate the error with the confirmPassword field
  });

export async function userRegister(initialState: any, formData: FormData) {
  const rawFormData = {
    username: formData.get("username"),
    useremail: formData.get("useremail"),
    password: formData.get("password"),
    confirmPassword: formData.get("passwordconf"),
  };

  console.log(rawFormData);

  const validateFields = registrationSchema.safeParse({
    email: rawFormData.useremail,
    password: rawFormData.password,
    confirmPassword: rawFormData.confirmPassword,
  });

  if (!validateFields.success) {
    let messageValitaion = "";
    messageValitaion += validateFields.error.flatten().fieldErrors.email
      ? validateFields.error.flatten().fieldErrors.email
      : "";
    messageValitaion += validateFields.error.flatten().fieldErrors.password
      ? validateFields.error.flatten().fieldErrors.password
      : "";
    messageValitaion += validateFields.error.flatten().fieldErrors
      .confirmPassword
      ? validateFields.error.flatten().fieldErrors.confirmPassword
      : "";

    return {
      message: messageValitaion,
    };
  } else {
    const userResp = await registerUserApi(
      rawFormData.username,
      rawFormData.useremail,
      rawFormData.password
    );
     console.log(userResp);
    if (!userResp) {
     
      return {
          message: `${userResp}`,
      }
    } else {
      return {
         message: `${rawFormData.useremail}  has been registred`,
      };

    }
  }

  // mutate data
  // revalidate the cache
  //  revalidatePath('/register');
}
