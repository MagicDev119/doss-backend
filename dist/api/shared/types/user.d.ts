import { Document } from "mongoose";
export interface User extends Document {
    id: number;
    email: string;
    login_otp: string;
    created?: Date;
    refreshToken?: string;
    emailVerified: boolean;
    fullName: string;
    phoneNumber: string;
    invitationCode: string;
    subscriptionPlan: string;
    subscriptionStart: string;
    stripeCustomerId: string;
    stripeSubscriptionId: string;
    stripeClientSecret: string;
    lastPaymentStatus: string;
    verificationCode: string;
}
