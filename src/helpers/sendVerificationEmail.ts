import { resend } from "@/lib/resend"
import VerificationEmail from "../../emails/VerificationEmail"
import { ApiResponse } from "@/types/ApiResponse"

export async function sendVerificationEmail(
    email: string,
    username: string,
    verifyCode: string
): Promise<ApiResponse>{
    try {
        await resend.emails.send({
            from: 'you@example.com',
            to: 'user@gmail.com',
            subject: 'hello world',
            react: <Email url="https://example.com" />,
          });

        return {
            success: true,
            message: "Verification email send successfully"
        }
    } catch (emailError) {
        console.error("Error sending verification email", emailError)
        return {
            success: false,
            message: "Failed to send verification email. Please try again later."
        }
    
    }
}