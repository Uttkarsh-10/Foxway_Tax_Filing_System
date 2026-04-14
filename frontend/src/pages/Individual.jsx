import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import axiosInstance from "../api/axiosInstance";

function Individual() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    pan: "",
    income: "",
    deductions: 0,
    regime: "new"
  });

  const [result, setResult] = useState("");

  const handleChange = (e) => {
    const { id, value } = e.target;

    // 🔥 Convert numeric fields properly
    if (id === "income" || id === "deductions") {
      setForm({ ...form, [id]: value === "" ? "" : Number(value) });
    } else {
      setForm({ ...form, [id]: value });
    }
  };

  const calculateTax = async () => {
    const { name, pan, income, deductions, regime } = form;

    // 🔒 Validation
    if (!name || !pan || !income) {
      alert("Please fill all required fields!");
      return;
    }

    if (income < 0 || deductions < 0) {
      alert("Values cannot be negative!");
      return;
    }

    try {
      const res = await axiosInstance.post("/api/individual/calculate", {
        name,
        pan,
        income,
        deductions,
        regime,
      });

      // Axios auto parses JSON
      const data = res.data;

      setResult(`Calculated Tax: ₹ ${data.tax}`);
    } catch (error) {
      console.error(error);

      if (error.response) {
        alert(error.response.data.message || "Server error");
      } else {
        alert("Error connecting to server!");
      }
    }
  };

  return (
    <>
      <Header title="👤 Individual Tax Filing" />

      {/* ✅ Single Back Button */}
      <div className="back-btn-container">
        <button onClick={() => navigate("/")}>⬅ Back</button>
      </div>

      <div className="container">
        <div className="input-card">

          <h2>Personal Details</h2>

          <input
            id="name"
            placeholder="Full Name"
            onChange={handleChange}
          />

          <input
            id="pan"
            placeholder="PAN Number"
            onChange={handleChange}
          />

          <input
            id="income"
            type="number"
            placeholder="Annual Income (₹)"
            onChange={handleChange}
          />

          <input
            id="deductions"
            type="number"
            placeholder="Deductions (₹)"
            onChange={handleChange}
          />

          <select id="regime" onChange={handleChange}>
            <option value="new">New Tax Regime</option>
            <option value="old">Old Tax Regime</option>
          </select>

          <button onClick={calculateTax}>Calculate Tax</button>

          {/* ✅ Show only when result exists */}
          {result && <h3>{result}</h3>}

        </div>
      </div>
    </>
  );
}

export default Individual;