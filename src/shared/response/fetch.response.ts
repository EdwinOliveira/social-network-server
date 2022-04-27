export class FetchResponse<T> {
    private readonly _resourceId: string;
    private readonly _resourceArgs: T;

    public constructor(resourceId: string, resourceArgs: T) {
        this._resourceId = resourceId;
        this._resourceArgs = resourceArgs;
    }

    public get resourceId(): string {
        return this._resourceId;
    }

    public get resourceArgs(): T {
        return this._resourceArgs;
    }
}