import nodemailer from 'nodemailer';

export default async function sendEmail(req, res) {
  if (req.method === 'POST') {
    const { email, paymentDetails } = req.body;

    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: process.env.EMAIL_ID,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_ID,
      to: email,
      subject: 'Payment Details',
      text: `Payment Status: ${paymentDetails.status} \n Order ID: ${paymentDetails.orderId} \n Payment ID: ${paymentDetails.paymentId} \n Showtime: ${paymentDetails.showtime} \n Selected Seats: ${paymentDetails.selectedSeats.join(", ")} \n Amount: ₹${paymentDetails.amount / 100}`,
    };

    try {
      await transporter.sendMail(mailOptions);
      res.status(200).json({ message: 'Email sent successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Failed to send email', details: error.message });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}