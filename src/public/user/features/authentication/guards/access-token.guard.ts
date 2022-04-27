import { ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { AuthGuard } from "@nestjs/passport";
import { Observable } from "rxjs";
import { StrategyCollection } from "../constants/strategy.collection";

@Injectable()
export class AccessTokenGuard extends AuthGuard(StrategyCollection.ACCESS_TOKEN_JWT_STRATEGY) {
    public constructor(private readonly _reflector: Reflector) {
        super();
    }

    public canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const isPublic = this._reflector.getAllAndOverride('isPublic', [
            context.getHandler(),
            context.getClass(),
        ])

        if (isPublic) return true;

        return super.canActivate(context);
    }
}