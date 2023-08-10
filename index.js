const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const cors = require('cors'); // Import the cors module


const app = express();
const port = 8000; // Change this to your desired port number

// Middleware to parse incoming request data as JSON
app.use(bodyParser.json());
app.use(cors()); // Enable CORS for all routes


// API endpoint to handle sending emails
app.post('/send-email', (req, res) => {
  const { name, email, mobile } = req.body;

  // Replace the following with your actual email configuration
  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: 'medhanya.entp@gmail.com',
      pass: 'yegnanzfxpcharpy      ',
    },
  });

  const mailOptions = {
    from: 'medhanya.entp@gmail.com',
    to: 'deepakkathuria32@gmail.com',
    subject: 'Requested User Detail',
    html: `<p>Username:  ${name},</p>
           <p>UserEmail:  ${email}</p>
           <p>UserMobile:  ${mobile}</p>
      `,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
      res.status(500).json({ success: false, error: 'Failed to send email' });
    } else {
      console.log('Email sent:', info.response);
      res.status(200).json({ success: true, message: 'Email sent successfully' });
    }
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
