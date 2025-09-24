// pages/index.tsx
'use client'
import { useState, useEffect } from 'react';
import FilterBar from '../app/components/FilterBar';
import SearchResults from '../app/components/SearchResults'
import axios from 'axios';



interface category{
 _id: string,
            category: string
        
}



export default function Home() {

    const [loading, setLoading] = useState(false);
    const [token, setToken] = useState<string>("");
    const [categories, setCategories] = useState<category[]>([]);
    const [manufacturers, setManufacturers] = useState<manufacturer[]>([]);
    const [searchResults, setSearchResults] = useState<SearchResult[]>([]);

   

   
    const autentication = async(process :string )=>{
       let localToken = '';

       if(process!=""){
         //const resultAuth = await axios.post(`${process.env.API_URI}/auth/login?x-vercel-protection-bypass=${process.env.X_VERCEL_PROTECCION_BY_PASS}`,
                 if(token!=""){
                                    localToken = token;
                                    }else{
                                      console.log("Entro a autenticacion por token vacio");
                                         const resultAuth = await axios.post(`${process}auth/login?x-vercel-protection-bypass=rapidoruedanlos35carosconelferri`,
                                                  {"username":`portalUI`,
                                                    "password": `PasswordSuperSecreto`,
                                                    } );
                                                          localToken =await resultAuth.data.token;

                                                          setToken(localToken);
                                                        
                                                      
                                                          console.log(`NEW TOKEEEN : ${token}  annd ${localToken } `);
                                                  }  
                                  }
                                
         
            return localToken;
          };
           


       
 // Fetch categories on component Filter 

          useEffect(() => {

                  const fetchCategories = async (process : string) => {
                    try {
                          const localToken = await autentication(process);
                            //  const resultMan = await axios.get(`${process.env.API_URI}/manufacturer/?x-vercel-protection-bypass=${process.env.X_VERCEL_PROTECCION_BY_PASS}`,{
                                 console.log(`Local Token in cats ${localToken}`);

                                  if(categories.length == 0){
                                          const resultCat = await axios.get(`${process}category/categories/?x-vercel-protection-bypass=rapidoruedanlos35carosconelferri`,{
                                          headers: {
                                                    Authorization: `Bearer ${localToken}`
                                                  }
                                        });
                                                const dataCat = await resultCat.data.data;
                                              
                                          setCategories(dataCat);
                                          console.log("populated categories");

                                          
                                      }
                                     
                    } catch (error) {
                      console.error('Failed to fetch data: catalogs', error);
                    }
                  };
                  fetchCategories( 'https://recalls-bi0vwv1c5-homero-gomezs-projects.vercel.app/api/');
                  },[]);
    
 // Fetch manufacturer on component Filter

          useEffect(() => {

                  const fetchManufacturers = async (process : string) => {
                    try {
                          const localToken = await autentication(process);
                            //  const resultMan = await axios.get(`${process.env.API_URI}/manufacturer/?x-vercel-protection-bypass=${process.env.X_VERCEL_PROTECCION_BY_PASS}`,{
                         

                                  console.log(`Local Token in man ${localToken}`);

                                      if(manufacturers.length == 0 ){
                                        console.log("load manufacturers ");
                                          const resultMan = await axios.get(`${process}manufacturer/?x-vercel-protection-bypass=rapidoruedanlos35carosconelferri`,{
                                          headers: {
                                                    Authorization: `Bearer ${localToken}`
                                                  }
                                        });
                                                const data = await resultMan.data.data;
                                              console.log(data);
                                              setManufacturers(data);
                                          }else{
                                            console.log("NO entro por manufacturers");
                                          }
                                      
                        
                    } catch (error) {
                          console.error('Failed to fetch data: manufacturesrs', error);
                    }
                  };
                  fetchManufacturers( 'https://recalls-bi0vwv1c5-homero-gomezs-projects.vercel.app/api/');
                  },[]);

   

     const handleSearch = async (filters: { category: string; manufacturer: string; model: string;year:string }) => {
     let filtersStr = filters.manufacturer;
      setSearchResults([]);
    
       
     
    setLoading(true);

    //let strApi ='http://localhost:4000/api/';
   const strApi ='https://recalls-bi0vwv1c5-homero-gomezs-projects.vercel.app/api/';
    try {

   
          
         const catSelected:category[] =  categories.filter(cat => cat._id == filters.category);
  
         if(catSelected[0].category.toUpperCase() == "VEHICLES"){

          filtersStr = `${filtersStr }/model/${filters.model.trim()}/modelyear/${filters.year}`;
 

         }
         let tokenResp = token;
         if(token=="")
         tokenResp = await autentication(strApi);

        if(searchResults.length == 0 && filters.manufacturer !="" && filters.category!=""){
        // const response = await axios.get(`${process.env.API_URI}/api/recall/manufacturer/${filtersStr}?x-vercel-protection-bypass=${process.env.X_VERCEL_PROTECCION_BY_PASS}`,{
        const response = await axios.get(`${strApi}recall/manufacturer/${filtersStr}?x-vercel-protection-bypass=rapidoruedanlos35carosconelferri`,{
              headers: {
                      'Content-Type': 'application/json',
                        Authorization: `Bearer ${tokenResp}`
                      }
            });

      
     
        const data:SearchResult[] = await response.data.data;
        setSearchResults(data);
          }
             
   
     
   

    } catch (error) {
      console.error('Error during search:', error);
    } finally {
      setLoading(false); 
    }
  
  };

  //  getProps(categories,token).then((prop)=>{console.log(prop)});

     if (loading) {
    return  <div
    className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-solid border-current border-e-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
    role="status">
    <span
      className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
      >Loading...</span
    >
  </div>;
  }
 
 
  return (
    <div className="container mx-auto px-4 py-8">
      <header className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 py-6 border-b border-gray-200 mb-8">
        <h1 className="text-3xl font-bold text-blue-600">Recall Search Application</h1>
        <div className="flex items-center gap-4" >
          <p className="text-gray-600">Welcome, To start select one category</p>
          
        </div>
      </header>

     <main >
        <FilterBar 
          categories={categories} 
          manufacturers={manufacturers} 
          onSearch={handleSearch}
          loading={loading}
        />
         <SearchResults results={searchResults} loading={loading} />
      </main>
    </div>
  );
}



