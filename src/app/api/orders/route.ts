import { NextResponse } from "next/server";
import { auth } from "../../../auth";
import prisma from "../../../lib/prisma";

export const runtime = "nodejs";

export async function GET() {
  try {
    const session = await auth();

    if (!session?.user?.email) {
      return NextResponse.json(
        {
          success: false,
          message: "Unauthorized.",
        },
        { status: 401 }
      );
    }

    const user = await prisma.user.findUnique({
      where: {
        email: session.user.email,
      },
      select: {
        id: true,
      },
    });

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message: "User not found.",
        },
        { status: 404 }
      );
    }

    const orders = await prisma.order.findMany({
      where: {
        userId: user.id,
      },
      include: {
        items: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json({
      success: true,
      orders,
    });
  } catch (error) {
    console.error("GET ORDERS ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Unable to load orders.",
      },
      { status: 500 }
    );
  }
}