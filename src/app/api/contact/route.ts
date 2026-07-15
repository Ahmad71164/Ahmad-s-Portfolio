import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const { name, email, subject, message } = await req.json();

    // Server-side validation
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: "All fields are required." },
        { status: 400 }
      );
    }

    // Simple email regex validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Please provide a valid email address." },
        { status: 400 }
      );
    }

    if (message.length < 10) {
      return NextResponse.json(
        { error: "Message must be at least 10 characters long." },
        { status: 400 }
      );
    }

    // Message payload
    const submission = {
      id: Date.now().toString(),
      timestamp: new Date().toISOString(),
      name,
      email,
      subject,
      message
    };

    // Log the submission locally to a JSON file inside the workspace
    // Create database folder if it doesn't exist
    const logDir = path.join(process.cwd(), "src", "data");
    if (!fs.existsSync(logDir)) {
      fs.mkdirSync(logDir, { recursive: true });
    }

    const logPath = path.join(logDir, "contact-messages.json");
    let existingLogs = [];

    if (fs.existsSync(logPath)) {
      try {
        const fileData = fs.readFileSync(logPath, "utf-8");
        existingLogs = JSON.parse(fileData);
      } catch (err) {
        console.error("Error reading existing logs:", err);
      }
    }

    existingLogs.push(submission);
    fs.writeFileSync(logPath, JSON.stringify(existingLogs, null, 2), "utf-8");

    console.log(`[Contact Form Submission] Received from ${name} (${email}): ${subject}`);

    // Email Sending Logic via Nodemailer
    const emailUser = process.env.EMAIL_USER;
    const emailPass = process.env.EMAIL_PASS;
    const recipientEmail = "muhammadahmadamir7@gmail.com";

    if (emailUser && emailPass) {
      try {
        const transporter = nodemailer.createTransport({
          host: process.env.EMAIL_HOST || "smtp.gmail.com",
          port: parseInt(process.env.EMAIL_PORT || "465"),
          secure: process.env.EMAIL_SECURE !== "false", // true for port 465, false for 587
          auth: {
            user: emailUser,
            pass: emailPass, // App Password or SMTP password
          },
        });

        const mailOptions = {
          from: `"${name}" <${emailUser}>`, // Must match authorized sender for Gmail SMTP
          replyTo: email, // Direct replies back to the sender's email address
          to: recipientEmail,
          subject: `Portfolio Contact: ${subject}`,
          text: `New message from: ${name} (${email})\nSubject: ${subject}\n\nMessage:\n${message}`,
          html: `
            <div style="font-family: sans-serif; padding: 25px; color: #1f2937; max-width: 600px; margin: 20px auto; border: 1px solid #e5e7eb; border-radius: 16px; background-color: #ffffff; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);">
              <h2 style="color: #8b5cf6; border-bottom: 2px solid #f3f4f6; padding-bottom: 12px; margin-top: 0; font-size: 1.5rem;">New Portfolio Contact</h2>
              <p style="margin: 8px 0;"><strong>Name:</strong> ${name}</p>
              <p style="margin: 8px 0;"><strong>Email:</strong> <a href="mailto:${email}" style="color: #06b6d4; text-decoration: none;">${email}</a></p>
              <p style="margin: 8px 0;"><strong>Subject:</strong> ${subject}</p>
              <div style="background-color: #f9fafb; padding: 18px; border-radius: 12px; margin-top: 18px; border-left: 4px solid #8b5cf6; font-size: 1rem; line-height: 1.6;">
                <p style="margin: 0; white-space: pre-wrap;">${message}</p>
              </div>
              <footer style="margin-top: 24px; font-size: 0.75rem; color: #9ca3af; border-top: 1px solid #f3f4f6; padding-top: 12px; text-align: center;">
                Sent from your Next.js Portfolio Application.
              </footer>
            </div>
          `,
        };

        await transporter.sendMail(mailOptions);
        console.log(`[Email Sent] Message from ${name} forwarded successfully to ${recipientEmail}`);
      } catch (mailErr) {
        console.error("[Nodemailer Error] Failed to send email:", mailErr);
        // Do not fail the request; local logging succeeded, so we still report success.
      }
    } else {
      console.warn(
        "[Nodemailer Warning] EMAIL_USER and EMAIL_PASS environment variables are not set. " +
        "The submission was saved locally in `src/data/contact-messages.json`, but no email was sent."
      );
    }

    return NextResponse.json({
      success: true,
      message: "Thank you for getting in touch! Your message has been sent successfully."
    });
  } catch (error) {
    console.error("Contact API error:", error);
    return NextResponse.json(
      { error: "Internal server error. Please try again later." },
      { status: 500 }
    );
  }
}
