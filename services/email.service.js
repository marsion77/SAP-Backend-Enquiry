import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  },
  connectionTimeout: 5000,
  socketTimeout: 5000
});

transporter.verify()
  .then(() => console.log("Email transporter verified"))
  .catch((err) => console.error("Email transporter verify error:", err.message));

export const sendEnquiryMail = async (data) => {
  try {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: "marison399@gmail.com",
      subject: `New Enquiry: ${data.subject}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><b>Name:</b> ${data.name}</p>
        <p><b>Email:</b> ${data.email}</p>
        <p><b>Phone:</b> ${data.phone}</p>
        <p><b>Subject:</b> ${data.subject}</p>
        <p><b>Message:</b> ${data.message}</p>
      `
    };

    const result = await transporter.sendMail(mailOptions);
    console.log("Email sent successfully:", result.messageId);
    return result;
  } catch (error) {
    console.error("Email send error:", error.message);
    throw error;
  }
};