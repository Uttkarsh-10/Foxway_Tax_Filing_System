import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import axiosInstance from "../api/axiosInstance";

function Corporate() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    companyName: "",
    cin: "",
    revenue: "",
    expenses: "",
    taxType: "standard"
  });

  const [result, setResult] = useState("");

  const handleChange = (e) => {
    const { id, value } = e.target;

    // 🔥 Convert numbers properly
    if (id === "revenue" || id === "expenses") {
      setForm({ ...form, [id]: value === "" ? "" : Number(value) });
    } else {
      setForm({ ...form, [id]: value });
    }
  };

  const calculateTax = async () => {
    const { companyName, cin, revenue, expenses, taxType } = form;

    // 🔒 Validation
    if (!companyName || !cin || !revenue || !expenses) {
      alert("Please fill all fields!");
      return;
    }

    const profit = revenue - expenses;

    if (profit < 0) {
      alert("Expenses cannot exceed revenue!");
      return;
    }

    try {
      const res = await axiosInstance.post("/api/corporate/calculate", {
        companyName,
        cin,
        revenue,
        expenses,
        profit,
        taxType,
      });

      // Axios already parses JSON
      const data = res.data;

      setResult(`Profit: ₹ ${profit} | Tax: ₹ ${data.tax}`);
    } catch (error) {
      console.error(error);
      alert("Failed to connect to server!");
    }
  };

  return (
    <>
      <Header title="🏢 Corporate Tax Filing" />

      <div className="back-btn-container">
        <button onClick={() => navigate("/")}>⬅ Back</button>
      </div>

      <div className="container">
        <div className="input-card">

          <h2>Company Details</h2>

          <input
            id="companyName"
            placeholder="Company Name"
            onChange={handleChange}
          />

          <input
            id="cin"
            placeholder="CIN Number"
            onChange={handleChange}
          />

          <input
            id="revenue"
            type="number"
            placeholder="Total Revenue (₹)"
            onChange={handleChange}
          />

          <input
            id="expenses"
            type="number"
            placeholder="Total Expenses (₹)"
            onChange={handleChange}
          />

          <select id="taxType" onChange={handleChange}>
            <option value="standard">Standard (25%)</option>
            <option value="startup">Startup (15%)</option>
          </select>

          <button onClick={calculateTax}>Calculate Tax</button>

          {result && <h3>{result}</h3>}

        </div>
      </div>
    </>
  );
}

export default Corporate;