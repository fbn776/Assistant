/**
 * This is used to store the commands data locally;
 * ie, used to store variables data, preferences data, etc.
 */
export class CommandsLocalStore {
    /**Variable store*/
    private _varstore: Map<string, any> = new Map();

    /**Sets a values to variable of the given name.
     * If it doesn't exist, then new one is created
     * If it does exist, then the value is updated
     *
     * The set value is also returned
     */
    public setVar(name: string, value: any) {
        this._varstore.set(name, value);
        return value;
    }

    /**Gets the value of the variable of the given name.
     * If it doesn't exist, then null is returned
     */
    public getVar(name: string) {
        return this._varstore.get(name) || null;
    }

    /**Checks if a variable of the given name exists*/
    public hasVar(name: string) {
        return this._varstore.has(name);
    }
}