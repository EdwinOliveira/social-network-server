import * as bcrypt from "bcrypt";
import * as uuid from "uuid";

export class UserRepository {
    private readonly _userId: string;
    private readonly _username: string;
    private readonly _email: string;
    private readonly _password: string;
    private readonly _firstName: string;
    private readonly _lastName: string;

    public constructor(username: string, email: string, password: string, firstName: string, lastName: string) {
        this._userId = uuid.v4();
        this._username = username.toLocaleLowerCase();
        this._email = email.toLocaleLowerCase();
        this._password = bcrypt.hashSync(password, 10);
        this._firstName = firstName.toLocaleLowerCase();
        this._lastName = lastName.toLocaleLowerCase();
    }

    public get userId(): string {
        return this._userId;
    }

    public get username(): string {
        return this._username;
    }

    public get email(): string {
        return this._email;
    }

    public get password(): string {
        return this._password;
    }

    public get firstName(): string {
        return this._firstName;
    }

    public get lastName(): string {
        return this._lastName;
    }
}