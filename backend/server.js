const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/db");

const app = express();

// middleware
app.use(
    cors({
        origin: [
            "http://localhost:5173",
            "https://notesmanagementsystem.netlify.app"
        ],
        credentials: true,
    })
);

// app.options("(.*)", cors());


app.use(express.json());

// DB connection
connectDB(); 



// routes
app.get('/', (req, res) => {
    res.json({
        status: 'success',
        message: "notes-management-system is running",
    })
})
app.use("/api/notes", require("./routes/noteRoutes"));

const PORT = process.env.PORT || 5000;

// app.listen(PORT, () => {
//     console.log(`Server running on port ${PORT}`);
// });


module.exports = app;