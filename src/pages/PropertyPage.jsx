import { useParams } from "react-router-dom";
import { useState } from "react";
import data from "../data/properties.json";

import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";

function PropertyPage() {
  const { id } = useParams();
  const property = data.properties.find((p) => p.id === String(id));

  if (!property) {
    return <h2>Property not found</h2>;
  }

  const images = property.images ?? [property.picture];
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>{property.type}</h1>

      <Tabs>
        <TabList>
          <Tab>Description</Tab>
          <Tab>Floor Plan</Tab>
          <Tab>Map</Tab>
        </TabList>

        {/* DESCRIPTION */}
        <TabPanel>
          <p>{property.description}</p>
          <p>Bedrooms: {property.bedrooms}</p>
          <p>Price: £{property.price}</p>
          <p>{property.location}</p>

          {/* Main Image with Navigation Buttons */}
          <div style={{ position: "relative", display: "inline-block" }}>
            <img
              src={images[currentImageIndex]}
              alt="Main"
              style={{
                width: "100%",
                maxWidth: "600px",
                marginBottom: "10px",
              }}
            />
            
            {/* Navigation buttons  shows if multiple images */}
            {images.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  style={{
                    position: "absolute",
                    left: "10px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    background: "rgba(0,0,0,0.6)",
                    color: "white",
                    border: "none",
                    width: "40px",
                    height: "40px",
                    borderRadius: "50%",
                    fontSize: "20px",
                    cursor: "pointer"
                  }}
                >
                  ‹
                </button>
                
                <button
                  onClick={nextImage}
                  style={{
                    position: "absolute",
                    right: "10px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    background: "rgba(0,0,0,0.6)",
                    color: "white",
                    border: "none",
                    width: "40px",
                    height: "40px",
                    borderRadius: "50%",
                    fontSize: "20px",
                    cursor: "pointer"
                  }}
                >
                  ›
                </button>
                
                {/* Image counter */}
                <div style={{
                  position: "absolute",
                  bottom: "20px",
                  right: "10px",
                  background: "rgba(0,0,0,0.6)",
                  color: "white",
                  padding: "5px 10px",
                  borderRadius: "10px",
                  fontSize: "14px"
                }}>
                  {currentImageIndex + 1} / {images.length}
                </div>
              </>
            )}
          </div>

          {/* Thumbnails */}
          <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", marginTop: "10px" }}>
            {images.map((img, index) => (
              <img
                key={index}
                src={img}
                alt="Thumbnail"
                style={{
                  width: "100px",
                  cursor: "pointer",
                  border: index === currentImageIndex ? "3px solid blue" : "1px solid #ccc",
                  borderRadius: "3px"
                }}
                onClick={() => setCurrentImageIndex(index)}
              />
            ))}
          </div>
        </TabPanel>

        {/* FLOOR PLAN */}
        <TabPanel>
          <h3>Floor Plan</h3>
          
          {property.floorPlan ? (
            <div style={{ textAlign: 'center', padding: '20px' }}>
              <img
                src={property.floorPlan}
                alt="Property floor plan"
                style={{
                  maxWidth: '100%',
                  height: 'auto',
                  maxHeight: '500px',
                  border: '1px solid #ddd',
                  borderRadius: '5px'
                }}
              />
            </div>
          ) : (
            <div style={{ 
              padding: '40px', 
              background: '#f5f5f5', 
              borderRadius: '5px',
              textAlign: 'center'
            }}>
              <p>Floor plan image to be added</p>
            </div>
          )}
        </TabPanel>

        {/* MAP */}
        <TabPanel>
          <iframe
            title="map"
            width="100%"
            height="300"
            src={`https://maps.google.com/maps?q=${property.location}&output=embed`}
          />
        </TabPanel>
      </Tabs>
    </div>
  );
}

export default PropertyPage;