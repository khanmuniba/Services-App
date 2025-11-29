import { Resend } from "resend";
import dotenv from "dotenv";
dotenv.config();

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendMail = async (to, subject, message) => {
  try {
    await resend.emails.send({
      from: "Services App <onboarding@resend.dev>",
      to: to,
      subject: subject,
      text: message,
    });

    console.log("📩 Email sent successfully");
  } catch (error) {
    console.log("❌ Email send failed:", error);
  }
};

export default sendMail;
