// src/components/OrderStatus.jsx
import React, { useState, useEffect, useContext } from 'react';
import Header from './Header';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../UserContext';
import '../OrderStatus.css';

const OrderStatusPage = () => {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const [orders, setOrders]     = useState([]);
  const [loading, setLoading]   = useState(true);
  const [error, setError]       = useState(null);

  useEffect(() => {
    if (!user) return;
    let cancelled = false;

    const load = () => {
      setLoading(true);
      fetch(`/api/delivery_request/buyer/${user.user_id}`, { credentials: 'include' })
        .then(res => res.ok ? res.json() : Promise.reject(res.statusText))
        .then(data => {
          if (!cancelled) setOrders(data);
        })
        .catch(err => {
          if (!cancelled) setError(err);
        })
        .finally(() => {
          if (!cancelled) setLoading(false);
        });
    };

    load();
    const interval = setInterval(load, 10000);

    return () => {
      cancelled = true;
      clearInterval(interval);
    };
  }, [user]);

  if (loading) return <p className="os-loading">Loading…</p>;
  if (error)   return <p className="os-error">Error: {error}</p>;

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
          <h1 className="os-heading">Order Status</h1>
        </div>

        {orders.length === 0 ? (
          <p className="os-empty">No orders yet.</p>
        ) : (
          <div className="os-list">
            {orders.map(o => (
              <div className="os-card" key={o.delivery_request_id}>
                <div className="os-thumb" />
                <div className="os-info">
                  <h2 className="os-title">Order #{o.delivery_request_id}</h2>
                  <p className="os-detail"><strong>Drop-off:</strong> {o.dropoff}</p>
                  <p className="os-detail"><strong>Status:</strong> {o.delivery_status}</p>
                  {o.buyer_special_request && (
                    <p className="os-detail"><strong>Note:</strong> {o.buyer_special_request}</p>
                  )}
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
