import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: Request) {
  try {
    const { name, email, message } = await req.json();

    // Validate input
    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Name, email, and message are required' }, { status: 400 });
    }

    // Create transporter
    // For Gmail, you need to:
    // 1. Enable 2FA on your Google account
    // 2. Create an App Password: https://myaccount.google.com/apppasswords
    // 3. Set GMAIL_USER and GMAIL_APP_PASSWORD in .env.local
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });

    // Email content
    const mailOptions = {
      from: process.env.GMAIL_USER,
      to: 'djamarisfakhri@gmail.com', // Your email
      replyTo: email,
      subject: `[Portfolio] New message from ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #14b8a6; border-bottom: 2px solid #14b8a6; padding-bottom: 10px;">
            📬 New Portfolio Message
          </h2>
          <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p><strong>From:</strong> ${name}</p>
            <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
          </div>
          <div style="background: #ffffff; padding: 20px; border: 1px solid #e5e7eb; border-radius: 8px;">
            <h3 style="color: #374151; margin-top: 0;">Message:</h3>
            <p style="color: #4b5563; line-height: 1.6;">${message.replace(/\n/g, '<br>')}</p>
          </div>
          <p style="color: #9ca3af; font-size: 12px; margin-top: 20px;">
            This message was sent from your portfolio website contact form.
          </p>
        </div>
      `,
      text: `
New Portfolio Message

From: ${name}
Email: ${email}

Message:
${message}

---
This message was sent from your portfolio website contact form.
      `,
    };

    // Send email
    await transporter.sendMail(mailOptions);

    // Also send confirmation to the sender
    const confirmationMail = {
      from: process.env.GMAIL_USER,
      to: email,
      subject: 'Thank you for reaching out! - Fakhri Djamaris',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #14b8a6;">Hi ${name}! 👋</h2>
          <p>Thank you for reaching out through my portfolio website.</p>
          <p>I've received your message and will get back to you as soon as possible.</p>
          <div style="background: #f8f9fa; padding: 15px; border-radius: 8px; margin: 20px 0;">
            <p style="margin: 0; color: #6b7280;">Your message:</p>
            <p style="color: #374151;">"${message}"</p>
          </div>
          <p>Best regards,<br><strong>Fakhri Djamaris</strong></p>
          <p style="color: #9ca3af; font-size: 12px; margin-top: 30px;">
            ML Engineer • Data Scientist • Web Developer<br>
            <a href="https://github.com/fakhrizamaris" style="color: #14b8a6;">GitHub</a> | 
            <a href="https://linkedin.com/in/fakhri-djamaris" style="color: #14b8a6;">LinkedIn</a>
          </p>
        </div>
      `,
    };

    await transporter.sendMail(confirmationMail);

    return NextResponse.json({ success: true, message: 'Email sent successfully' });
  } catch (error) {
    console.error('Email error:', error);
    return NextResponse.json({ error: 'Failed to send email. Please try again later.' }, { status: 500 });
  }
}
