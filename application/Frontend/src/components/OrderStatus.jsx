import React from 'react';
import Header from './Header';
import ReturnHome from './ReturnHome';
import '../OrderStatus.css';

const OrderStatusPage = () => {
  // hard-coded for now, later swap out with real data
  const dummy = [
    { title: 'Order Title', eta: '[ time stamp ]' },
    { title: 'Order Title', eta: '[ time stamp ]' },
  ];

  // Inline sub-component
  const OrderCard = ({ title, eta }) => (
    <div className="os-card">
      <div className="os-thumb" />
      <div className="os-info">
        <h2 className="os-title">{title}</h2>
        <p className="os-eta">E.T.A. : {eta}</p>
      </div>
    </div>
  );

  return (
    <div className="os-page">
      <Header />
      <div className="os-content">
        <ReturnHome />
        <h1 className="os-heading">Orders Status</h1>
        <div className="os-list">
          {dummy.map((o, i) => (
            <OrderCard key={i} {...o} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default OrderStatusPage;
