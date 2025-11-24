import React from 'react';

interface Props {
  cuisine: string;
  setCuisine: (value: string) => void;
  minRating: number;
  setMinRating: (value: number) => void;
}

const Filter: React.FC<Props> = ({ cuisine, setCuisine, minRating, setMinRating }) => {
  return (
    <div style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
      <select
        value={cuisine}
        onChange={(e) => setCuisine(e.target.value)}
        style={{ padding: '8px 10px', borderRadius: 10, border: '1px solid rgba(0,0,0,0.08)' }}
      >
        <option value="">All Cuisines</option>
        <option value="Italian">Italian</option>
        <option value="Indian">Indian</option>
        <option value="Fast Food">Fast Food</option>
        <option value="Japanese">Japanese</option>
        <option value="Mexican">Mexican</option>
        <option value="Cafe">Cafe</option>
        <option value="Desserts">Desserts</option>
        <option value="Healthy">Healthy</option>
        <option value="Thai">Thai</option>
      </select>
      <label style={{ fontSize: 13, color: '#444' }}>
        Min Rating:
        <select
          value={minRating}
          onChange={(e) => setMinRating(Number(e.target.value))}
          style={{ marginLeft: 8, padding: '6px 8px', borderRadius: 8 }}
        >
          <option value={0}>All</option>
          <option value={4}>4.0+</option>
          <option value={4.5}>4.5+</option>
        </select>
      </label>
    </div>
  );
};

export default Filter;
