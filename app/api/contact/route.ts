import { Resend } from "resend";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    // Check for API key at runtime
    if (!process.env.RESEND_API_KEY) {
      console.error("RESEND_API_KEY not configured");
      return NextResponse.json(
        { error: "Email service not configured. Please contact us directly at hello@cognalith.ca" },
        { status: 503 }
      );
    }

    const resend = new Resend(process.env.RESEND_API_KEY);

    const body = await request.json();
    const { name, email, company, message } = body;

    // Validation
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required" },
        { status: 400 }
      );
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email address" },
        { status: 400 }
      );
    }

    // Send email to Cognalith
    await resend.emails.send({
      from: "Cognalith Contact <onboarding@resend.dev>",
      to: ["hello@cognalith.ca"],
      replyTo: email,
      subject: `New Contact Form: ${name}${company ? ` from ${company}` : ""}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        ${company ? `<p><strong>Company:</strong> ${company}</p>` : ""}
        <hr />
        <h3>Message:</h3>
        <p>${message.replace(/\n/g, "<br />")}</p>
      `,
    });

    // Send confirmation to user
    await resend.emails.send({
      from: "Cognalith <onboarding@resend.dev>",
      to: [email],
      subject: "Thanks for reaching out to Cognalith!",
      html: `
        <h2>Hi ${name},</h2>
        <p>Thanks for reaching out! We've received your message and will get back to you within 24-48 hours.</p>
        <p>In the meantime, feel free to check out our <a href="https://cognalith.ca">website</a> to learn more about the Monolith System.</p>
        <br />
        <p>Best,<br />The Cognalith Team</p>
        <hr />
        <p style="color: #666; font-size: 12px;">This is an automated response. Please don't reply to this email.</p>
      `,
    });

    return NextResponse.json(
      { message: "Message sent successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "Failed to send message. Please try again." },
      { status: 500 }
    );
  }
}
