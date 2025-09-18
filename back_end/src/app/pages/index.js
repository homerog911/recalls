import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../context/AuthContext';
import Layout from '../components/layout/Layout';
import FilterBar from '../components/ui/FilterBar';

export default function Home() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  if (loading) return <div>Loading...</div>;
  if (!user) return null;

  return (
    <Layout>
      <div className="container">
        <h1>Vehicle Search</h1>
        <FilterBar />
        {/* Results display would go here */}
      </div>
    </Layout>
  );
}