"use server";
import axios from "axios";

let localToken = "";

export async function autentication() {
  if (localToken == "") {
    const resultAuth = await axios.post(
      `${process.env.API_URI}auth/login?${process.env.X_VERCEL_PROTECCION_BY_PASS}`,
      {
        username: `${process.env.USR_PORTAL}`,
        password: `${process.env.PASS_USR_PORTAL}`,
      }
    );
     if (resultAuth.status === 200) {
    localToken = await resultAuth.data.token;

    console.log(`NEW TOKEEEN : ${localToken} `);
    } else {
            console.error(`Unexpected status in auth code: ${response.status}`);
        }
  }

  return localToken;
}

export async function getCategories() {
  try {
    const localToken = await autentication();

    const resultCat = await axios.get(
      `${process.env.API_URI}category/categories/?x-vercel-protection-bypass=${process.env.X_VERCEL_PROTECCION_BY_PASS}`,
      {
        headers: {
          Authorization: `Bearer ${localToken}`,
        },
      }
    );
    if (resultCat.status === 401) {
              console.error("Failed security find cat : toke ", localToken);
    }
    const dataCat = await resultCat.data.data;
    return dataCat;
    

  } catch (error) {
  v
    return [];
  }
}

export async function gethManufacturers() {
  try {
      const localToken = await autentication();
    const resultMan = await axios.get(
      `${process.env.API_URI}manufacturer/?x-vercel-protection-bypass=${process.env.X_VERCEL_PROTECCION_BY_PASS}`,
      {
        headers: {
          Authorization: `Bearer ${localToken}`,
        },
      }
    );
    const data = await resultMan.data.data;
    return data;
  } catch (error) {
    console.error("Failed to fetch data: manufacturesrs", error);
    return [];
  }
}

export async function getRecalls(filtersStr) {
  const localToken = await autentication();
  console.log('Llamando el servicio');
  const response = await axios.get(
    `${process.env.API_URI}recall/manufacturer/${filtersStr}?x-vercel-protection-bypass=${process.env.X_VERCEL_PROTECCION_BY_PASS}`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localToken}`,
      },
    }
  );

  const data = await response.data.data;
  console.log(`respuesta del servicio ${data}`);
  return data;
}
