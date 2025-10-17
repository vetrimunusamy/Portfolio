// import express from "express";
// import cors from "cors";

// const app = express();
// app.use(cors());
// app.use(express.json());

// app.post("/api/contact", (req, res) => {
//   const { name, email, subject, message } = req.body;
//   console.log("📩 New message received:");
//   console.log({ name, email, subject, message });
//   res.status(200).json({ success: true });
// });

// app.listen(5000, () => console.log("✅ Server running on http://localhost:5000"));




import express from "express";
import cors from "cors";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config(); // load EMAIL and PASSWORD from .env

const app = express();
app.use(cors({
   origin: "https://portfolio-frontend-9m8g.onrender.com"
}
  ));
app.use(express.json());

app.post("/api/contact", async (req, res) => {
  const { name, email, subject, message } = req.body;

  // Create transporter
  const transporter = nodemailer.createTransport({
    service: "Gmail", // You can use Gmail, Outlook, Yahoo, etc.
    auth: {
      user: process.env.EMAIL,      // your email
      pass: process.env.PASSWORD    // your app password or normal password
    }
  });

  const mailOptions = {
    from: email,
    to: process.env.EMAIL, // receive messages at your email
    subject: `New Contact Form Message: ${subject}`,
    html: `<h3>New message from portfolio contact form</h3>
           <p><strong>Name:</strong> ${name}</p>
           <p><strong>Email:</strong> ${email}</p>
           <p><strong>Subject:</strong> ${subject}</p>
           <p><strong>Message:</strong><br/>${message}</p>`
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("📩 Email sent:", { name, email, subject, message });
    res.status(200).json({ success: true });
  } catch (error) {
    console.error("❌ Error sending email:", error);
    res.status(500).json({ success: false, error: "Email could not be sent." });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// app.listen(5000, () => console.log("✅ Server running on http://localhost:5000"));
