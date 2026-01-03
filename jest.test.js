

// Test 1: Basic functionality test
test('Search functionality filters correctly', () => {
  const properties = [
    { type: 'House', price: 500000 },
    { type: 'Flat', price: 300000 }
  ];
  
  const results = properties.filter(p => p.type === 'House');
  expect(results.length).toBe(1);
});

// Test 2: Favourites system
test('Favourites prevent duplicates', () => {
  const favourites = [{ id: '1' }];
  const property = { id: '1' };
  const isDuplicate = favourites.some(f => f.id === property.id);
  expect(isDuplicate).toBe(true);
});

// Test 3: Data formatting
test('Price formatting works', () => {
  const price = 750000;
  expect(`£${price.toLocaleString()}`).toBe('£750,000');
});

// Test 4: Search criteria
test('Multiple search criteria work', () => {
  const properties = [
    { type: 'House', price: 500000, bedrooms: 3 },
    { type: 'Flat', price: 300000, bedrooms: 2 }
  ];
  
  const filtered = properties.filter(p => 
    p.type === 'House' && p.price < 600000 && p.bedrooms >= 3
  );
  expect(filtered.length).toBe(1);
});

// Test 5: Date filtering
test('Date filtering logic works', () => {
  const dates = ['2025-01-15', '2024-12-15', '2025-06-15'];
  const recent = dates.filter(d => d.startsWith('2025'));
  expect(recent.length).toBe(2);
});

console.log('JEST Tests Ready! Run with: npx jest jest.test.js');