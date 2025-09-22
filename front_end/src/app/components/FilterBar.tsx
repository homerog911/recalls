// components/FilterBar.tsx
import { useState,useEffect } from 'react';
import styles from '../../styles/FilterBar.module.css';

interface FilterBarProps {
  categories: category[];
  manufacturers: manufacturer[];
  onSearch: (filters: { category: string; manufacturer: string; model: string , year:string}) => void;
  loading: boolean;
}

export default function FilterBar({ categories, manufacturers, onSearch, loading }: FilterBarProps) {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedManufacturer, setSelectedManufacturer] = useState('');
  const [filteredManufacturers, setFilteredManufacturers] = useState<manufacturer[]>([]);
  const [model, setModel] = useState('');
  const [year, setYear] = useState('');

  let years : string[] = [];
  const max_year : number = new Date().getFullYear() + 1;

  for(let i=2000;i<=max_year;i++){
    years.push(i.toString());
  }

  // Filter manufacturers when category changes
            useEffect(() => {
                if (selectedCategory) {
                
               
                    const filtered :manufacturer[] = manufacturers.filter(man => 
                        man.category._id== selectedCategory
                    );
                    setFilteredManufacturers(filtered);
                    
                    // Reset manufacturer selection if it's not available for the selected category
                    if (selectedManufacturer && !filtered.some(man => man.manufacturer === selectedManufacturer)) {
                        setSelectedManufacturer('');
                    }
                }else{
                   setSelectedManufacturer('');
                }

            }, [selectedCategory, manufacturers, categories, selectedManufacturer]);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch({
      category: selectedCategory,
      manufacturer: selectedManufacturer,
      model: model,
      year:year
    });
  };

  return (
    <div className={styles.filterBar}>
      <h2>Search Filters</h2>
      <form onSubmit={handleSubmit} className={styles.filterForm}>
        <div className={styles.filterGroup}>
          <label htmlFor="category">Category:</label>
          <select 
            id="category"
            value={selectedCategory} 
            onChange={(e) => setSelectedCategory(e.target.value)}
            className={styles.select}
          >
            <option value="">Select Category</option>
            {categories.map((category) => (
              <option key={category._id} value={category._id}>{category.category}</option>
            ))}
          </select>
        </div>

        <div className={styles.filterGroup}>
          <label htmlFor="manufacturer">Manufacturer:</label>
          <select 
            id="manufacturer"
            value={selectedManufacturer} 
            onChange={(e) => setSelectedManufacturer(e.target.value) }
            className={styles.select}
          >
            <option value="">Select Manufacturer</option>
            {filteredManufacturers.map((manufacturer) => ( 
              <option key={manufacturer._id} value={manufacturer.manufacturer}>{manufacturer.manufacturer}</option>
            ))}
          </select>
        </div>

        <div className={styles.filterGroup}>
          <label htmlFor="model">Model:</label>
          <input
            id="model"
            type="text"
            value={model}
            onChange={(e) => setModel(e.target.value)}
            placeholder="Enter model name"
            className={styles.input}
          />
        </div>
         <div className={styles.filterGroup}>
          <label htmlFor="year">Year:</label>
          <select 
            id="year"
            value={year} 
            onChange={(e) => setYear(e.target.value)}
            className={styles.select}
          >
            <option value="">Select Year</option>
            {years.map((year) => (
              <option key={year} value={year}>{year}</option>
            ))}
          </select>
        </div>

        <button 
          type="submit" 
          disabled={loading}
          className={styles.searchButton}
        >
          {loading ? 'Searching...' : 'Search'}
        </button>
      </form>
    </div>
  );
}