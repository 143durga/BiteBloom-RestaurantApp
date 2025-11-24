import React from 'react';

interface Props {
  id?: string;
  name: string;
  cuisine: string;
  rating: number;
  imageUrl?: string;
  address?: string;
  onViewMenu?: (id?: string) => void;
  onOrder?: (id?: string) => void;
}

const RestaurantCard: React.FC<Props> = ({ id, name, cuisine, rating, imageUrl, address, onViewMenu, onOrder }) => {
  return (
    <div style={{
      display: 'flex',
      gap: '12px',
      alignItems: 'center',
      background: 'linear-gradient(180deg, rgba(255,255,255,0.95), rgba(255,250,245,0.95))',
      borderRadius: 12,
      padding: 12,
      boxShadow: '0 6px 18px rgba(0,0,0,0.06)',
      border: '1px solid rgba(255,100,50,0.06)',
      width: '100%',
      maxWidth: 760,
      marginBottom: 12,
    }}>
      <img
        src={imageUrl || 'https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg'}
        alt={name}
        style={{ width: 140, height: 100, objectFit: 'cover', borderRadius: 10, flexShrink: 0 }}
      />
      <div style={{ flex: 1 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <h3 style={{ margin: 0, fontSize: 18 }}>{name}</h3>
          <div style={{
            background: 'linear-gradient(90deg,#ff7a59,#ff3d3d)',
            color: 'white',
            padding: '6px 10px',
            borderRadius: 8,
            fontWeight: 700,
            fontSize: 14,
            boxShadow: '0 4px 12px rgba(255,61,61,0.16)'
          }}>
            ★ {rating.toFixed(1)}
          </div>
        </div>
        <p style={{ margin: '6px 0 2px', color: '#666' }}>{cuisine} • {address || 'Address not specified'}</p>
        <div style={{ marginTop: 8 }}>
          <button
            onClick={() => onViewMenu && onViewMenu(id)}
            style={{
              padding: '8px 12px',
              borderRadius: 8,
              border: 'none',
              background: 'white',
              boxShadow: 'inset 0 0 0 1px rgba(0,0,0,0.06)',
              cursor: 'pointer',
              marginRight: 8
            }}>
            View Menu
          </button>
          <button
            onClick={() => onOrder && onOrder(id)}
            style={{
              padding: '8px 12px',
              borderRadius: 8,
              border: 'none',
              background: 'linear-gradient(90deg,#ff8a66,#ff4b4b)',
              color: 'white',
              cursor: 'pointer'
            }}>
            Order Online
          </button>
        </div>
      </div>
    </div>
  );
};

export default RestaurantCard;
