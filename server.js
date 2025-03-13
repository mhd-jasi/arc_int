const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static("public")); // Serve static files (like HTML, CSS, JS)

// MySQL Connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root", // Change if you have a different username
  password: "", // Use your MySQL password
  database: "contact_db",
});

db.connect((err) => {
  if (err) {
    console.error("Database connection failed:", err);
    return;
  }
  console.log("✅ MySQL Connected...");
});

// ✅ ADD THIS ROUTE TO FIX "Cannot GET /"
app.get("/", (req, res) => {
  res.send("Welcome to the Contact Form API!");
});

// Handle Form Submission
app.post("/submit-contact", (req, res) => {
  const { name, email, phone, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: "Please fill all required fields!" });
  }

  const sql = "INSERT INTO contacts (name, email, phone, message) VALUES (?, ?, ?, ?)";
  db.query(sql, [name, email, phone, message], (err, result) => {
    if (err) {
      console.error("Error inserting data:", err);
      return res.status(500).json({ error: "Database error!" });
    }
    res.json({ success: true, message: "You have submitted successfully!" });
  });
});

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});

