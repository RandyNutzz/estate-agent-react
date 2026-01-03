import { Link } from "react-router-dom";

// Component to display a single property card
function PropertyCard({ property, onFavourite }) {
  // Handle dragging property for adding to favourites
  const handleDragStart = (e) => {
    e.dataTransfer.setData("property", JSON.stringify(property));
    e.dataTransfer.effectAllowed = "move";
  };

  // Handle clicking the add to favourites button
  const handleAddToFavourites = () => {
    if (onFavourite) {
      onFavourite(property);
    }
  };

  return (
    <div
      className="property-card"
      draggable="true"
      onDragStart={handleDragStart}
    >
      {/* Display property image if available */}
      {property.images && property.images.length > 0 && (
        <img 
          src={property.images[0]} 
          alt={property.type}
          className="property-image"
        />
      )}
      
      {/* Property information */}
      <h3 style={{ margin: "0 0 5px 0", color: "#333" }}>{property.type}</h3>
      <p className="property-price">£{property.price.toLocaleString()}</p>
      <p style={{ margin: "0 0 5px 0", color: "#555" }}>
        🛏️ {property.bedrooms} bedroom{property.bedrooms !== 1 ? 's' : ''}
      </p>
      
      {/* Action buttons */}
      <div style={{ display: "flex", justifyContent: "space-between", gap: "10px" }}>
        {/* Link to property details page */}
        <Link 
          to={`/property/${property.id}`}
          className="view-details-btn"
          style={{ textAlign: "center", textDecoration: "none" }}
        >
          View Details
        </Link>
        
        {/* Button to add property to favourites */}
        {onFavourite && (
          <button 
            className="add-favourite-btn"
            onClick={handleAddToFavourites}
          >
            ⭐ Add to Favourites
          </button>
        )}
      </div>
      
      {/* Drag hint for users */}
      <p style={{ 
        textAlign: "center", 
        fontSize: "12px", 
        color: "#888",
        marginTop: "10px",
        marginBottom: "0"
      }}>
        (Drag to add to favourites)
      </p>
    </div>
  );
}

export default PropertyCard;