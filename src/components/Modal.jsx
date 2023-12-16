import React from 'react';

export default function Modal({ isOpen, onClose, children }) {
  const handleModalClick = (e) => {
    e.stopPropagation();
  };

  return (
    <div className={`modal ${isOpen ? 'show' : ''}`} tabIndex="-1" role="dialog" style={{ display: isOpen ? 'block' : 'none' }} onClick={onClose}>
      <div className="modal-dialog modal-lg" onClick={handleModalClick}>
        <div className="modal-content px-4">
          <div className="modal-header">
            <button type="button" className="btn-close" aria-label="Close" onClick={onClose}></button>
          </div>
          <div className="modal-body">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
