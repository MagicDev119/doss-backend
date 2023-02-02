import { Repository } from 'typeorm';
import { UsersService } from '../users/users.service';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { Events } from 'src/typeorm';
import { UsersEvents } from 'src/typeorm';
export declare class EventsService {
    private readonly eventsRepository;
    private readonly usersEventsRepository;
    private usersService;
    constructor(eventsRepository: Repository<Events>, usersEventsRepository: Repository<UsersEvents>, usersService: UsersService);
    create(createEventDto: CreateEventDto): Promise<{
        status: number;
        data: Events;
        message: string;
    }>;
    findAll(userId?: any): Promise<{
        status: number;
        data: any[];
        message: string;
    }>;
    findOne(id: number): string;
    findByEventId(eventId: number): Promise<Events>;
    update(id: number, updateEventDto: UpdateEventDto): string;
    remove(id: number): string;
    countEventAttendByID(userId: number, eventId: number): Promise<number>;
    changeState(eventId: number, userId: number, state: number): Promise<{
        status: number;
        data: UsersEvents;
        message: string;
    }>;
    cancelAttend(attendId: number, userId: number): Promise<{
        status: number;
        data: UsersEvents;
        message: string;
    }>;
}
