const db = require("../config/db");
const { calculateIndividualTax } = require("../utils/taxCalculator");

exports.calculateTax = (req, res) => {
    const { name, pan, income, deductions } = req.body;

    const taxableIncome = income - (deductions || 0);
    const tax = calculateIndividualTax(taxableIncome);

    const query = "INSERT INTO individuals (name, pan, income, tax) VALUES (?, ?, ?, ?)";

    db.query(query, [name, pan, income, tax], (err) => {
        if (err) return res.status(500).send(err);
        res.json({ tax });
    });
};

exports.getAll = (req, res) => {
    db.query("SELECT * FROM individuals", (err, result) => {
        if (err) return res.status(500).send(err);
        res.json(result);
    });
};

exports.delete = (req, res) => {
    const { pan } = req.params;

    db.query("DELETE FROM individuals WHERE pan = ?", [pan], (err) => {
        if (err) return res.status(500).send(err);
        res.json({ message: "Deleted successfully" });
    });
};

exports.update = (req, res) => {
    const { pan } = req.params;
    const { name, income, tax } = req.body;

    const sql = `
        UPDATE individuals 
        SET name = ?, income = ?, tax = ? 
        WHERE pan = ?
    `;

    db.query(sql, [name, income, tax, pan], (err, result) => {
        if (err) return res.status(500).send(err);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Record not found" });
        }

        res.json({ message: "Updated successfully" });
    });
};