import { createContext, useContext, useReducer } from 'react';

const FilterContext = createContext();

const filterReducer = (state, action) => {
  switch (action.type) {
    case 'SET_CATEGORY':
      return { ...state, category: action.payload, manufacturer: '' };
    case 'SET_MANUFACTURER':
      return { ...state, manufacturer: action.payload };
    case 'SET_MODEL':
      return { ...state, model: action.payload };
    case 'SET_RESULTS':
      return { ...state, results: action.payload, loading: false };
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    default:
      return state;
  }
};

export function FilterProvider({ children }) {
  const [state, dispatch] = useReducer(filterReducer, {
    category: '',
    manufacturer: '',
    model: '',
    results: [],
    loading: false
  });

  return (
    <FilterContext.Provider value={{ state, dispatch }}>
      {children}
    </FilterContext.Provider>
  );
}

export const useFilter = () => useContext(FilterContext);