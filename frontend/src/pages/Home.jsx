import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Modal from "../components/Modal";

function Home() {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  // 🔒 Prevent background scroll when modal is open
  useEffect(() => {
    if (showModal) {
      document.body.classList.add("modal-open");
    } else {
      document.body.classList.remove("modal-open");
    }
  }, [showModal]);

  return (
    <>
      <Header
        title="Foxway Tax Filing System"
        subtitle="Select your Tax Filing category"
      />

      <div className="home-container">
        <div className="card">
          <h2>👤 Individual Tax Filing</h2>
          <p>File taxes based on your personal income.</p>
          <button onClick={() => navigate("/individual")}>Proceed</button>
        </div>

        <div className="card">
          <h2>🏢 Corporate Tax Filing</h2>
          <p>Calculate and file business taxes.</p>
          <button onClick={() => navigate("/corporate")}>Proceed</button>
        </div>

        <div className="card">
          <h2>📊 View Records</h2>
          <p>Check all saved tax records.</p>
          <button onClick={() => navigate("/records")}>
            View Records
          </button>
        </div>
      </div>

      {/* ✅ Info Button (ONLY ONCE) */}
      <button
        className="info-btn"
        onClick={() => setShowModal(true)}
      >
        ℹ Info
      </button>

      {/* ✅ Modal */}
      {showModal && (
        <Modal onClose={() => setShowModal(false)} />
      )}

      <Footer />
    </>
  );
}

export default Home;