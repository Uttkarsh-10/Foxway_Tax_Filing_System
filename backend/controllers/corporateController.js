const db = require("../config/db");
const { calculateCorporateTax } = require("../utils/taxCalculator");

exports.calculateTax = (req, res) => {
    const { companyName, cin, profit, taxType } = req.body;

    const tax = calculateCorporateTax(profit, taxType);

    const query = "INSERT INTO corporates (company_name, cin, profit, tax) VALUES (?, ?, ?, ?)";

    db.query(query, [companyName, cin, profit, tax], (err) => {
        if (err) return res.status(500).send(err);
        res.json({ tax });
    });
};

exports.getAll = (req, res) => {
    db.query("SELECT * FROM corporates", (err, result) => {
        if (err) return res.status(500).send(err);
        res.json(result);
    });
};

exports.delete = (req, res) => {
    const { cin } = req.params;

    db.query("DELETE FROM corporates WHERE cin = ?", [cin], (err) => {
        if (err) return res.status(500).send(err);
        res.json({ message: "Deleted successfully" });
    });
};

exports.update = (req, res) => {
    const { cin } = req.params;
    const { company_name, income, tax } = req.body;

    const sql = `
        UPDATE corporates 
        SET company_name = ?, income = ?, tax = ? 
        WHERE cin = ?
    `;

    db.query(sql, [company_name, income, tax, cin], (err, result) => {
        if (err) return res.status(500).send(err);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Record not found" });
        }

        res.json({ message: "Updated successfully" });
    });
};