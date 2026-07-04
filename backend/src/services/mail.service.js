import nodemailer from "nodemailer";
import { env } from "../config/env.js";

let transporter = null;

if (env.smtp.host && env.smtp.user) {
  transporter = nodemailer.createTransport({
    host: env.smtp.host,
    port: env.smtp.port,
    secure: env.smtp.port === 465,
    auth: { user: env.smtp.user, pass: env.smtp.pass },
  });
}

// Sends the contact-form notification. Falls back to console logging in dev
// when no SMTP credentials are configured.
export const sendContactEmail = async ({ name, email, subject, message }) => {
  const body = `New contact message from ${name} <${email}>\n\nSubject: ${subject}\n\n${message}`;

  if (!transporter) {
    console.log("[mail:dev] Contact message received:\n" + body);
    return;
  }

  await transporter.sendMail({
    from: env.smtp.user,
    to: env.smtp.to,
    replyTo: email,
    subject: `[Portfolio] ${subject}`,
    text: body,
  });
};
