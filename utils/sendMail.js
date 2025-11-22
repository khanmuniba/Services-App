import nodemailer from "nodemailer";
 const sendMail = async (to, subject, message) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
       port: 587,
  secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    await transporter.sendMail({
      from: `Services App <${process.env.SMTP_USER}>`,
      to,
      subject,
      text: message,
    });

    console.log("📩 Email sent successfully");

  } catch (error) {
    console.log("❌ Email send failed:", error);
  }
};

export default sendMail;