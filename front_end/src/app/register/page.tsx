
'use client'
import { useActionState } from "react";
import{userRegister} from './actions';


const intialState = {message :'',};


export default function RegisterPage() {


const [state, formAction, peding ] = useActionState(userRegister,intialState);


let messageClass = "text-center  text-green-500";
 if(state.message.indexOf('*')>-1)
   messageClass = "text-center  text-red-500";


  return (
     <div className="container mx-auto w-xs px-4 py-8 ">
  <div className="w-full max-w-xs">
         <form
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        action={formAction}
      >
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Name
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            name="username"
            type="text"
            placeholder="Username"
            required
          />
        </div>
         <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            e-mail
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            name="useremail"
            type="text"
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
          <p className="text-red-500 text-xs italic">
            Please choose a password.
          </p>
        </div>
         <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Password Confirmation
          </label>
          <input
            className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            name="passwordconf"
            type="password"
            placeholder="******"
            required
          />
          <p className="text-red-500 text-xs italic">
            
          </p>
        </div>
        <div className="flex items-center justify-center">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            disabled={peding}
          >
            Register
          </button>
         
          
        </div>
         <p className={messageClass} > {state?.message} </p>
      </form>
      </div>
 </div>
  );
}
