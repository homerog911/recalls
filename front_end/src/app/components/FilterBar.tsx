// components/FilterBar.tsx
import {useContext, useState, useEffect } from 'react';
import styles from '../../styles/FilterBar.module.css';
import SearchResults from '../components/SearchResults';


import {
  autentication,
  getCategories,
  gethManufacturers,
  getRecalls,
} from '../lib/auth';

interface FilterBarProps {
  loading: boolean;
}

export default function FilterBar({ loading }: FilterBarProps) {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedManufacturer, setSelectedManufacturer] = useState('');
  const [filteredManufacturers, setFilteredManufacturers] = useState<
    manufacturer[]
  >([]);
  const [model, setModel] = useState('');
  const [year, setYear] = useState('');
  const [categories, setCategories] = useState<category[]>([]);
  const [manufacturers, setManufacturers] = useState<manufacturer[]>([]);
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);



  const years: string[] = [];
  const max_year: number = new Date().getFullYear() + 1;

  for (let i = 2000; i <= max_year; i++) {
    years.push(i.toString());
  }

  useEffect(() => {
    console.log('populate categories');
    const fetchCategories = async () => {
      if (categories.length == 0) {
        const data = await getCategories();
        setCategories(data);
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    console.log('populate manufacturers');
    const fetchManufactureres = async () => {
      if (manufacturers.length == 0) {
        const data = await gethManufacturers();
        setManufacturers(data);
      }
    };
    fetchManufactureres();
  }, [manufacturers]);

  // Filter manufacturers when category changes
  useEffect(() => {
    console.log('Filtro');
    if (selectedCategory) {
      const filtered: manufacturer[] = manufacturers.filter(
        (man) => man.category._id == selectedCategory
      );
      setFilteredManufacturers(filtered);

      // Reset manufacturer selection if it's not available for the selected category
      if (
        selectedManufacturer &&
        !filtered.some((man) => man._id === selectedManufacturer)
      ) {
        setSelectedManufacturer('');
        setModel('');
        setYear('');
      }
    } else {
      setSelectedManufacturer('');
    }
  }, [selectedCategory, manufacturers, categories, selectedManufacturer]);

  const handleSearch = async (filters: {
    category: string;
    manufacturer: string;
    model: string;
    year: string;
  }) => {
    let filtersStr = filters.manufacturer;

    try {
      const catSelected: category[] = categories.filter(
        (cat) => cat._id == filters.category
      );

      if (catSelected[0].category.toUpperCase() == 'VEHICLES') {
        filtersStr = `${filtersStr}/model/${filters.model.trim()}/modelyear/${
          filters.year
        }`;
      }

      const data: SearchResult[] = await getRecalls(filtersStr);

    

      setSearchResults(data);

        
    } catch (error) {
      console.error('Error during search:', error);
  
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    loading = true;
    e.preventDefault();
    handleSearch({
      category: selectedCategory,
      manufacturer: selectedManufacturer,
      model: model,
      year: year,
    });
    loading = false;
  };

  return (
    <div className={styles.filterBar}>
      <h2>Search Filters</h2>
      <form onSubmit={handleSubmit} className={styles.filterForm}>
        <div className={styles.filterGroup}>
          <label htmlFor='category'>Category:</label>
          <select
            id='category'
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className={styles.select}
            required
          >
            <option value=''>Select Category</option>
            {categories.map((category) => (
              <option key={category._id} value={category._id}>
                {category.category}
              </option>
            ))}
          </select>
        </div>

        <div className={styles.filterGroup}>
          <label htmlFor='manufacturer'>Manufacturer:</label>
          <select
            id='manufacturer'
            value={selectedManufacturer}
            onChange={(e) => setSelectedManufacturer(e.target.value)}
            className={styles.select}
            required
          >
            <option value=''>Select Manufacturer</option>
            {filteredManufacturers.map((manufacturer) => (
              <option key={manufacturer._id} value={manufacturer._id}>
                {manufacturer.manufacturer}
              </option>
            ))}
          </select>
        </div>

        <div className={styles.filterGroup}>
          <label htmlFor='model'>Model:</label>
          <input
            id='model'
            type='text'
            value={model}
            onChange={(e) => setModel(e.target.value)}
            placeholder='Enter model name'
            className={styles.input}
          />
        </div>
        <div className={styles.filterGroup}>
          <label htmlFor='year'>Year:</label>
          <select
            id='year'
            value={year}
            onChange={(e) => setYear(e.target.value)}
            className={styles.select}
          >
            <option value=''>Select Year</option>
            {years.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>

        <button
          type='submit'
          disabled={loading}
          className={styles.searchButton}
        >
          {loading ? 'Searching...' : 'Search'}
        </button>
      </form>
      <SearchResults results={searchResults} loading={loading} />
    </div>
  );
}
