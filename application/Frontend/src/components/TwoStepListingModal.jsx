import React, { useState } from 'react';
import CreateListingForm from './CreateListingForm';
import ExistingProductForm from './ExistingProductForm';
import "../TwoStepListingModal.css"

const TwoStepListingModal = ({ onClose }) => {
  const [step, setStep] = useState(1);

  const handleNewProductClick = () => setStep(2);
  const handleExistingProductClick = () => setStep(3);

  return (
    <div className="modal-overlay">
      {/* <div className="modal-content"> */}
        <button className="close-btn" onClick={onClose}>&times;</button>

        {step === 1 && (
          <div className="modal-form">
            <button className="close-btn" onClick={onClose}>&times;</button>
            <h2>Create New Listing</h2>
            <br />
            <div className="step-buttons">
              <button onClick={handleNewProductClick}>New Product</button>
              <button onClick={handleExistingProductClick}>Existing Product</button>
            </div>
          </div>
        )}

        {step === 2 && <CreateListingForm onClose={onClose} />}
        {step === 3 && <ExistingProductForm onClose={onClose} />}
      {/* </div> */}
    </div>
  );
};

export default TwoStepListingModal;
