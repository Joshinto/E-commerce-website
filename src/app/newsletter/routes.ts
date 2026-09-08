import { NextResponse } from "next/server";
import { Resend } from "resend";

export async function POST(request: Request) {
  try {
    const apiKey = process.env.RESEND_API_KEY;
    const contactEmail = process.env.CONTACT_EMAIL;

    if (!apiKey) {
      return NextResponse.json(
        {
          success: false,
          message: "Email service is not configured.",
        },
        { status: 500 }
      );
    }

    if (!contactEmail) {
      return NextResponse.json(
        {
          success: false,
          message: "Contact email is not configured.",
        },
        { status: 500 }
      );
    }

    const resend = new Resend(apiKey);

    const body = await request.json();
    const email = body.email?.trim();

    if (!email) {
      return NextResponse.json(
        {
          success: false,
          message: "Please enter your email address.",
        },
        { status: 400 }
      );
    }

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

    const { error } = await resend.emails.send({
      from: "Joshinto Newsletter <onboarding@resend.dev>",
      to: [contactEmail],
      subject: "New ShopEase Newsletter Subscriber",
      html: `
        <h2>New Newsletter Subscriber</h2>
        <p>
          <strong>Email:</strong> ${email}
        </p>
      `,
    });

    if (error) {
      console.error("Newsletter Resend error:", error);

      return NextResponse.json(
        {
          success: false,
          message: "Unable to subscribe right now.",
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "You have successfully subscribed to our newsletter!",
    });
  } catch (error) {
    console.error("Newsletter API error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Something went wrong. Please try again.",
      },
      { status: 500 }
    );
  }
}