import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

export const sendEnquiryMail = async (data) => {
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

  await transporter.sendMail(mailOptions);
};