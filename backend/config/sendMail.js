import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true, // use SSL
  auth: {
    user: process.env.USER_EMAIL,
    pass: process.env.USER_PASSWORD,
  },
});

const sendEmail = async (to, otp) => {
   await transporter.sendMail({
    from: process.env.USER_EMAIL, // sender address
    to: to, // list of recipients
    subject: "Reset Password", // subject line
    text: `Your OTP for password reset is: ${otp}`, // plain text body
    html: `<p>Your OTP for password reset is: <strong>${otp}</strong><br>
    It will expire in 5 minutes.</p>`, // HTML body
  });
}

export default sendEmail;