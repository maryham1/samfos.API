import {prisma} from "../config/db.js";
import { sendContactEmail } from "../config/sendgrid.js";

export async function createContactMessage(req, res) {
  try {
    const { fullName, email, phone, subject, message } = req.body || {};

    // Validation
    if (!fullName || !email || !phone || !subject || !message) {
      return res.status(400).json({
        success: false,
        message: "All fields are required.",
      });
    }

    // Save message to database
    const contactMessage = await prisma.contactMessage.create({
      data: {
        fullName,
        email,
        phone,
        subject,
        message,
      },
    });

    // Send email
    await sendContactEmail({
      fullName,
      email,
      phone,
      subject,
      message,
    });

    return res.status(201).json({
      success: true,
      message: "Your message has been sent successfully.",
      data: contactMessage,
    });
  } catch (error) {
    console.error("Create contact message error:", error);

    return res.status(500).json({
      success: false,
      message: "Something went wrong while sending your message.",
    });
  }
}
