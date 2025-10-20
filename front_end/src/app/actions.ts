"use server";


import { autentication } from "./lib/auth";

export async function userAuthenticacion(
  initialState: any,
  formData: FormData
) {
  const rawFormData = {
    useremail : formData.get("useremail")||'',
    password: formData.get("password")||'',
  };

  const userResp = await autentication(
    rawFormData.useremail.toString() ,
    rawFormData.password.toString()
  );
  
  console.log(` respuesta autenticacion ${userResp}`);
  if (!userResp) {
    return {
      message: `* User or password you’ve entered is incorrect  `,
    };
  } else {
    return {
      message: `${userResp}`,
    };
  }

  // mutate data
  // revalidate the cache
  //  revalidatePath('/register');
}
