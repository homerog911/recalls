// pages/index.tsx
"use client";
import { useState, useEffect, useActionState } from "react";
import FilterBar from "../app/components/FilterBar";
import RegisterPage from "./register/page";
import { userAuthenticacion } from "./actions";
import Loader from "./components/Loader";





 const intialState = {message :'',};


export default function Home() {




  const [ logged, setLogged]= useState(false);

  const [state, formAction, peding ] = useActionState(userAuthenticacion,intialState);

 const messageClass = "text-center  text-red-500";
 console.log(`Logged ${logged} `);
 if(state.message.indexOf('*')==-1 && state.message.length > 0 && !logged ){
  state.message = '';
   setLogged(true);
  }

  //  getProps(categories,token).then((prop)=>{console.log(prop)});


  if (peding) {
    return (
      <Loader></Loader>
    );
  }

  if(logged) {

  return (
  
          
            <FilterBar loading={peding} logged={logged} setLogged={setLogged} />

  );
}else{
   return (
     <div className="container mx-auto w-xs px-4 py-8 ">
 
         <form action={formAction}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
      >
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            email
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            name="useremail"
            type="email"
            placeholder="useremail"
            required
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Password
          </label>
          <input
            className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            name="password"
            type="password"
            placeholder="******"
            required
          />
         
        </div>
         <div className="flex items-center justify-center">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            disabled={peding}
          >
            Sign In
          </button>
           </div>
         <p className={messageClass} > {state?.message} </p>
         
       
      </form>
      </div>
     
   );

}
}
