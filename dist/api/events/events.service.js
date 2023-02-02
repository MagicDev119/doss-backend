"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const users_service_1 = require("../users/users.service");
const typeorm_3 = require("../../typeorm");
const typeorm_4 = require("../../typeorm");
let EventsService = class EventsService {
    constructor(eventsRepository, usersEventsRepository, usersService) {
        this.eventsRepository = eventsRepository;
        this.usersEventsRepository = usersEventsRepository;
        this.usersService = usersService;
    }
    async create(createEventDto) {
        const newEvent = this.eventsRepository.create({
            title: createEventDto.name,
            description: createEventDto.description,
            image_path: createEventDto.image,
            start_at: createEventDto.eventDate
        });
        await this.eventsRepository.save(newEvent);
        return { status: 1, data: newEvent, message: 'success' };
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
        };
    }
    findOne(id) {
        return `This action returns a #${id} event`;
    }
    async findByEventId(eventId) {
        const event = await this.eventsRepository.findOne({
            where: {
                id: eventId,
            },
            relations: []
        });
        if (!event)
            throw new common_1.BadRequestException('Event Not found');
        return event;
    }
    update(id, updateEventDto) {
        return `This action updates a #${id} event`;
    }
    remove(id) {
        return `This action removes a #${id} event`;
    }
    async countEventAttendByID(userId, eventId) {
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
    async changeState(eventId, userId, state) {
        const user = await this.usersService.findByUserId(userId);
        const event = await this.findByEventId(eventId);
        const newEventAttend = this.usersEventsRepository.create({
            is_attending: state ? true : false,
        });
        newEventAttend.event = event;
        newEventAttend.user = user;
        await this.usersEventsRepository.save(newEventAttend);
        return {
            status: 1,
            data: newEventAttend,
            message: 'success'
        };
    }
    async cancelAttend(attendId, userId) {
        const attend = await this.usersEventsRepository.findOneBy({ id: attendId });
        if (!attend)
            throw new common_1.BadRequestException('Not found');
        attend.is_attending = false;
        await await this.usersEventsRepository.save(attend);
        return {
            status: 1,
            data: attend,
            message: 'success'
        };
    }
};
EventsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(typeorm_3.Events)),
    __param(1, (0, typeorm_1.InjectRepository)(typeorm_4.UsersEvents)),
    __param(2, (0, common_1.Inject)((0, common_1.forwardRef)(() => users_service_1.UsersService))),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        users_service_1.UsersService])
], EventsService);
exports.EventsService = EventsService;
//# sourceMappingURL=events.service.js.map