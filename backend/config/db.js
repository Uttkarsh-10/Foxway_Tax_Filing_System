const mysql = require("mysql2");
require("dotenv").config();

const db = mysql.createConnection({
    uri: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    }
});

db.connect((err) => {
    if (err) {
        console.error("DB Connection Failed ❌", err);
    } else {
        console.log("Connected to MySQL ✅");
    }
});

module.exports = db;