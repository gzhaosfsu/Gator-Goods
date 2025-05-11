import React, { useState } from 'react';
import CreateListingForm from './CreateListingForm'; // your actual listing form

const TwoStepListingModal = ({ onClose }) => {
  const [step, setStep] = useState(1);

  const handleNewProductClick = () => {
    setStep(2);
  };

  return (
    <div className="modal-overlay">
    <div className="modal-content">
        <button className="close-btn" onClick={onClose}>&times;</button>
        
        <section className="section">
        <div className="section-inner">
        {step === 1 && (
            <>
            <h2 className="section-title overview-title">Create New Listing</h2>
            <div className="card-grid">
                <div className="card" onClick={handleNewProductClick}>
                    <span className="card-title">New Product</span>
                </div>
            <div className="card">
                <span className="card-title">Existing Product</span>
            </div>
            </div>
            </>
        )}
            
        </div>
        </section>

            {step === 2 && (
            <CreateListingForm onClose={onClose} />
            )}
        </div>
    </div>

  );
};

export default TwoStepListingModal;
