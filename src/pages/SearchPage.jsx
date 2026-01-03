import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import data from "../data/properties.json";
import SearchForm from "../components/SearchForm";
import PropertyCard from "../components/PropertyCard";

function SearchPage() {
  // State for search results and favourites
  const [results, setResults] = useState(data.properties);
  const [favourites, setFavourites] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load saved favourites from browser storage on component mount
  useEffect(() => {
    try {
      const savedFavourites = localStorage.getItem('estateAgentFavourites');
      
      if (savedFavourites && savedFavourites !== 'undefined') {
        const parsedFavourites = JSON.parse(savedFavourites);
        setFavourites(parsedFavourites);
      } else {
        setFavourites([]);
      }
    } catch (error) {
      console.error("Error loading favourites:", error);
      setFavourites([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Save favourites to browser storage whenever they change
  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem('estateAgentFavourites', JSON.stringify(favourites));
    }
  }, [favourites, isLoading]);

  // Filter properties based on search criteria
  const handleSearch = (criteria) => {
    const filtered = data.properties.filter((p) => {
      // Parse property date and filter dates
      const propertyDate = new Date(p.dateAdded);
      
      // Handle date filtering with time boundaries
      const fromDate = criteria.dateFrom 
        ? new Date(criteria.dateFrom + 'T00:00:00')
        : null;
      
      const toDate = criteria.dateTo 
        ? new Date(criteria.dateTo + 'T23:59:59')
        : null;

      // Check all search criteria
      const typeMatch = criteria.type === 'Any' || p.type === criteria.type;
      const minPriceMatch = !criteria.minPrice || p.price >= Number(criteria.minPrice || 0);
      const maxPriceMatch = !criteria.maxPrice || p.price <= Number(criteria.maxPrice || Infinity);
      const minBedsMatch = !criteria.minBeds || p.bedrooms >= Number(criteria.minBeds || 0);
      const maxBedsMatch = !criteria.maxBeds || p.bedrooms <= Number(criteria.maxBeds || Infinity);
      
      // Postcode area matching (case-insensitive)
      const postcodeMatch = !criteria.postcode || 
        p.location.toUpperCase().includes(criteria.postcode.toUpperCase());
      
      // Date range matching
      const fromDateMatch = !fromDate || propertyDate >= fromDate;
      const toDateMatch = !toDate || propertyDate <= toDate;

      return typeMatch && minPriceMatch && maxPriceMatch && 
             minBedsMatch && maxBedsMatch && postcodeMatch &&
             fromDateMatch && toDateMatch;
    });

    setResults(filtered);
  };

  // Add property to favourites list (prevents duplicates)
  const addToFavourites = (property) => {
    const isAlreadyFavourite = favourites.some(fav => fav.id === property.id);
    
    if (!isAlreadyFavourite) {
      const updatedFavourites = [...favourites, property];
      setFavourites(updatedFavourites);
    }
  };

  // Remove property from favourites by ID
  const removeFavourite = (id) => {
    const updatedFavourites = favourites.filter(fav => fav.id !== id);
    setFavourites(updatedFavourites);
  };

  // Clear all favourites with confirmation
  const clearFavourites = () => {
    if (favourites.length > 0 && window.confirm('Are you sure you want to clear all favourites?')) {
      setFavourites([]);
    }
  };

  return (
    <div className="search-container">
      {/* Left column: Search form and results */}
      <div className="search-results-area">
        <h1>Estate Agent Search</h1>
        <SearchForm onSearch={handleSearch} />
        
        <h2>Search Results ({results.length} found)</h2>
        <div className="search-results-grid">
          {results.map((p) => (
            <PropertyCard
              key={p.id}
              property={p}
              onFavourite={addToFavourites}
            />
          ))}
        </div>
      </div>
      
      {/* Right column: Favourites sidebar */}
      <div
        id="favourites-section"
        className="favourites-section"
        onDragOver={(e) => {
          e.preventDefault();
          e.dataTransfer.dropEffect = 'move';
        }}
        onDrop={(e) => {
          e.preventDefault();
          try {
            const droppedProperty = JSON.parse(
              e.dataTransfer.getData("property")
            );
            addToFavourites(droppedProperty);
          } catch (error) {
            console.error('Error processing drop:', error);
          }
        }}
      >
        <div className="favourites-title">
          <span style={{ fontSize: "24px" }}></span> 
          <h2 style={{ margin: 0 }}>
            My Favourites {isLoading ? "(Loading...)" : `(${favourites.length})`}
          </h2>
          <span style={{ fontSize: "24px" }}></span>
        </div>

        {/* Loading state */}
        {isLoading ? (
          <p>Loading favourites...</p>
        ) : favourites.length === 0 ? (
          <p style={{ 
            textAlign: "center", 
            color: "#666", 
            fontSize: "18px",
            padding: "20px"
          }}>
            Drag properties here or use the "Add to Favourites" button
          </p>
        ) : (
          <>
            <div className="favourites-grid">
              {favourites.map((p) => (
                <div key={p.id} className="property-card">
                  {/* Property image with fallback */}
                  {p.images && p.images.length > 0 && (
                    <img 
                      src={p.images[0]} 
                      alt={p.type}
                      className="property-image"
                      onError={(e) => {
                        e.target.onerror = null;
                      }}
                    />
                  )}
                  
                  {/* Property details */}
                  <h3 style={{ margin: "0 0 5px 0", color: "#333" }}>{p.type}</h3>
                  <p className="property-price">£{p.price.toLocaleString()}</p>
                  <p style={{ margin: "0 0 5px 0", color: "#555" }}>
                    {p.bedrooms} bedroom{p.bedrooms !== 1 ? 's' : ''}
                  </p>
                  <p style={{ 
                    color: "#666", 
                    fontSize: "14px",
                    margin: "0 0 10px 0"
                  }}>
                     {p.location}
                  </p>
                  
                  {/* Action buttons */}
                  <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                    <Link 
                      to={`/property/${p.id}`}
                      className="view-details-btn"
                      style={{ textAlign: "center", textDecoration: "none" }}
                    >
                      View Details
                    </Link>
                    
                    <button 
                      className="remove-favourite-btn"
                      onClick={() => removeFavourite(p.id)}
                    >
                       Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Clear all button */}
            <div style={{ textAlign: "center" }}>
              <button
                className="clear-all-btn"
                onClick={clearFavourites}
                disabled={favourites.length === 0}
              >
                 Clear All Favourites
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default SearchPage;