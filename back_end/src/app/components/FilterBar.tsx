// components/FilterBar.tsx
import { useState } from 'react';
import styles from '../styles/FilterBar.module.css';

interface FilterBarProps {
  categories: string[];
  manufacturers: string[];
  onSearch: (filters: { category: string; manufacturer: string; model: string }) => void;
  loading: boolean;
}

export default function FilterBar({ categories, manufacturers, onSearch, loading }: FilterBarProps) {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedManufacturer, setSelectedManufacturer] = useState('');
  const [model, setModel] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch({
      category: selectedCategory,
      manufacturer: selectedManufacturer,
      model: model
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
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>

        <div className={styles.filterGroup}>
          <label htmlFor="manufacturer">Manufacturer:</label>
          <select 
            id="manufacturer"
            value={selectedManufacturer} 
            onChange={(e) => setSelectedManufacturer(e.target.value)}
            className={styles.select}
          >
            <option value="">Select Manufacturer</option>
            {manufacturers.map((manufacturer) => (
              <option key={manufacturer} value={manufacturer}>{manufacturer}</option>
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