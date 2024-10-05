import mongoose, {Schema, Document} from "mongoose";

export interface Massage extends Document{
    content: string;
    createdAt: Date;
}

const MassageSchema: Schema<Massage> = new Schema({
    content: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now
    }
});

export interface User extends Document{
    username: string;
    email: string;
    password: string;
    verifyCode: string;
    verifyCodeExpiry: Date;
    isVerifird: boolean
    massages: Massage[];
    isAcceptingMassage: boolean;
}

const UserSchema: Schema<User> = new Schema({
    username: {
        type: String,
        required: [true, "Username is required"],
        unique: true,
        trim: true

    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
        match: [/.+\@.+\..+/, "Please use a valid email address"]
    },
    password: {
        type: String,
        required: [true, "Password is required"],
    },
    verifyCode: {
        type: String,
        required: [true, "Verify code is required"],
    },
    verifyCodeExpiry: {
        type: Date,
        required: [true, "Verify code Expiry is required"],
    },
    isVerifird: {
        type: Boolean,
        default: false
    },
    isAcceptingMassage: {
        type: Boolean,
        default: true
    },
    massages: [MassageSchema]       
});

const UserModel = (mongoose.models.User as mongoose.Model<User>) || mongoose.model<User>("User", UserSchema);