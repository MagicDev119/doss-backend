import * as mongoose from "mongoose";
declare const EventAttendSchema: mongoose.Schema<any, mongoose.Model<any, any, any, any, any>, {}, {}, {}, {}, mongoose.ResolveSchemaOptions<{
    toJSON: {
        virtuals: boolean;
    };
}>, {
    event: mongoose.Types.ObjectId;
    attendee: mongoose.Types.ObjectId;
    status: number;
}>;
export default EventAttendSchema;
