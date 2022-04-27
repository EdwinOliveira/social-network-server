import { Injectable } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { StrategyCollection } from "../constants/strategy.collection";

@Injectable()
export class RefreshTokenGuard extends AuthGuard(StrategyCollection.REFRESH_TOKEN_JWT_STRATEGY) {
    public constructor() {
        super();
    }
}