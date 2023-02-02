import { BadRequestException, forwardRef, Inject, Injectable } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
// import { InjectModel } from '@nestjs/mongoose';
// import { Model } from 'mongoose';
// import { Event } from '../shared/types/event';
// import { EventAttend } from '../shared/types/event-attend';
import { UsersService } from '../users/users.service';

import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { Events } from 'src/typeorm';
import { UsersEvents } from 'src/typeorm';

@Injectable()
export class EventsService {
  constructor(
    // @InjectModel('Event') private eventModel: Model<Event>,
    // @InjectModel('EventAttend') private eventAttendModel: Model<EventAttend>,
    @InjectRepository(Events) private readonly eventsRepository: Repository<Events>,
    @InjectRepository(UsersEvents) private readonly usersEventsRepository: Repository<UsersEvents>,
    @Inject(forwardRef(() => UsersService)) private usersService: UsersService
  ) { }
  async create(createEventDto: CreateEventDto) {
    const newEvent = this.eventsRepository.create({
      title: createEventDto.name,
      description: createEventDto.description,
      image_path: createEventDto.image,
      start_at: createEventDto.eventDate
    });

    await this.eventsRepository.save(newEvent);
    return { status: 1, data: newEvent, message: 'success' }
  }

  async findAll(userId = null) {
    const allEvents = await this.eventsRepository.find();
    let temp = [];
    for (let e of allEvents) {
      const eventAttends = await this.usersEventsRepository.find({
        relations: ['event', 'user'],
        where: {
          event: {
            id: e.id
          },
          user: {
            id: userId
          }
        }
      });
      const t = {
        createdAt: e.created_at,
        description: e.description,
        eventDate: e.start_at,
        name: e.title,
        image: e.image_path,
        id: e.id,
        available: eventAttends.length ? eventAttends[0].is_attending : false,
        attendId: eventAttends.length ? eventAttends[0].id : '',
        attended: eventAttends.length ? eventAttends[0].is_attending : 0
      };
      temp.push(t);
    }
    return {
      status: 1,
      data: temp,
      message: 'success'
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} event`;
  }

  async findByEventId(eventId: number) {
    const event = await this.eventsRepository.findOne({ 
      where: {
        id: eventId,
      },
      relations: []
    });
    if (!event) throw new BadRequestException('Event Not found');
    return event;
  }

  update(id: number, updateEventDto: UpdateEventDto) {
    return `This action updates a #${id} event`;
  }

  remove(id: number) {
    return `This action removes a #${id} event`;
  }

  async countEventAttendByID(userId: number, eventId: number) {
    const eventAttend = await this.usersEventsRepository.find({
      relations: ['event'],
      where: {
        event: {
          id: eventId
        }
      }
    });
    return eventAttend.length;
  }
  async changeState(eventId: number, userId: number, state: number) {
    const user = await this.usersService.findByUserId(userId);
    const event = await this.findByEventId(eventId);

    const newEventAttend = this.usersEventsRepository.create({
      is_attending: state ? true : false,
    })
    newEventAttend.event = event;
    newEventAttend.user = user;

    await this.usersEventsRepository.save(newEventAttend);
    // if (state === 1) {
    //   const count = await this.countEventAttendByID(userId, eventId);
    //   if (count < event.maxAttendees - 1) {

    //   }
    //   else if (count === event.maxAttendees - 1) {
    //     event.available = false;
    //   } else {
    //     return { status: 0, message: 'you can not attend' };
    //   }
    // }
    return {
      status: 1,
      data: newEventAttend,
      message: 'success'
    }
  }

  async cancelAttend(attendId: number , userId: number) {
    const attend = await this.usersEventsRepository.findOneBy({id: attendId});
    if (!attend) throw new BadRequestException('Not found');

    attend.is_attending = false;
    await await this.usersEventsRepository.save(attend);

    return {
      status: 1,
      data: attend,
      message: 'success'
    };

  }
}
