import { BadRequestException, Body, Controller, ForbiddenException, InternalServerErrorException, MethodNotAllowedException, NotFoundException, Post, Req, Request, UseGuards } from '@nestjs/common';
import { PublicRoute } from 'src/shared/constants/public.route';
import { CreateResponse } from 'src/shared/response/create.response';
import { UserRoute } from '../../constants/user.route';
import { AuthenticationService } from './authentication.service';
import { AuthenticationRoute } from './constants/authentication.route';
import { SignInDTO } from './dtos/sign-in.dto';
import { SignUpDTO } from './dtos/sign-up.dto';
import * as bcrypt from "bcrypt";
import { EnvironmentConfigurationService } from 'src/core/services/environment-configuration.service';
import { UserRepository } from '../../repository/user.repository';
import { JwtService } from '@nestjs/jwt';
import { RefreshTokenGuard } from './guards/refresh-token.guard';
import { GetCurrentUser } from './decorators/get-current-user.decorator';
import { GetCurrentUserId } from './decorators/get-current-user-id.decorator';
import { Public } from './decorators/public.decorator';

@Controller()
export class AuthenticationController {
    public constructor(private readonly _authenticationService: AuthenticationService, private readonly _jwtService: JwtService) {
    }

    @Public()
    @Post(`/${PublicRoute.USERS}/${UserRoute.AUTHENTICATION}/${AuthenticationRoute.SIGN_IN}`)
    public async signIn(@Body() { email, password }: SignInDTO): Promise<CreateResponse<{ accessToken: string, refreshToken: string }>> {
        const userEntity = await this._authenticationService.fetchByParam({ where: { email: email } }).catch((error: Error) => {
            throw new InternalServerErrorException(error);
        });

        if (userEntity === undefined || userEntity === null) {
            throw new NotFoundException("User was not found!");
        }

        const comparedPassword = await bcrypt.compare(password, userEntity.password).catch((error: Error) => {
            throw new InternalServerErrorException(error);
        });

        if (comparedPassword === false) {
            throw new BadRequestException("Invalid credentials!");
        }

        const [accessToken, refreshToken] = await Promise.all([
            this._jwtService.signAsync({ sub: userEntity.userId, email: userEntity.email }, { expiresIn: "1d", secret: EnvironmentConfigurationService.instance.jwtSecret }),
            this._jwtService.signAsync({ sub: userEntity.userId, email: userEntity.email }, { expiresIn: "7d", secret: EnvironmentConfigurationService.instance.jwtSecret }),
        ]);

        const [accessTokenHashed, refreshTokenHashed] = await Promise.all([
            bcrypt.hash(accessToken, 10).catch((error: Error) => { throw new InternalServerErrorException(error); }),
            bcrypt.hash(refreshToken, 10).catch((error: Error) => { throw new InternalServerErrorException(error); }),
        ]);

        this._authenticationService.updateByParam({ userId: userEntity.userId }, { accessToken: accessTokenHashed, refreshToken: refreshTokenHashed }).catch((error: Error) => {
            throw new InternalServerErrorException(error);
        });

        const routeURL = `localhost:${EnvironmentConfigurationService.instance.serverPort}/${PublicRoute.USERS}/${UserRoute.AUTHENTICATION}/${AuthenticationRoute.SIGN_OUT}`;

        return new CreateResponse<{ accessToken: string, refreshToken: string }>(userEntity.userId, routeURL, { accessToken: accessToken, refreshToken: refreshToken });
    }

    @Public()
    @Post(`/${PublicRoute.USERS}/${UserRoute.AUTHENTICATION}/${AuthenticationRoute.SIGN_UP}`)
    public async signUp(@Body() { username, email, password, firstName, lastName }: SignUpDTO): Promise<CreateResponse<void>> {
        const userRepository = new UserRepository(username, email, password, firstName, lastName);

        await this._authenticationService.create(userRepository).catch((error: Error) => {
            throw new InternalServerErrorException(error);
        });

        const routeURL = `localhost:${EnvironmentConfigurationService.instance.serverPort}/${PublicRoute.USERS}/${UserRoute.AUTHENTICATION}/${AuthenticationRoute.SIGN_IN}`;

        return new CreateResponse<null>(userRepository.userId, routeURL, null);
    }

    @Post(`/${PublicRoute.USERS}/${UserRoute.AUTHENTICATION}/${AuthenticationRoute.SIGN_OUT}`)
    public async signOut(@GetCurrentUserId() userId: string): Promise<CreateResponse<void>> {
        this._authenticationService.updateByParam({ userId: userId }, { accessToken: null, refreshToken: null }).catch((error: Error) => {
            throw new InternalServerErrorException(error);
        });

        const routeURL = `localhost:${EnvironmentConfigurationService.instance.serverPort}/${PublicRoute.USERS}/${UserRoute.AUTHENTICATION}/${AuthenticationRoute.SIGN_IN}`;

        return new CreateResponse<null>(userId, routeURL, null);
    }

    @Public()
    @UseGuards(RefreshTokenGuard)
    @Post(`/${PublicRoute.USERS}/${UserRoute.AUTHENTICATION}/${AuthenticationRoute.REFRESH_TOKEN}`)
    public async refreshToken(
        @GetCurrentUser("sub") userId: string,
        @GetCurrentUser("refreshToken") refreshToken: string,
    ): Promise<CreateResponse<{ accessToken: string, refreshToken: string }>> {
        const userEntity = await this._authenticationService.fetchByParam({ where: { userId: userId } }).catch((error: Error) => {
            throw new InternalServerErrorException(error);
        });

        if (!userEntity || !userEntity.refreshToken) {
            throw new ForbiddenException('Access Denied!');
        }

        const comparedRefreshToken = await bcrypt.compare(refreshToken, userEntity.refreshToken).catch((error: Error) => {
            throw new InternalServerErrorException(error);
        });

        if (comparedRefreshToken === false) {
            throw new ForbiddenException('Access Denied!');
        }

        const [acToken, rfToken] = await Promise.all([
            this._jwtService.signAsync({ sub: userEntity.userId, email: userEntity.email }, { expiresIn: "1d", secret: EnvironmentConfigurationService.instance.jwtSecret }),
            this._jwtService.signAsync({ sub: userEntity.userId, email: userEntity.email }, { expiresIn: "7d", secret: EnvironmentConfigurationService.instance.jwtSecret }),
        ]);

        const [accessTokenHashed, refreshTokenHashed] = await Promise.all([
            bcrypt.hash(acToken, 10).catch((error: Error) => { throw new InternalServerErrorException(error); }),
            bcrypt.hash(rfToken, 10).catch((error: Error) => { throw new InternalServerErrorException(error); }),
        ]);

        this._authenticationService.updateByParam({ userId: userEntity.userId }, { accessToken: accessTokenHashed, refreshToken: refreshTokenHashed }).catch((error: Error) => {
            throw new InternalServerErrorException(error);
        });

        const routeURL = `localhost:${EnvironmentConfigurationService.instance.serverPort}/${PublicRoute.USERS}/${UserRoute.AUTHENTICATION}/${AuthenticationRoute.SIGN_OUT}`;

        return new CreateResponse<{ accessToken: string, refreshToken: string }>(userEntity.userId, routeURL, { accessToken: acToken, refreshToken: rfToken });
    }




}