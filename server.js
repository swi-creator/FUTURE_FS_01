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
const express = require("express");
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");
const app = express();
const PORT = 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(__dirname));

app.post("/send", (req, res) => {
  const { name, email, subject, message } = req.body;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "Vidushi5026@gmail.com", // your Gmail
      pass: "your-app-password", // NOT Gmail password! Use App Password
    },
  });

  const mailOptions = {
    from: email,
    to: "Vidushi5026@gmail.com",
    subject: `Portfolio Contact Form: ${subject}`,
    text: `Message from ${name} (${email}):\n\n${message}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error);
      res.send("error");
    } else {
      console.log("Email sent: " + info.response);
      res.send("success");
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
