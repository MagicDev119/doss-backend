import { TwilioService } from 'nestjs-twilio';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import { Users } from 'src/typeorm';
import { ConfigService } from '@nestjs/config';
import { CredentialsDTO, SendLoginCodeDto } from './dto/auth.dto';
import { UserDTO, UserSignupDTO } from '../users/dto/create-user.dto';
export declare enum SMSType {
    VERIFY_REGISTER = "sms",
    VERIFY_RESET_PASSWORD = "reset_password"
}
export declare class AuthService {
    private usersService;
    private jwtService;
    private readonly twilioService;
    private configService;
    private readonly userRepository;
    constructor(usersService: UsersService, jwtService: JwtService, twilioService: TwilioService, configService: ConfigService, userRepository: Repository<Users>);
    validateUser(email: string, password: string): Promise<any>;
    login(userLoginDto: CredentialsDTO): Promise<{
        status: number;
        message: string;
        token_type?: undefined;
        sessionTokens?: undefined;
        user?: undefined;
    } | {
        status: number;
        token_type: string;
        sessionTokens: {
            accessToken: string;
            accessTokenSecondToExpiration: number;
            refreshToken: string;
            refreshTokenSecondToExpiration: number;
        };
        user: {
            email: string;
            id: number;
            phone_number: string;
            fullName: string;
            stripeCustomerId: string;
            subscriptionPlan: string;
            subscriptionStart: Date;
        };
        message?: undefined;
    }>;
    create(userDTO: UserSignupDTO): Promise<UserDTO>;
    getTokens(payload: any): Promise<{
        accessToken: string;
        accessTokenSecondToExpiration: number;
        refreshToken: string;
        refreshTokenSecondToExpiration: number;
    }>;
    logout(userId: number): Promise<Users>;
    refreshTokens(userId: number, refreshToken: string): Promise<{
        status: number;
        accessToken: string;
        accessTokenSecondToExpiration: number;
        refreshToken: string;
        refreshTokenSecondToExpiration: number;
    }>;
    checkEmail(email: string): Promise<{
        status: number;
        msg: string;
    }>;
    sendLoginCode(loginCodeDto: SendLoginCodeDto): Promise<{
        status: number;
        message: string;
        data?: undefined;
    } | {
        status: number;
        data: {
            id: number;
            phone_number: string;
        };
        message: string;
    }>;
    sendSMS(phoneNumber: string, smsType: SMSType): Promise<{
        message: any;
        code: string;
    }>;
}
