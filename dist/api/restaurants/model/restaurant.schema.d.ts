import * as mongoose from "mongoose";
export declare enum OfferType {
    EXPIRED = -1,
    ACTIVATED = 0,
    ENABLED = 1
}
declare const RestaurantSchema: mongoose.Schema<any, mongoose.Model<any, any, any, any, any>, {}, {}, {}, {}, mongoose.ResolveSchemaOptions<{
    toJSON: {
        virtuals: boolean;
    };
}>, {
    name: string;
    description: string;
    image: string;
    available: number;
    expireDate: Date;
    offer: string;
    activator: mongoose.Types.ObjectId;
    activatedAt: Date;
}>;
export default RestaurantSchema;
