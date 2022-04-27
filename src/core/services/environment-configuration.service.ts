import { Injectable } from '@nestjs/common';
import { DBEngine } from 'src/shared/constants/db.engine';
import { EnvCollection } from 'src/shared/constants/env.collection';

@Injectable()
export class EnvironmentConfigurationService {
    private static _instance: EnvironmentConfigurationService;

    /** Properties */
    private readonly _serverPort: number = parseInt(process.env[EnvCollection.SERVER_PORT]);
    private readonly _jwtSecret: string = process.env[EnvCollection.JWT_SECRET];

    /** TypeORM */
    private readonly _dbEngine: DBEngine = process.env[EnvCollection.DB_ENGINE] as DBEngine;
    private readonly _dbHost: string = process.env[EnvCollection.DB_HOST];
    private readonly _dbPort: number = parseInt(process.env[EnvCollection.DB_PORT]);
    private readonly _dbUsername: string = process.env[EnvCollection.DB_USERNAME];
    private readonly _dbPassword: string = process.env[EnvCollection.DB_PASSWORD];
    private readonly _dbName: string = process.env[EnvCollection.DB_NAME];

    public constructor() { }

    public static get instance(): EnvironmentConfigurationService {
        if (this._instance === undefined) {
            this._instance = new EnvironmentConfigurationService();
        }

        return this._instance;
    }

    public get serverPort(): number {
        return this._serverPort;
    }

    public get jwtSecret(): string {
        return this._jwtSecret;
    }

    public get dbEngine(): DBEngine {
        return this._dbEngine;
    }

    public get dbHost(): string {
        return this._dbHost;
    }

    public get dbPort(): number {
        return this._dbPort;
    }

    public get dbUsername(): string {
        return this._dbUsername;
    }

    public get dbPassword(): string {
        return this._dbPassword;
    }

    public get dbName(): string {
        return this._dbName;
    }
}
