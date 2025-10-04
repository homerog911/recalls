// pages/index.tsx
"use client";
import { useState, useEffect } from "react";
import FilterBar from "../app/components/FilterBar";








export default function Home() {



  const [loading, setLoading] = useState(false);

  //  getProps(categories,token).then((prop)=>{console.log(prop)});


  if (loading) {
    return (
      <div
        className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-solid border-current border-e-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
        role="status"
      >
        <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
          Loading...
        </span>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <header className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 py-6 border-b border-gray-200 mb-8">
        <h1 className="text-3xl font-bold text-blue-600">
          Recall Search Application
        </h1>
        <div className="flex items-center gap-4">
          <p className="text-gray-600">Welcome, To start select one category</p>
        </div>
      </header>

      <main>

            <FilterBar loading={loading}/>


      </main>
    </div>
  );
}
