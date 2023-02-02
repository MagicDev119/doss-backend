import { AuthService } from "./auth.service";
import { CredentialsDTO, EmailDTO, SendLoginCodeDto } from './dto/auth.dto';
import { UserSignupDTO } from "../users/dto/create-user.dto";
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    register(user: UserSignupDTO, req: any): Promise<{
        status: number;
        message: string;
        id: string;
        error?: undefined;
    } | {
        status: number;
        error: any;
        message?: undefined;
        id?: undefined;
    }>;
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
    refresh(req: any): Promise<{
        status: number;
        accessToken: string;
        accessTokenSecondToExpiration: number;
        refreshToken: string;
        refreshTokenSecondToExpiration: number;
    }>;
    logout(req: any): Promise<{
        msg: string;
        status: number;
    }>;
    checkEmail(req: any, body: EmailDTO): Promise<{
        status: number;
        msg: string;
    }>;
    sendCode(codeDto: SendLoginCodeDto, req: any): Promise<{
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
}
