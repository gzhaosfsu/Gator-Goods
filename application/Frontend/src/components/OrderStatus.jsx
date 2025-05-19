import React, { useState, useEffect, useContext } from 'react';
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
    if (!user?.user_id) return;
    let cancelled = false;
  
    const load = async () => {
      try {
        setLoading(true);
  
        // 1) fetch everything
        const res = await fetch(`/api/delivery_request`, { credentials: 'include' });
        if (!res.ok) throw new Error('Failed to fetch delivery requests');
        const allOrders = await res.json();
  
        // 2) filter for this user’s orders
        const userOrders = allOrders.filter(o => o.buyer_id === user.user_id);
  
        // 3) enrich only those
        const enriched = await Promise.all(
          userOrders.map(async o => {
            try {
              const listingRes = await fetch(`/api/listing/${o.listing_id}`);
              const listingData = await listingRes.json();
              const product = Array.isArray(listingData) ? listingData[0] : listingData;
              return {
                ...o,
                product_title: product?.title || '(Unknown Product)',
                product_image: product?.thumbnail || null,
                delivery_status: o.status || 'Pending'
              };
            } catch {
              return { ...o, product_title: '(Unknown Product)', product_image: null };
            }
          })
        );
  
        if (!cancelled) setOrders(enriched);
      } catch (err) {
        if (!cancelled) setError(err);
      } finally {
        if (!cancelled) setLoading(false);
      }
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
              <div className="os-thumb">
                {o.product_image ? (
                  <img src={o.product_image} alt={o.product_title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                ) : (
                  <div className="no-image">No Image</div>
                )}
              </div>
              <div className="os-info">
                <h2 className="os-title">{o.product_title}</h2>
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