const express = require("express");
const fetch = require("node-fetch");
const cors = require("cors");
require("dotenv").config({ path: '.env.development' });

const app = express();
const port = process.env.PORT || 3000;

// Allow CORS from any origin
app.use(cors());

// Unsplash API relay route
app.get("/api/search", async (req, res) => {
  try {
    const { count = 10 } = req.query;
    const baseUrl = 'https://api.unsplash.com/photos/random/';
    const response = await fetch(
      `${baseUrl}?client_id=${process.env.UNSPLASH_API_KEY}&count=${count}`,
    );
    const json = await response.json();

    return res.json(json);
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});

app.listen(port, () => console.log(`Listening on port ${port}...`));
