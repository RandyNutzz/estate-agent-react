// src/components/PropertyCard.jsx
import { Link } from "react-router-dom";
import { useState } from "react";

function PropertyCard({ property, onFavourite }) {
  const [imageError, setImageError] = useState(false);
  
  const handleDragStart = (e) => {
    e.dataTransfer.setData("property", JSON.stringify(property));
    e.dataTransfer.effectAllowed = "move";
  };

  const handleAddToFavourites = () => {
    if (onFavourite) {
      onFavourite(property);
    }
  };

  return (
    <div className="property-card" draggable="true" onDragStart={handleDragStart}>
      {property.images && property.images.length > 0 && !imageError ? (
        <img 
          src={property.images[0]} 
          alt={property.type}
          className="property-image"
          onError={() => setImageError(true)}
        />
      ) : (
        <div className="property-image-placeholder">
          <span>No Image Available</span>
        </div>
      )}
      
      <h3>{property.type}</h3>
      <p className="property-price">£{property.price.toLocaleString()}</p>
      <p className="property-details">
        {property.bedrooms} bedroom{property.bedrooms !== 1 ? 's' : ''}
        {property.bathrooms && property.bathrooms > 0 && (
          <span>, {property.bathrooms} bathroom{property.bathrooms !== 1 ? 's' : ''}</span>
        )}
      </p>
      
      <div className="property-actions">
        <Link to={`/property/${property.id}`} className="view-details-btn">
          View Details
        </Link>
        
        {onFavourite && (
          <button className="add-favourite-btn" onClick={handleAddToFavourites}>
            Add to Favourites
          </button>
        )}
      </div>
      
      <p className="drag-hint">(Drag to add to favourites)</p>
    </div>
  );
}

export default PropertyCard;