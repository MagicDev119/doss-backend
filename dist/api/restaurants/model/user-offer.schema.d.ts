import * as mongoose from "mongoose";
declare const UserOfferSchema: mongoose.Schema<any, mongoose.Model<any, any, any, any, any>, {}, {}, {}, {}, mongoose.ResolveSchemaOptions<{
    toJSON: {
        virtuals: boolean;
    };
}>, {
    status: number;
    user: mongoose.Types.ObjectId;
    restaurant: mongoose.Types.ObjectId;
}>;
export default UserOfferSchema;
