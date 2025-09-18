import { useState, useEffect } from 'react';
import { useFilter } from '../../context/FilterContext';
import Dropdown from './Dropdown';
import Button from './Button';

export default function FilterBar() {
  const { state, dispatch } = useFilter();
  const [categories, setCategories] = useState([]);
  const [manufacturers, setManufacturers] = useState([]);

  useEffect(() => {
    fetch('/api/categories')
      .then(res => res.json())
      .then(data => setCategories(data));
  }, []);

  useEffect(() => {
    if (state.category) {
      fetch(`/api/manufacturers?category=${state.category}`)
        .then(res => res.json())
        .then(data => setManufacturers(data));
    } else {
      setManufacturers([]);
    }
  }, [state.category]);

  const handleSearch = async () => {
    dispatch({ type: 'SET_LOADING', payload: true });
    
    const token = localStorage.getItem('token');
    const response = await fetch('/api/search', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        category: state.category,
        manufacturer: state.manufacturer,
        model: state.model
      })
    });

    const results = await response.json();
    dispatch({ type: 'SET_RESULTS', payload: results });
  };

  return (
    <div className="filter-bar">
      <Dropdown
        label="Category"
        options={categories.map(cat => ({ value: cat._id, label: cat.name }))}
        value={state.category}
        onChange={(value) => dispatch({ type: 'SET_CATEGORY', payload: value })}
      />
      
      <Dropdown
        label="Manufacturer"
        options={manufacturers.map(m => ({ value: m._id, label: m.name }))}
        value={state.manufacturer}
        onChange={(value) => dispatch({ type: 'SET_MANUFACTURER', payload: value })}
        disabled={!state.category}
      />
      
      <div className="input-group">
        <label>Model</label>
        <input
          type="text"
          value={state.model}
          onChange={(e) => dispatch({ type: 'SET_MODEL', payload: e.target.value })}
          placeholder="Enter model name"
        />
      </div>
      
      <Button onClick={handleSearch} disabled={state.loading}>
        {state.loading ? 'Searching...' : 'Search'}
      </Button>
    </div>
  );
}