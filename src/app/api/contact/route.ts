import { NextResponse } from "next/server";
import { Resend } from "resend";

export async function POST(request: Request) {
  try {
    // Check environment variables
    const apiKey = process.env.RESEND_API_KEY;
    const contactEmail = process.env.CONTACT_EMAIL;

    if (!apiKey) {
      console.error("RESEND_API_KEY is missing");

      return NextResponse.json(
        {
          success: false,
          message: "Email service is not configured.",
        },
        { status: 500 }
      );
    }

    if (!contactEmail) {
      console.error("CONTACT_EMAIL is missing");

      return NextResponse.json(
        {
          success: false,
          message: "Contact email is not configured.",
        },
        { status: 500 }
      );
    }

    // Create Resend instance after checking the API key
    const resend = new Resend(apiKey);

    // Read request body
    const body = await request.json();

    const {
      firstName,
      lastName,
      email,
      subject,
      message,
    } = body;

    // Validate required fields
    if (!firstName || !lastName || !email || !subject || !message) {
      return NextResponse.json(
        {
          success: false,
          message: "Please fill in all required fields.",
        },
        { status: 400 }
      );
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      return NextResponse.json(
        {
          success: false,
          message: "Please enter a valid email address.",
        },
        { status: 400 }
      );
    }

    // Send email
    const { error } = await resend.emails.send({
      from: "Joshinto Contact <onboarding@resend.dev>",
      to: [contactEmail],
      replyTo: email,
      subject: `Joshinto Contact: ${subject}`,
      html: `
        <h2>New Contact Message</h2>

        <p>
          <strong>Name:</strong>
          ${firstName} ${lastName}
        </p>

        <p>
          <strong>Email:</strong>
          ${email}
        </p>

        <p>
          <strong>Subject:</strong>
          ${subject}
        </p>

        <hr />

        <h3>Message</h3>

        <p>
          ${message.replace(/\n/g, "<br />")}
        </p>
      `,
    });

    // Handle Resend error
    if (error) {
      console.error("Resend error:", error);

      return NextResponse.json(
        {
          success: false,
          message: "Unable to send your message right now.",
        },
        { status: 500 }
      );
    }

    // Success
    return NextResponse.json(
      {
        success: true,
        message: "Your message has been sent successfully.",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Contact API error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Something went wrong. Please try again.",
      },
      { status: 500 }
    );
  }
}