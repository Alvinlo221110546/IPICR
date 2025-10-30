import express from 'express';
import nodemailer from 'nodemailer';

const router = express.Router();

router.post('/contact', async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ message: 'Semua field wajib diisi' });
  }

  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS, // pakai App Password
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER, // harus sama dengan akun Gmail
      replyTo: email,               // supaya bisa reply ke user
      to: process.env.EMAIL_USER,
      subject: `Pesan Baru dari ${name}`,
      text: `Dari: ${name} (${email})\n\nPesan:\n${message}`,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: 'Pesan berhasil dikirim' });
  } catch (err) {
    console.error('❌ Gagal kirim email:', err);
    res.status(500).json({ message: 'Gagal mengirim email', error: err.message });
  }
});

export default router;
