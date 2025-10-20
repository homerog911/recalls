
import Link from 'next/link';

import Image from 'next/image';


export const Navbar =async () => {


  return (
    <nav className="bg-gray-100 bg-opacity-30 p-5 shadow-md ">
      <div className='max-w-fit '>
        <Link className='mr-2' href='/' >
         <Image src="/logo_myrecall.png"  alt="My recall Logo" width={100} 
        height={100}></Image>
        </Link>
        </div>
         
<div className="mb-px flex justify-end items-end ">
  
<div className='max-w-fit'>
     
          <Link className='no-underline text-teal-dark border-b-2 border-teal-dark uppercase tracking-wide font-bold text-xs py-3 mr-8' href='/about' >About</Link>

     
          <Link className='mr-no-underline text-teal-dark border-b-2 border-teal-dark uppercase tracking-wide font-bold text-xs py-3 mr-8' href='/register' >Register</Link>
</div>
        </div>
    </nav>
    
  )
}
