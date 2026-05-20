import { saveEnquiry } from "../services/service.js";
import { sendEnquiryMail } from "../services/email.service.js";

export const submitEnquiry = async (req, res) => {
  try {
    const { name, email, phone, subject, message } = req.body;

    if (!name || !email || !phone || !subject || !message) {
      return res.status(400).json({ error: "All fields required" });
    }

    // 1. Save to DB
    const result = await saveEnquiry({
      name,
      email,
      phone,
      subject,
      message
    });

    // 2. Send Email (non-blocking safe pattern)
    let emailStatus = "sent";
    try {
      await sendEnquiryMail({ name, email, phone, subject, message });
    } catch (mailErr) {
      emailStatus = "failed";
      console.error("Email failed:", mailErr);
    }

    return res.status(201).json({
      success: true,
      message: `Enquiry saved; email ${emailStatus}`,
      data: result
    });

  } catch (err) {
    return res.status(500).json({ error: "Server error" });
  }
};