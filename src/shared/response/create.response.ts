export class CreateResponse<T> {
    private readonly _resourceId: string;
    private readonly _resourceURL: string;
    private readonly _resourceArgs: T;

    public constructor(resourceId: string, resourceURL: string, resourceArgs: T) {
        this._resourceId = resourceId;
        this._resourceURL = resourceURL;
        this._resourceArgs = resourceArgs;
    }

    public get resourceId(): string {
        return this._resourceId;
    }

    public get resourceURL(): string {
        return this._resourceURL;
    }

    public get resourceArgs(): T {
        return this._resourceArgs;
    }
}