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
  
        // 1) fetch all delivery_requests for this buyer
        const reqRes = await fetch(`/api/delivery_request`, { credentials: 'include' });
        if (!reqRes.ok) throw new Error('Failed to fetch delivery requests');
        const allRequests = await reqRes.json();
        const myRequests = allRequests.filter(r => r.buyer_id === user.user_id);
  
        // 2) fetch all delivery_instructions, then filter to this buyer
        const instRes = await fetch(`/api/delivery_instruction`, { credentials: 'include' });
        if (!instRes.ok) throw new Error('Failed to fetch delivery instructions');
        const allInst = await instRes.json();
        const myInst  = allInst.filter(i => i.buyer_id === user.user_id);
  
        // 3) enrich each request with product + “true” delivery_status
        const finalOrders = await Promise.all(
          myRequests.map(async r => {
            // fetch listing→product as before
            let title = '(Unknown)', thumbnail = null;
            try {
              const L = await fetch(`/api/listing/${r.listing_id}`);
              const p = (await L.json())[0] || {};
              title = p.title; thumbnail = p.thumbnail;
            } catch {}
            
            // overlay the “real” status if an instruction exists
            const inst = myInst.find(i => i.listing_id === r.listing_id);
            // fall back to the request’s own .status if none yet
            const status = inst?.delivery_status || r.status || 'Pending';
  
            return {
              ...r,
              product_title: title,
              product_image: thumbnail,
              delivery_status: status
            };
          })
        );
  
        if (!cancelled) setOrders(finalOrders);
      } catch (err) {
        if (!cancelled) setError(err);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };
  
    load();
    const interval = setInterval(load, 10_000);
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

                <p className="os-detail">
                  <strong>Drop-off:</strong> {o.dropoff}
                </p>

                <p className={`os-detail status ${o.delivery_status.replace(/\s+/g, '-')}`}>
                  <strong>Status:</strong> {o.delivery_status}
                </p>

                {o.buyer_special_request && (
                  <p className="os-detail">
                    <strong>Note:</strong> {o.buyer_special_request}
                  </p>
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