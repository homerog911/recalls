// pages/index.tsx
'use client'
import { createContext,  useState, useEffect } from 'react';
import FilterBar from '../app/components/FilterBar';
import SearchResults from '../app/components/SearchResults'
import styles from '../styles/Home.module.css';
import axios from 'axios';



interface category{
 _id: string,
            category: string
        
}


interface HomeProps {
  
  categories: category[];
  manufacturers: manufacturer[];
}

interface SearchResult {
  id: number;
  RecallDate: string;
  Title: string;
  Description: string;
  Model: string;
  Manufacturer: string;
  Hazards: string;
  Remedies: string;
  year: number;
  // Add other properties as needed based on your data
}

const ThemeContext = createContext(null);

export default function Home() {

    const [loading, setLoading] = useState(false);
    const [token, setToken] = useState("");
    const [categories, setCategories] = useState<category[]>([]);
  const [manufacturers, setManufacturers] = useState<manufacturer[]>([]);

    
   const MockCategories= [ {
            _id: "68cb3f62f070ae21265c7361",
            category: "Elextronics"
            },
        {
            _id: "68cb3cb0ace660e09188fc28",
            category: "Vexhicles"           
        }];

       const MockManufacturers=[
         {
           _id: "68cb4b52d76538def402aefa",
            category: {
               _id: "68cb3f62f070ae21265c7361",
                category: "Electronics"
            },
            manufacturer: "Acer",
            createdAt: "2025-09-17T23:59:14.034Z",
            updatedAt: "2025-09-17T23:59:14.034Z",
           __v: 0
        },
        {
           _id: "68cca4aa726d882571788e86",
            category: {
               _id: "68cb3cb0ace660e09188fc28",
                category: "Vehicles"
            },
            manufacturer: "BENTLEY",
            createdAt: "2025-09-19T00:32:42.221Z",
            updatedAt: "2025-09-19T00:32:42.221Z",
           __v: 0
        }
       ];

        const [searchResults, setSearchResults] = useState<SearchResult[]>([]);


          useEffect(() => {
    const fetchData = async () => {
      try {
        let tokenResp = token;
           if(token===""){
       //    const resultAuth = await axios.post(`${process.env.API_URI}/auth/login?x-vercel-protection-bypass=${process.env.X_VERCEL_PROTECCION_BY_PASS}`,
       const resultAuth = await axios.post(`https://recalls-bi0vwv1c5-homero-gomezs-projects.vercel.app/api/auth/login?x-vercel-protection-bypass=rapidoruedanlos35carosconelferri`,
            {"username":`portalUI`,
              "password": `PasswordSuperSecreto`,
              } );
                    tokenResp =resultAuth.data.token;

                    setToken(tokenResp);
                    console.log(`token ${tokenResp}`);
           }
          //  const resultCat = await axios.get(`${process.env.API_URI}/category/categories/?x-vercel-protection-bypass=${process.env.X_VERCEL_PROTECCION_BY_PASS}`,{
            const resultCat = await axios.get(`https://recalls-bi0vwv1c5-homero-gomezs-projects.vercel.app/api/category/categories/?x-vercel-protection-bypass=rapidoruedanlos35carosconelferri`,{
              headers: {
                        Authorization: `Bearer ${tokenResp}`
                      }
            });
                    const dataCat =resultCat.data.data;
                    console.log(`data ${dataCat}`);
             setCategories(dataCat);
              
          //  const resultMan = await axios.get(`${process.env.API_URI}/manufacturer/?x-vercel-protection-bypass=${process.env.X_VERCEL_PROTECCION_BY_PASS}`,{
               const resultMan = await axios.get(`https://recalls-bi0vwv1c5-homero-gomezs-projects.vercel.app/api/manufacturer/?x-vercel-protection-bypass=rapidoruedanlos35carosconelferri`,{
              headers: {
                        Authorization: `Bearer ${tokenResp}`
                      }
            });
                    const data =resultCat.data.data;
                    console.log(`data ${data}`);
            setManufacturers(data);
       
        
      } catch (error) {
        console.error('Failed to fetch data:', error);
      }
    };

    fetchData();
  }, []);


     const getProps = async (categories: category[], token:string) =>{
      
           
           
            if(!true){
              try{

            setLoading(true);
            console.log(`URI ${process.env.API_URI}`);
            // Fetch categories and manufacturers from MongoDB

           if(token===""){
           const resultAuth = await axios.post(`${process.env.API_URI}/auth/login?x-vercel-protection-bypass=${process.env.X_VERCEL_PROTECCION_BY_PASS}`,
            {"username":`${process.env.USR_PORTAL}`,
              "password": `${process.env.PASS_USR_PORTAL}`,
              } );
                   const  tokenResp =resultAuth.data.token;

                    setToken(tokenResp);
                    console.log(`token ${tokenResp}`);
           }
            const result = await axios.get(`${process.env.API_URI}/category/categories/?x-vercel-protection-bypass=${process.env.X_VERCEL_PROTECCION_BY_PASS}`,{
              headers: {
                        Authorization: `Bearer ${token}`
                      }
            });
                    const data =result.data.data;
                    console.log(`data ${data}`);

               categories= result.data;
            }catch(error){
               console.error('Error during search:', error);
        
            }finally{
              setLoading(false);
            }
              
          }
          return {
              props: {
                categories: categories.map((cat: category) => cat.category),
                manufacturers: manufacturers.map((man: manufacturer) => man.manufacturer),
              },
            
          }
        }
     const handleSearch = async (filters: { category: string; manufacturer: string; model: string;year:string }) => {
     let filtersStr = filters.manufacturer;
    setLoading(true);
   
    try {

    
      if(true){
          
         const catSelected:category[] =  categories.filter(cat => cat._id == filters.category);

         if(catSelected[0].category != "vehicles"){

          filtersStr = filtersStr + `/model/${filters.model.trim}/modelyear/${filters.year}`;

         }

        // const response = await axios.get(`${process.env.API_URI}/api/recall/manufacturer/${filtersStr}?x-vercel-protection-bypass=${process.env.X_VERCEL_PROTECCION_BY_PASS}`,{
        const response = await axios.get(`https://recalls-bi0vwv1c5-homero-gomezs-projects.vercel.app/api/recall/manufacturer/${filtersStr}?x-vercel-protection-bypass=rapidoruedanlos35carosconelferri`,{
              headers: {
                      'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`
                      }
            });

      
     
        const data = response.data;
        setSearchResults(data);
     
    }else{
      const data = [{
          id: "123",
          RecallDate: "01/01/1990",
          Title: "motor fail",
          Description: "se jodio el carro",
          Model: "ramv",
          Manufacturer: "yotoya",
          Hazards: "leakings",
          Remedies: "remove",
          year: "2012"
        }];

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
    return <div className={styles.container}>Loading...</div>;
  }
 
  console.log(`TOKEEEN : ${token}`);
  return (
    <div className="container mx-auto px-4 py-8">
      <header className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 py-6 border-b border-gray-200 mb-8">
        <h1 className="text-3xl font-bold text-blue-600">Recall Search Application</h1>
        <div className="flex items-center gap-4" >
          <p className="text-gray-600">Welcome, To start select one category</p>
          
        </div>
      </header>

     <main className={styles.main}>
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



