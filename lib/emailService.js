import sgMail from "@sendgrid/mail"
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
const key = process.env.SENDGRID_API_KEY
sgMail.setApiKey(key)

export const otpStore = {}

function generateOTP() {
    return Math.floor(100000 + Math.random() * 900000)
}

export async function sendOtpToEmail(email) {
    if (!email || typeof email !== 'string') {
        return { status: 400, message: 'Invalid email format' }
    }

    try {
        const user = await prisma.user.findUnique({ where: { email } })

        if (!user) {
            console.log(`Attempt to reset password for unregistered email: ${email}`)
            return { status: 400, message: 'Email not found' }
        }

        // If OTP already exists for the email, delete it
        if (otpStore[email]) {
            delete otpStore[email]
        }

        const otp = generateOTP()

        otpStore[email] = otp
        setTimeout(() => delete otpStore[email], 300000) // OTP expires after 5 minutes

        const msg = {
            to: email,
            from: 'karlnathanr2@gmail.com',
            subject: 'VendorView OTP',
            text: `Your OTP code is: ${otp}. It is valid for 5 minutes.`,
            html: `<p>Your OTP code is: <strong>${otp}</strong></p>`,
        }

        await sgMail.send(msg)

        return { status: 200, message: 'OTP sent successfully to your email', otp }

    } catch (error) {
        console.error(`Error sending OTP to ${email}:`, error)
        throw new Error('Failed to send OTP. Please try again later.')
    }
}

export function verifyOtp(email, otp) {
    const storedOtp = otpStore[email]
    if (storedOtp && storedOtp.toString() === otp) {
        delete otpStore[email] 
        return true
    }
    return false
}