// components/FilterBar.tsx
import {
  useState,
  useEffect,
  SetStateAction,
  Dispatch,
} from "react";
import styles from "../../styles/FilterBar.module.css";
import SearchResults from "../SearchResults/SearchResults";

import {
  getCategories,
  gethManufacturers,
  getRecalls,
  getUser,
} from "../../lib/auth";
import Loader from "../Loader";

interface FilterBarProps {
  loading: boolean;
  logged: boolean;
  setLogged: Dispatch<SetStateAction<boolean>>;
}

export default function FilterBar({
  loading,
  logged,
  setLogged,
}: FilterBarProps) {
  const [searching, setSearching] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedManufacturer, setSelectedManufacturer] = useState("");
  const [filteredManufacturers, setFilteredManufacturers] = useState<
    manufacturer[]
  >([]);
  const [model, setModel] = useState("");
  const [year, setYear] = useState("");
  const [categories, setCategories] = useState<category[]>([]);
  const [manufacturers, setManufacturers] = useState<manufacturer[]>([]);
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);

  const [user, setUser] = useState("");

  const years: string[] = [];
  const max_year: number = new Date().getFullYear() + 1;

  for (let i = 2000; i <= max_year; i++) {
    years.push(i.toString());
  }

  useEffect(() => {
    console.log("populate user");
    const getUserFetch = async () => {
      if (user == "") {
        const data = await getUser();
        setUser(data);
      }
    };
    getUserFetch();
  });

  useEffect(() => {
    console.log("populate categories Efect");
    const fetchCategories = async () => {
      if(categories)
      if (categories.length == 0) {
        console.log("populate categories Call API");
        const data = await getCategories();
        setCategories(data);
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    console.log("populate manufacturers Effect");
    const fetchManufactureres = async () => {
       if(manufacturers)
      if (manufacturers.length == 0) {
        console.log("manufacturers API");
        const data = await gethManufacturers();
        setManufacturers(data);
      }
    };
    fetchManufactureres();
  }, [manufacturers]);

  // Filter manufacturers when category changes
  useEffect(() => {
    if(manufacturers)
    if (manufacturers.length > 0 && categories.length > 0) {
      console.log("Filtro");
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
          setSelectedManufacturer("");
          setModel("");
          setYear("");
        }
      } else {
        setSelectedManufacturer("");
      }
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

      if (catSelected[0].category.toUpperCase() == "VEHICLES") {
        filtersStr = `${filtersStr}/model/${filters.model.trim()}/modelyear/${
          filters.year
        }`;
      }

      const data: SearchResult[] = await getRecalls(filtersStr);

      setSearchResults(data);
    } catch (error) {
      console.error("Error during search:", error);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    console.log("entro al submit");
    e.preventDefault();
    setSearching(true);
    console.log("set al searchin true");

    handleSearch({
      category: selectedCategory,
      manufacturer: selectedManufacturer,
      model: model,
      year: year,
    });
    console.log("set al searchin false");
    setSearching(false);
  };

  if (categories === null || manufacturers == null) {
    return (
      <div className="container mx-auto px-4 py-8">
        <header className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 py-6 border-b border-gray-200 mb-8">
          <h1 className="text-3xl font-bold text-blue-600">
            Recall Search Application
          </h1>
          <div className="flex items-center gap-4">
            <p className="text-gray-600">
              Welcome : {user}, To start select one category{" "}
               <button
              className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
              onClick={() => setLogged(false)}
            >
              LogOut
            </button>
            </p>
          </div>
        </header>
        <main>
          <div className="flex items-center w-max  justify-center">
            <h3 className="text-lg font-medium text-red-700 mb-2">
              The server is busy
            </h3>
            <p className="text-gray-500"> Please try again later.</p>
          </div>
        </main>
      </div>
    );
  }

  if (categories.length == 0 || manufacturers.length == 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <header className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 py-6 border-b border-gray-200 mb-8">
          <h1 className="text-3xl font-bold text-blue-600">
            Recall Search Application
          </h1>
          <div className="flex items-center gap-4">
            <p className="text-gray-600">
              Welcome : {user}, To start select one category
               <button
              className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
              onClick={() => setLogged(false)}
            >
              LogOut
            </button>
            </p>
          </div>
        </header>
        <main>
          <div className="flex items-center w-max  justify-center">
            <p className="text-gray-600 text-5xl">Loading Filters... </p>
            <Loader></Loader>
          </div>
        </main>
      </div>
    );
  }

  if (searching) {
    <Loader></Loader>;
  }
  return (
    <div className="container mx-auto px-4 py-8">
      <header className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 py-6 border-b border-gray-200 mb-8">
        <h1 className="text-3xl font-bold text-blue-600">
          Recall Search Application
        </h1>
        <div className="flex items-center gap-4">
          <p className="text-gray-600">
            Welcome : {user}, To start select one category{" "}
            <button
              className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
              onClick={() => setLogged(false)}
            >
              LogOut
            </button>
          </p>
        </div>
      </header>

      <main>
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
                required
              >
                <option value="">Select Category</option>
                {categories.map((category) => (
                  <option key={category._id} value={category._id}>
                    {category.category}
                  </option>
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
                required
              >
                <option value="">Select Manufacturer</option>
                {filteredManufacturers.map((manufacturer) => (
                  <option key={manufacturer._id} value={manufacturer._id}>
                    {manufacturer.manufacturer}
                  </option>
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
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            </div>

            <button
              type="submit"
              disabled={loading}
              className={styles.searchButton}
            >
              {loading ? "Searching..." : "Search"}
            </button>
          </form>
          <SearchResults results={searchResults} loading={loading} />
        </div>
      </main>
    </div>
  );
}
