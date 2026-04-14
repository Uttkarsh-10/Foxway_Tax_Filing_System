import { useEffect } from "react";

function Modal({ onClose }) {

  // 🔒 Prevent background scroll
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <div className="modal" onClick={onClose}>
      
      <div 
        className="modal-content" 
        onClick={(e) => e.stopPropagation()}
      >

        {/* ❌ Close Button */}
        <button className="close-btn" onClick={onClose}>×</button>

        <h2 className="modal-title">Tax Regime Information (FY 2026-27)</h2>
        <hr />

        {/* 🔹 Regime Section */}
        <div className="regime-container">

          <div className="regime-box">
            <h3>New Tax Regime (Default)</h3>
            <ul>
              <li><strong>0% Tax:</strong> Up to ₹4,00,000</li>
              <li><strong>Standard Deduction:</strong> ₹75,000</li>
              <li><strong>Rebate (87A):</strong> Nil tax up to ₹12,00,000</li>
              <li><strong>Benefit:</strong> Lower rates, no investment required</li>
            </ul>
          </div>

          <div className="regime-box">
            <h3>Old Tax Regime</h3>
            <ul>
              <li><strong>0% Tax:</strong> Up to ₹2,50,000</li>
              <li><strong>Standard Deduction:</strong> ₹50,000</li>
              <li><strong>Deductions:</strong> 80C, 80D, HRA, etc.</li>
              <li><strong>Benefit:</strong> Best for high investments</li>
            </ul>
          </div>

        </div>

        {/* 🔹 Age Based Section */}
        <h3 className="section-title">Age-Based Tax Benefits (Old Regime)</h3>

        <div className="regime-container">

          <div className="regime-box">
            <h4>👤 Below 60 Years</h4>
            <ul>
              <li>Basic Exemption: ₹2,50,000</li>
              <li>Standard slab rates apply</li>
            </ul>
          </div>

          <div className="regime-box">
            <h4>👴 Senior Citizen (60–80)</h4>
            <ul>
              <li>Basic Exemption: ₹3,00,000</li>
              <li>Higher interest income exemption</li>
              <li>Medical deductions available (80D)</li>
            </ul>
          </div>

          <div className="regime-box">
            <h4>👵 Super Senior (80+)</h4>
            <ul>
              <li>Basic Exemption: ₹5,00,000</li>
              <li>No advance tax required</li>
              <li>Higher medical deduction benefits</li>
            </ul>
          </div>

        </div>

        {/* 🔹 Retired Individuals */}
        <h3 className="section-title">Retired Individuals / Pensioners</h3>

        <div className="regime-box full-width">
          <ul>
            <li><strong>Pension:</strong> Treated as salary income</li>
            <li><strong>Standard Deduction:</strong> Available (₹50,000 / ₹75,000)</li>
            <li><strong>Interest Income:</strong> Exemption up to ₹50,000 (80TTB)</li>
            <li><strong>No Advance Tax:</strong> If no business income</li>
            <li><strong>Medical Benefits:</strong> Higher deduction under 80D</li>
          </ul>
        </div>

      </div>
    </div>
  );
}

export default Modal;