import dbConnect from "@/lib/dbConnect";
import { UserModel } from "@/models/User";
import bcrypt from "bcryptjs"

import { sendVerificationEmail } from "@/helpers/sendVerificationEmail";

export async function POST(request: Request){
    await dbConnect();

    try {
        const { username, email, password} = await request.json();

        const existingUserVerifiedByUsername = await UserModel.findOne({
            username,
            verified: true
        })

        if(existingUserVerifiedByUsername) {
            return Response.json({
                success: false,
                massage: "User is already taken"
            }, {status: 400})
        }

        const existingUserByEmail = await UserModel.findOne({email});

        const verifyCode = Math.floor(100000 + Math.random() * 900000).toString()

        if(existingUserByEmail){
           true
        } else{
           const hashedPassword = await bcrypt.hash(password, 10);
           const expiryDate = new Date();
           expiryDate.setDate(expiryDate.getHours() + 1)

           const newUser = new UserModel({
                username,
                email,
                password: hashedPassword,
                verifyCode,
                verifyCodeExpiry: expiryDate,
                isVerifird: false,
                massages: [],
                isAcceptingMassage: true
            })
        }
        
    } catch (error) {
        console.error("Error registering user", error);
        return Response.json(
            {
                success: false,
                massage: "Error registering user"
            },
            {
                status: 500
            }
        )
    }
}