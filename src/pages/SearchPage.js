import data from "../data/properties.json";
import SearchForm from "../components/SearchForm";
import PropertyCard from "../components/PropertyCard";

function SearchPage() {
  const [results, setResults] = useState(data.properties);

  const handleSearch = criteria => {
    const filtered = data.properties.filter(p => {
      return (
        (criteria.type === "Any" || p.type === criteria.type) &&
        p.price >= criteria.minPrice &&
        p.price <= criteria.maxPrice &&
        p.bedrooms >= criteria.minBeds &&
        p.bedrooms <= criteria.maxBeds &&
        p.postcode.startsWith(criteria.postcode)
      );
    });
    setResults(filtered);
  };

  return (
    <>
      <SearchForm onSearch={handleSearch} />
      {results.map(p => <PropertyCard key={p.id} property={p} />)}
    </>
  );
}

export default SearchPage;
