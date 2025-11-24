import React, { useEffect, useState } from 'react';
import axios from 'axios';
import RestaurantCard from './components/RestaurantCard';
import SearchBar from './components/SearchBar';
import Filter from './components/Filter';

interface Restaurant {
  _id: string;
  name: string;
  cuisine: string;
  rating: number;
  imageUrl?: string;
  address?: string;
}

interface MenuItem {
  id: string;
  name: string;
  price: number;
  desc?: string;
}

const App: React.FC = () => {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [search, setSearch] = useState('');
  const [cuisine, setCuisine] = useState('');
  const [minRating, setMinRating] = useState<number>(0);
  const [loading, setLoading] = useState(false);

  // modal state
  const [selectedRestaurant, setSelectedRestaurant] = useState<Restaurant | null>(null);
  const [selectedMenu, setSelectedMenu] = useState<MenuItem[] | null>(null);

  useEffect(() => {
    const fetchRestaurants = async () => {
      setLoading(true);
      try {
        const res = await axios.get('http://localhost:5000/restaurants', {
          params: { search, cuisine, minRating }
        });
        setRestaurants(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchRestaurants();
  }, [search, cuisine, minRating]);

  // Menu
  const makeSampleMenu = (r: Restaurant): MenuItem[] => {
    const base: MenuItem[] = [
      { id: 'm1', name: `${r.cuisine} Special`, price: 199, desc: 'House specialty' },
      { id: 'm2', name: 'Chef\'s Salad', price: 149, desc: 'Fresh greens & toppings' },
      { id: 'm3', name: 'Signature Dessert', price: 99, desc: 'Sweet finish' },
    ];
    // Add extra item
    const add = (r.name.length % 3 === 0) ? [{ id: 'm4', name: 'Extra Dish', price: 129 }] : [];
    return [...base, ...add];
  };

  // called by card -> opens menu modal
  const handleViewMenu = (id?: string) => {
    const r = restaurants.find(x => x._id === id) || null;
    setSelectedRestaurant(r);
    setSelectedMenu(r ? makeSampleMenu(r) : null);
  };

  // order handler
  const handleOrder = (id?: string) => {
    const r = restaurants.find(x => x._id === id) || selectedRestaurant;
    if (!r) {
      alert('Please select a restaurant to order from.');
      return;
    }
    
    alert(`Order placed!\nRestaurant: ${r.name}\nWe will contact you for delivery .`);
    
    setSelectedRestaurant(null);
    setSelectedMenu(null);
  };

  const closeModal = () => {
    setSelectedRestaurant(null);
    setSelectedMenu(null);
  };

  // aesthetic logo 
  const logoUrl = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQakB6tvru_NoG_M1rt-DF1cF8pOIkjapOF1Q&s';

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(180deg, #FFF7F3 0%, #FFFDFB 100%)',
      padding: 24,
      fontFamily: '"Inter", system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial'
    }}>
      <header style={{
        display: 'flex',
        alignItems: 'center',
        gap: 14,
        marginBottom: 18
      }}>
        <img src={logoUrl} alt="BiteBloom logo" style={{ width: 56, height: 56, borderRadius: 10, objectFit: 'cover', boxShadow: '0 6px 18px rgba(0,0,0,0.08)' }} />
        <div>
          <h1 style={{ margin: 0, fontSize: 22, color: '#ff4b4b' }}>BiteBloom</h1>
          <p style={{ margin: 0, fontSize: 13, color: '#666' }}>Discover local restaurants, live search & order</p>
        </div>
      </header>

      <div style={{ display: 'flex', gap: 18, alignItems: 'center', marginBottom: 18, flexWrap: 'wrap' }}>
        <SearchBar search={search} setSearch={setSearch} />
        <Filter cuisine={cuisine} setCuisine={setCuisine} minRating={minRating} setMinRating={setMinRating} />
      </div>

      <main>
        {loading ? (
          <p style={{ color: '#666' }}>Loading restaurants...</p>
        ) : restaurants.length === 0 ? (
          <p style={{ color: '#666' }}>No restaurants found. Try clearing filters or search terms.</p>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            {restaurants.map(r => (
              <RestaurantCard
                key={r._id}
                id={r._id}
                name={r.name}
                cuisine={r.cuisine}
                rating={r.rating}
                imageUrl={r.imageUrl}
                address={r.address}
                onViewMenu={handleViewMenu}
                onOrder={() => handleOrder(r._id)}
              />
            ))}
          </div>
        )}
      </main>

      {/* Menu Modal */}
      {selectedRestaurant && selectedMenu && (
        <div style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(0,0,0,0.5)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 1000
        }}>
          <div style={{ background: 'white', borderRadius: 12, width: '90%', maxWidth: 560, padding: 18 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <h2 style={{ margin: 0 }}>{selectedRestaurant.name}</h2>
                <p style={{ margin: 0, color: '#666' }}>{selectedRestaurant.cuisine} • {selectedRestaurant.address}</p>
              </div>
              <button onClick={closeModal} style={{ border: 'none', background: 'transparent', fontSize: 18, cursor: 'pointer' }}>✕</button>
            </div>

            <div style={{ marginTop: 12 }}>
              <h3 style={{ marginBottom: 8 }}>Menu</h3>
              <ul style={{ paddingLeft: 18 }}>
                {selectedMenu.map(mi => (
                  <li key={mi.id} style={{ marginBottom: 8, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <div style={{ fontWeight: 600 }}>{mi.name}</div>
                      {mi.desc && <div style={{ fontSize: 13, color: '#666' }}>{mi.desc}</div>}
                    </div>
                    <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                      <div style={{ fontWeight: 700 }}>₹{mi.price}</div>
                      <button onClick={() => { alert(`Ordered ${mi.name} from ${selectedRestaurant.name} (demo)`); closeModal(); }}
                        style={{ padding: '6px 10px', borderRadius: 8, border: 'none', background: 'linear-gradient(90deg,#ff8a66,#ff4b4b)', color: 'white', cursor: 'pointer' }}>
                        Order
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8, marginTop: 12 }}>
              <button onClick={() => { handleOrder(selectedRestaurant._id); }} style={{ padding: '8px 12px', borderRadius: 8, border: 'none', background: 'linear-gradient(90deg,#ff8a66,#ff4b4b)', color: 'white', cursor: 'pointer' }}>
                Order from {selectedRestaurant.name}
              </button>
              <button onClick={closeModal} style={{ padding: '8px 12px', borderRadius: 8, border: '1px solid rgba(0,0,0,0.08)', background: 'white', cursor: 'pointer' }}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
