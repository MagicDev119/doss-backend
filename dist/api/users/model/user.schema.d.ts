import * as mongoose from "mongoose";
declare const UserSchema: mongoose.Schema<any, mongoose.Model<any, any, any, any, any>, {}, {}, {}, {}, mongoose.ResolveSchemaOptions<{
    toJSON: {
        virtuals: boolean;
    };
}>, {
    email: string;
    fullName: string;
    phoneNumber: string;
    invitationCode: string;
    subscriptionPlan: string;
    subscriptionStart: string;
    stripeCustomerId: string;
    stripeSubscriptionId: string;
    emailVerified: boolean;
    verificationCode: string;
    password?: string;
    stripeClientSecret?: string;
    lastPaymentStatus?: string;
    refreshToken?: string;
}>;
export default UserSchema;
