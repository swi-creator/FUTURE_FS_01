const express = require("express");
const path = require("path");
const app = express();
const PORT = 5000;

// Serve static files (HTML, CSS, Images, etc.)
app.use(express.static(__dirname));

// Route to download the CV
app.get("/download-cv", (req, res) => {
  const filePath = path.join(__dirname, "assets","resume.pdf");
  res.download(filePath,(err)=>{
    if (err) {
      console.error("Error sending file:", err);
      res.status(500).send("Error downloading file.");
    }
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
