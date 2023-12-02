import {DefaultSettings, I_SettingsFormat} from "../../data/structures/s_globalSettings.ts";


export default class SettingsLocalStore {
    private _localData: I_SettingsFormat = DefaultSettings;

    private _key = "Settings"
    constructor() {
        const data = window.localStorage.getItem(this._key);
        if(data) {
            console.info("Local data found");
            this._localData = JSON.parse(data) as I_SettingsFormat;
            console.info("Local settings data loaded");
        } else {
            this.update();
        }
    }


    public getData(key: keyof I_SettingsFormat): I_SettingsFormat[keyof I_SettingsFormat] {
        return this._localData[key];
    }

    public setData(key: keyof I_SettingsFormat, value: I_SettingsFormat[keyof I_SettingsFormat], autoupdate = true): void {
        // @ts-ignore
        this._localData[key] = value;

        if(autoupdate) {
            this.update();
        }
    }

    public update(): void {
        window.localStorage.setItem(this._key, JSON.stringify(this._localData));
        console.info("Updated data");
    }
}