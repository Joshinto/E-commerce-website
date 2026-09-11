import { NextResponse } from "next/server";
import prisma from "../../../lib/prisma";

export const runtime = "nodejs";

export async function GET() {
  try {
    const count = await prisma.user.count();

    return NextResponse.json({
      success: true,
      users: count,
    });
  } catch (error) {
    console.error("DATABASE TEST ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}