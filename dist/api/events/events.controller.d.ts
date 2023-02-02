import { EventsService } from './events.service';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
export declare class EventsController {
    private readonly eventsService;
    constructor(eventsService: EventsService);
    create(createEventDto: CreateEventDto): Promise<{
        status: number;
        data: import("../../typeorm").Events;
        message: string;
    }>;
    findAll(req: any): Promise<{
        status: number;
        data: any[];
        message: string;
    }>;
    findOne(id: string): string;
    update(id: string, updateEventDto: UpdateEventDto): string;
    remove(id: string): string;
    changeEventState(id: string, req: any, body: any): Promise<{
        status: number;
        data: import("../../typeorm").UsersEvents;
        message: string;
    }>;
    cancelAttendEvent(attendId: string, req: any): Promise<{
        status: number;
        data: import("../../typeorm").UsersEvents;
        message: string;
    }>;
}
