import Image from "next/image";


export default function AboutPage() {
    return (
        <div className="bg-white p-10">
            <div className="text-center "><span className = "text-7xl"> About My recalls </span></div>
        
        <p className="p-4 m-10">This app allows you to check safety  or technical recall   issued by manufacturers to inform owners of issues that may affect occupant safety or the performance of the device. <br />
        <br />
       
         </p>
        <div className="flex justify-center ">
        
        <div className="w-1/2">  <Image src="/safe_car.jpg"  alt="Safety vehicules" width={400} 
                height={400}></Image>
        </div>
         
          <Image src="/safe_laptop.jpg"  alt="Safety Laptop" width={400} 
                height={400}></Image>
       
       </div>
        
        </div>
    )
}