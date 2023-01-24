import * as mongoose from "mongoose";
declare const EventSchema: mongoose.Schema<any, mongoose.Model<any, any, any, any, any>, {}, {}, {}, {}, mongoose.ResolveSchemaOptions<{
    toJSON: {
        virtuals: boolean;
    };
}>, {
    name: string;
    description: string;
    eventDate: Date;
    image: string;
    maxAttendees: number;
    available?: boolean;
}>;
export default EventSchema;
