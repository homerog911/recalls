// pages/index.tsx
'use client'
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { GetServerSideProps } from 'next';
import { getSession, signIn, signOut, useSession } from 'next-auth/react';
import { connectToDatabase } from '../app/lib/mongodb';
import FilterBar from '../app/components/FilterBar';
import SearchResults from '../app/components/SearchResults';
import styles from '../styles/Home.module.css';

interface HomeProps {
  categories: string[];
  manufacturers: string[];
}

export default function Home({ categories, manufacturers }: HomeProps) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (status === 'loading') return; // Do nothing while loading
    if (!session) {
      router.push('/auth/signin');
    }
  }, [session, status, router]);

  const handleSearch = async (filters: { category: string; manufacturer: string; model: string }) => {
    setLoading(true);
    try {
      const response = await fetch('/api/search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(filters),
      });
      
      if (response.ok) {
        const data = await response.json();
        setSearchResults(data);
      } else {
        console.error('Search failed');
      }
    } catch (error) {
      console.error('Error during search:', error);
    } finally {
      setLoading(false);
    }
  };

  if (status === 'loading') {
    return <div className={styles.container}>Loading...</div>;
  }

  if (!session) {
    return <div className={styles.container}>Redirecting to login...</div>;
  }

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>Car Search Application</h1>
        <div className={styles.userSection}>
          <p>Welcome, {session.user?.email}</p>
          <button onClick={() => signOut()} className={styles.signOutButton}>
            Sign Out
          </button>
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

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);
  
  if (!session) {
    return {
      redirect: {
        destination: '/auth/signin',
        permanent: false,
      },
    };
  }

  const { db } = await connectToDatabase();
  
  // Fetch categories and manufacturers from MongoDB
  const categories = await db.collection('categories').find({}).toArray();
  const manufacturers = await db.collection('manufacturers').find({}).toArray();

  return {
    props: {
      session,
      categories: categories.map((cat: any) => cat.name),
      manufacturers: manufacturers.map((man: any) => man.name),
    },
  };
};