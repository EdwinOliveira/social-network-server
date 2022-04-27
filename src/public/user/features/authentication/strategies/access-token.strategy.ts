import { Injectable } from "@nestjs/common";
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from "passport-jwt";
import { EnvironmentConfigurationService } from "src/core/services/environment-configuration.service";
import { StrategyCollection } from "../constants/strategy.collection";
import { JWTPayload } from "../types/jwt.payload";

@Injectable()
export class AccessTokenStrategy extends PassportStrategy(Strategy, StrategyCollection.ACCESS_TOKEN_JWT_STRATEGY) {
    public constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: EnvironmentConfigurationService.instance.jwtSecret
        })
    }

    public validate(payload: JWTPayload): JWTPayload {
        return payload;
    }
}