function SearchForm({ onSearch }) {
  const [type, setType] = useState("Any");
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(2000000);
  const [minBeds, setMinBeds] = useState(0);
  const [maxBeds, setMaxBeds] = useState(6);
  const [postcode, setPostcode] = useState("");

  return (
    <div>
      <select onChange={e => setType(e.target.value)}>
        <option>Any</option>
        <option>House</option>
        <option>Flat</option>
      </select>

      <input type="number" placeholder="Min Price" onChange={e => setMinPrice(e.target.value)} />
      <input type="number" placeholder="Max Price" onChange={e => setMaxPrice(e.target.value)} />

      <input type="number" placeholder="Min Beds" onChange={e => setMinBeds(e.target.value)} />
      <input type="number" placeholder="Max Beds" onChange={e => setMaxBeds(e.target.value)} />

      <input placeholder="Postcode" onChange={e => setPostcode(e.target.value.toUpperCase())} />

      <button onClick={() => onSearch({ type, minPrice, maxPrice, minBeds, maxBeds, postcode })}>
        Search
      </button>
    </div>
  );
}

export default SearchForm;
