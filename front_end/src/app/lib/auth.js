"use server";
import axios from "axios";

let localToken = "";
let username = "";

export async function registerUserApi(username, email,password) {
 
    try {

    const resultAuth = await axios.post(
      `${process.env.API_URI}auth/register${getByPass()}`,
      {
        username:username,
        email: email,
        password: password,
      }
    );
    console.log(resultAuth);

    if(resultAuth.status === 201){
      const ans = await resultAuth.data;
      return ans;
    }
   
    } catch (error) {
     
         console.error(error); 
        
     
         if(error.status === 400){
             console.error('-------------'); 
          const ans = await error.response.data.message;
          return ans;
        }

        if (error.status === 429) {
        console.error('Too many requests. Retrying...');
           const ans = 'Busy Server Try later';
          return ans;
        }
      
        
    }   


}


export async function autentication(email = "", password = "") {
  if (localToken == "") {
    try {

    const resultAuth = await axios.post(
      `${process.env.API_URI}auth/login${getByPass()}`,
      {
        email: email,
        password: password,
      }
    );
    console.error('------auth-------'); 
    localToken = await resultAuth.data.token;
    username = await resultAuth.data.user.username;
    console.log(resultAuth.data.user);
      console.log(username);
    utilBase64();

    } catch (error) {
        if(error.status === 400){
             
          const ans = await error.response.data.message;
          return ans;
        }
        if (error.status === 429) {
        console.error('Too many requests. Retrying...');
        } else {
        console.error(error); 
        }
    }   

  }

  return localToken;
}

export async function getCategories() {
  try {
    const localToken = await autentication();

    const resultCat = await axios.get(
      `${process.env.API_URI}category/categories/${getByPass()}`,
      {
        headers: {
          Authorization: `Bearer ${localToken}`,
        },
      }
    );
  
    const dataCat = await resultCat.data.data;
    return dataCat;
    

  } catch (error) {
     console.error("Failed to fetch data: catalog", error);
       if (error.status === 401) {
              console.error("Failed security find cat : toke ", localToken);
    }
     if (error.status === 429) {
              console.error("Failed network  status in cat  : 429");
              return null;
    }
    return [];
  }
}

export async function gethManufacturers() {
  try {
      const localToken = await autentication();
    const resultMan = await axios.get(
      `${process.env.API_URI}manufacturer/${getByPass()}`,
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
     if (error.status === 401) {
              console.error("Failed security find man : toke ", localToken);
    }
     if (error.status === 429) {
              console.error("Failed network  status in man  : 429");
              return null;
    }

    return [];
  }
}


export async function gethModelsVehicles(manufacturer, year) {
  try {
      const localToken = await autentication();
    const resultMan = await axios.get(
      `${process.env.API_URI}model/manufacturer/${manufacturer}/modelyear/${year}/${getByPass()}`,
      {
        headers: {
          Authorization: `Bearer ${localToken}`,
        },
      }
    );


    const data = await resultMan.data.data;
    return data;
  } catch (error) {
    console.error("Failed to fetch data: getModelVehicles", error);
    
     if (error.status === 401) {
              console.error("Failed security find man : toke ", localToken);
    }
     if (error.status === 429) {
              console.error("Failed network  status in man  : 429");
    }
    return [];
  }
}

export async function getRecalls(filtersStr) {
   try {
  const localToken = await autentication();
  console.log('Llamando el servicio');
  const response = await axios.get(
    `${process.env.API_URI}recall/manufacturer/${filtersStr}${getByPass()}`,
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
    } catch (error) {
    console.error("Failed to fetch data: get Recall", error);
    
     if (error.status === 401) {
              console.error("Failed security find recall : toke ", localToken);
    }
     if (error.status === 429) {
              console.error("Failed network  status in recall  : 429");
              return null;
    }
    return [];
  }
}

export async function getUser(){
  return username;
}

function utilBase64(encoded){
  console.log(`Encoded ${encoded}`)
  const decodedString = atob(encoded);
  return decodedString;
}

function getByPass(){
  let ans = "";

  try{
     ans = process.env.PROTECCION_BY_PASS;
      console.log(`Encoded ${process.env.PASS_ENCODED}`)
     if(process.env.PROTECCION_BY_PASS >= ""){
      ans = `?${process.env.PROTECCION_BY_PASS}=${utilBase64(process.env.PASS_ENCODED)}`
     }

  }catch(error){
    console.error(error);

  }
  return ans;
}