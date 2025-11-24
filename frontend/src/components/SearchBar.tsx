import React from 'react';

interface Props {
  search: string;
  setSearch: (value: string) => void;
}

const SearchBar: React.FC<Props> = ({ search, setSearch }) => {
  return (
    <input
      type="text"
      placeholder="Search restaurants..."
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      style={{
        padding: '10px 14px',
        width: 380,
        maxWidth: '100%',
        borderRadius: 10,
        border: '1px solid rgba(0,0,0,0.08)',
        boxShadow: '0 6px 18px rgba(0,0,0,0.03)',
        fontSize: 14
      }}
    />
  );
};
export default SearchBar;
