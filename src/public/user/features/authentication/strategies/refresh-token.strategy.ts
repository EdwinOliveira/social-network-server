import { Injectable } from "@nestjs/common";
import { PassportStrategy } from '@nestjs/passport';
import { Request } from "express";
import { ExtractJwt, Strategy } from "passport-jwt";
import { EnvironmentConfigurationService } from "src/core/services/environment-configuration.service";
import { StrategyCollection } from "../constants/strategy.collection";
import { JWTPayload } from "../types/jwt.payload";

@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(Strategy, StrategyCollection.REFRESH_TOKEN_JWT_STRATEGY) {
    public constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: EnvironmentConfigurationService.instance.jwtSecret,
            passReqToCallback: true,
        })
    }

    public validate(req: Request, payload: JWTPayload) {
        const refreshToken = req.get("authorization").replace("Bearer", "").trim();

        return {
            ...payload,
            refreshToken
        }
    }
}