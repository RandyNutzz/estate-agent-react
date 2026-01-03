import { useState } from "react";
import Select from 'react-select';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Form, Row, Col, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

// Search form component with React Widgets
function SearchForm({ onSearch }) {
  // State for all form fields
  const [type, setType] = useState({ value: 'Any', label: 'Any' });
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [minBeds, setMinBeds] = useState('');
  const [maxBeds, setMaxBeds] = useState('');
  const [postcode, setPostcode] = useState('');
  const [dateFrom, setDateFrom] = useState(null);
  const [dateTo, setDateTo] = useState(null);

  // Dropdown options
  const propertyTypes = [
    { value: 'Any', label: 'Any' },
    { value: 'House', label: 'House' },
    { value: 'Flat', label: 'Flat' },
    { value: 'Bungalow', label: 'Bungalow' }
  ];

  const bedOptions = [
    { value: '', label: 'Any' },
    { value: '1', label: '1+' },
    { value: '2', label: '2+' },
    { value: '3', label: '3+' },
    { value: '4', label: '4+' }
  ];

  // Handle search button click
  const handleSearch = () => {
    onSearch({
      type: type.value,
      minPrice,
      maxPrice,
      minBeds,
      maxBeds,
      postcode,
      dateFrom: dateFrom ? dateFrom.toISOString().split('T')[0] : '',
      dateTo: dateTo ? dateTo.toISOString().split('T')[0] : ''
    });
  };

  return (
    <Form className="search-widget-form">
      {/* First row of search criteria */}
      <Row>
        {/* Property type dropdown */}
        <Col md={6} lg={2}>
          <Form.Group className="mb-3">
            <Form.Label>Property Type</Form.Label>
            <Select
              options={propertyTypes}
              value={type}
              onChange={setType}
              placeholder="Select type..."
              isSearchable
            />
          </Form.Group>
        </Col>

        {/* Minimum price input */}
        <Col md={6} lg={2}>
          <Form.Group className="mb-3">
            <Form.Label>Min Price</Form.Label>
            <Form.Control
              type="number"
              placeholder="£ Min"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
              min="0"
              step="10000"
            />
          </Form.Group>
        </Col>

        {/* Maximum price input */}
        <Col md={6} lg={2}>
          <Form.Group className="mb-3">
            <Form.Label>Max Price</Form.Label>
            <Form.Control
              type="number"
              placeholder="£ Max"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
              min="0"
              step="10000"
            />
          </Form.Group>
        </Col>

        {/* Minimum bedrooms dropdown */}
        <Col md={6} lg={2}>
          <Form.Group className="mb-3">
            <Form.Label>Min Bedrooms</Form.Label>
            <Select
              options={bedOptions}
              value={bedOptions.find(opt => opt.value === minBeds) || bedOptions[0]}
              onChange={(opt) => setMinBeds(opt.value)}
              placeholder="Min beds"
            />
          </Form.Group>
        </Col>

        {/* Maximum bedrooms dropdown */}
        <Col md={6} lg={2}>
          <Form.Group className="mb-3">
            <Form.Label>Max Bedrooms</Form.Label>
            <Select
              options={bedOptions}
              value={bedOptions.find(opt => opt.value === maxBeds) || bedOptions[0]}
              onChange={(opt) => setMaxBeds(opt.value)}
              placeholder="Max beds"
            />
          </Form.Group>
        </Col>

        {/* Postcode input */}
        <Col md={6} lg={2}>
          <Form.Group className="mb-3">
            <Form.Label>Postcode Area</Form.Label>
            <Form.Control
              type="text"
              placeholder="e.g., BR5"
              value={postcode}
              onChange={(e) => setPostcode(e.target.value.toUpperCase())}
              maxLength="4"
            />
          </Form.Group>
        </Col>
      </Row>

      {/* Second row: Date filters */}
      <Row>
        {/* Date from picker */}
        <Col md={6}>
          <Form.Group className="mb-3">
            <Form.Label>Date From</Form.Label>
            <DatePicker
              selected={dateFrom}
              onChange={(date) => setDateFrom(date)}
              selectsStart
              startDate={dateFrom}
              endDate={dateTo}
              placeholderText="Select start date"
              className="form-control"
              dateFormat="dd/MM/yyyy"
              isClearable
            />
          </Form.Group>
        </Col>

        {/* Date to picker */}
        <Col md={6}>
          <Form.Group className="mb-3">
            <Form.Label>Date To</Form.Label>
            <DatePicker
              selected={dateTo}
              onChange={(date) => setDateTo(date)}
              selectsEnd
              startDate={dateFrom}
              endDate={dateTo}
              minDate={dateFrom}
              placeholderText="Select end date"
              className="form-control"
              dateFormat="dd/MM/yyyy"
              isClearable
            />
          </Form.Group>
        </Col>
      </Row>

      {/* Action buttons */}
      <div className="text-center">
        {/* Search button */}
        <Button 
          variant="primary" 
          onClick={handleSearch}
          size="lg"
          className="px-5"
        >
           Search Properties
        </Button>
        
        {/* Clear filters button */}
        <Button 
          variant="outline-secondary" 
          onClick={() => {
            setType({ value: 'Any', label: 'Any' });
            setMinPrice('');
            setMaxPrice('');
            setMinBeds('');
            setMaxBeds('');
            setPostcode('');
            setDateFrom(null);
            setDateTo(null);
          }}
          className="ms-3"
        >
          Clear Filters
        </Button>
      </div>
    </Form>
  );
}

export default SearchForm;