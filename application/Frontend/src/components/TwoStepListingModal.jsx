import React, { useState } from 'react';
import CreateListingForm from './CreateListingForm';
import ExistingProductForm from './ExistingProductForm';


const TwoStepListingModal = ({ onClose }) => {
  const [step, setStep] = useState(1);

  const handleNewProductClick = () => {
    setStep(2);
  };

  const handleExistingProductClick = () => {
    setStep(3);
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
              <div className="card" onClick={handleExistingProductClick}>
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

            {step === 3 && (
            <ExistingProductForm onClose={onClose} />
            )}
        </div>
    </div>

  );
};

export default TwoStepListingModal;
