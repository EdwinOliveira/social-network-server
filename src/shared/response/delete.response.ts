export class DeleteResponse<T> {
    private readonly _resourceId: string;
    private readonly _oldResourceURL: string;
    private readonly _resourceArgs: T;

    public constructor(resourceId: string, oldResourceURL: string, resourceArgs: T) {
        this._resourceId = resourceId;
        this._oldResourceURL = oldResourceURL;
        this._resourceArgs = resourceArgs;
    }

    public get resourceId(): string {
        return this._resourceId;
    }

    public get oldResourceURL(): string {
        return this._oldResourceURL;
    }

    public get resourceArgs(): T {
        return this._resourceArgs;
    }
}