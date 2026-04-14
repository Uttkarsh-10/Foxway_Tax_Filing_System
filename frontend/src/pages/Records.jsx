import { useState } from "react";
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../api/axiosInstance";

function Records() {
  const navigate = useNavigate();

  const [data, setData] = useState([]);
  const [type, setType] = useState("");
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [editData, setEditData] = useState({});

  // 🔄 Load Data
  const loadIndividuals = async () => {
    setLoading(true);
    try {
      const res = await axiosInstance.get("/api/individual/all");

      setData(res.data);
      setType("individual");
    } catch (error) {
      console.error(error);
      alert("Error loading individual records");
    } finally {
      setLoading(false);
    }
  };

  const loadCorporates = async () => {
    setLoading(true);
    try {
      const res = await axiosInstance.get("/api/corporate/all");

      setData(res.data);
      setType("corporate");
    } catch (error) {
      console.error(error);
      alert("Error loading corporate records");
    } finally {
      setLoading(false);
    }
  };

  // 🗑 DELETE
  const handleDelete = async (item) => {
    const id = type === "individual" ? item.pan : item.cin;

    if (!window.confirm("Are you sure you want to delete this record?")) return;

    try {
      const endpoint =
        type === "individual"
          ? `/api/individual/${id}`
          : `/api/corporate/${id}`;

      await axiosInstance.delete(endpoint);

      alert("✅ Record deleted");
      type === "individual" ? loadIndividuals() : loadCorporates();
    } catch (error) {
      console.error(error);
      alert("❌ Error deleting record");
    }
  };

  // ✏️ OPEN MODAL
  const handleUpdate = (item) => {
    setEditData(item);
    setShowModal(true);
  };

  // 📝 INPUT CHANGE
  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditData({ ...editData, [name]: value });
  };

  // 🔄 UPDATE API
  const updateRecord = async () => {
    try {
      const id = type === "individual" ? editData.pan : editData.cin;

      const endpoint =
        type === "individual"
          ? `/api/individual/${id}`
          : `/api/corporate/${id}`;

      const body =
        type === "individual"
          ? {
              name: editData.name,
              income: Number(editData.income),
              tax: Number(editData.tax),
            }
          : {
              company_name: editData.company_name,
              income: Number(editData.profit),
              tax: Number(editData.tax),
            };

      await axiosInstance.put(endpoint, body);

      alert("✅ Updated successfully");
      setShowModal(false);

      type === "individual" ? loadIndividuals() : loadCorporates();
    } catch (error) {
      console.error(error);
      alert("❌ Error updating record");
    }
  };

  return (
    <>
      <Header title="📊 Records" />

      <div className="back-btn-container">
        <button onClick={() => navigate("/")}>⬅ Back</button>
      </div>

      <div className="container">

        {/* Buttons */}
        <div style={{ textAlign: "center", marginBottom: "20px" }}>
          <div className="record-btn">
            <button onClick={loadIndividuals}>👤 Individuals</button>
            <button onClick={loadCorporates}>🏢 Corporates</button>
          </div>
        </div>

        {/* Loading */}
        {loading && <p>Loading...</p>}

        {/* Table */}
        {!loading && type && (
          <div className="card records-card">
            {data.length === 0 ? (
              <p style={{ textAlign: "center" }}>No Records Found</p>
            ) : (
              <table>
                <thead>
                  <tr>
                    {type === "individual" ? (
                      <>
                        <th>Name</th>
                        <th>PAN</th>
                        <th>Income</th>
                        <th>Tax</th>
                        <th>Actions</th>
                      </>
                    ) : (
                      <>
                        <th>Company</th>
                        <th>CIN</th>
                        <th>Profit</th>
                        <th>Tax</th>
                        <th>Actions</th>
                      </>
                    )}
                  </tr>
                </thead>

                <tbody>
                  {data.map((item) => (
                    <tr key={type === "individual" ? item.pan : item.cin}>
                      {type === "individual" ? (
                        <>
                          <td>{item.name}</td>
                          <td>{item.pan}</td>
                          <td>{item.income}</td>
                          <td>{item.tax}</td>
                        </>
                      ) : (
                        <>
                          <td>{item.company_name}</td>
                          <td>{item.cin}</td>
                          <td>{item.profit}</td>
                          <td>{item.tax}</td>
                        </>
                      )}

                      <td className="action-btn">
                        <button onClick={() => handleUpdate(item)}>Update</button>
                        <button onClick={() => handleDelete(item)}>Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}
      </div>

      {/* ✅ MODAL */}
      {showModal && (
        <div className="modal" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>

            <span className="close-btn" onClick={() => setShowModal(false)}>✖</span>

            <h2>Update Record</h2>

            {type === "individual" ? (
              <>
                <label>Full Name</label>
                <input name="name" value={editData.name || ""} onChange={handleEditChange} />

                <label>Income (₹)</label>
                <input name="income" type="number" value={editData.income || ""} onChange={handleEditChange} />

                <label>Tax (₹)</label>
                <input name="tax" type="number" value={editData.tax || ""} onChange={handleEditChange} />
              </>
            ) : (
              <>
                <label>Company Name</label>
                <input name="company_name" value={editData.company_name || ""} onChange={handleEditChange} />

                <label>Profit (₹)</label>
                <input name="profit" type="number" value={editData.profit || ""} onChange={handleEditChange} />

                <label>Tax (₹)</label>
                <input name="tax" type="number" value={editData.tax || ""} onChange={handleEditChange} />
              </>
            )}

            <div className="modal-actions">
              <button onClick={updateRecord}>Update</button>
              <button className="cancel-btn" onClick={() => setShowModal(false)}>Cancel</button>
            </div>

          </div>
        </div>
      )}
    </>
  );
}

export default Records;