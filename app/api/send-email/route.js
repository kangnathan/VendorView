import bcrypt from "bcryptjs";
import { sendOtpToEmail, verifyOtp } from "@/lib/emailService";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { email } = await req.json();
    const result = await sendOtpToEmail(email);

    return NextResponse.json(
      { message: result.message },
      { status: result.status }
    );
  } catch (error) {
    console.error("Error sending OTP:", error.message);
    return NextResponse.json(
      { message: "Failed to send OTP. Please try again later." },
      { status: 500 }
    );
  }
}

export async function PUT(req) {
  try {
      const { otp, newPassword, email } = await req.json();
      
    if (!otp || !newPassword || !email) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    const isValidOtp = verifyOtp(email, otp);
    if (!isValidOtp) {
      return NextResponse.json(
        { message: "Invalid or expired OTP" },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await prisma.user.update({
      where: { email },
      data: { password: hashedPassword },
    });

    return NextResponse.json(
      { message: "Password changed successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error changing password:", error.message);
    return NextResponse.json(
      { message: "Failed to change password", error: error.message },
      { status: 500 }
    );
  }
}
