import * as mongoose from "mongoose";
declare const CouponSchema: mongoose.Schema<any, mongoose.Model<any, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, {
    createdAt: Date;
    code?: string;
}>;
export default CouponSchema;
