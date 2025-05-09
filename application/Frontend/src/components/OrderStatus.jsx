// src/components/OrderStatus.jsx
import React, { useState, useEffect } from 'react';
import Header from './Header';
import { useNavigate } from 'react-router-dom';
import '../OrderStatus.css';

const OrderStatusPage = () => {
  const navigate = useNavigate();
  const [orders, setOrders]     = useState([]);
  const [loading, setLoading]   = useState(true);
  const [error, setError]       = useState(null);

  // useEffect(() => {
  //   fetch('http://localhost:3001/api/orders/status', { credentials: 'include' })
  //     .then(res => {
  //       if (!res.ok) throw new Error(`Status ${res.status}`);
  //       return res.json();
  //     })
  //     .then(data => setOrders(data))
  //     .catch(err => setError(err.message))
  //     .finally(() => setLoading(false));
  // }, []);

  // if (loading) return <p className="os-loading">Loading…</p>;
  // if (error)   return <p className="os-error">Error: {error}</p>;

  return (
    <div className="os-page">
      <Header />
      <div className="os-content">
        <div className="os-header">
          <button
            className="os-back-btn"
            onClick={() => navigate('/RealUserProfile')}
          >
            ← Back to Profile
          </button>
          <h1 className="os-heading">Orders Status</h1>
        </div>

        {orders.length === 0 ? (
          <p className="os-empty">No active orders.</p>
        ) : (
          <div className="os-list">
            {orders.map(o => (
              <div className="os-card" key={o.id}>
                <div
                  className="os-thumb"
                  style={{
                    backgroundImage: `url(${o.thumbnailUrl})`,
                    backgroundSize: 'cover',
                  }}
                />
                <div className="os-info">
                  <h2 className="os-title">{o.title}</h2>
                  <p className="os-eta">E.T.A. : {new Date(o.eta).toLocaleString()}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderStatusPage;
