import {
	DefaultGlobalSettings,
	I_GlobalSettings,
} from "../../data/structures/s_globalSettings";
import BaseController from "../BaseController.ts";

type GSKeys = keyof I_GlobalSettings;

/**
 * Controller for managing global settings.
 */
export default class SettingsController extends BaseController {
	CONTROLLER_NAME = "GlobalSettingsController";

	/**Keeps tracks of the setting values that, when changed should call back.
	 * The setting is the key and list of all functions to call back are the values**/
	private _listenersFlag: Map<GSKeys, (() => void)[]> = new Map();

	/**Settings storage*/
	private _settings: I_GlobalSettings = SettingsController.BaseSettings;

	/**An event listener that listens to changes in settings */
	public onChange(listenFor: GSKeys, callback: () => void) {
		let arr = [];
		let pre = this._listenersFlag.get(listenFor);
		if (pre) {
			arr.push(...pre);
		}
		arr.push(callback);
		this._listenersFlag.set(listenFor, arr);
	}

	/**Changes a settings values specified by the `key` param, this also calls any listeners that listen to this change*/
	public setValue(key: GSKeys, value: I_GlobalSettings[GSKeys]) {
		//Set the value of the specified setting
		// @ts-ignore
		this._settings[key] = value;
		//Call all the callbacks that listen to this specific settings
		this._listenersFlag.get(key)?.forEach((callback) => callback());
	}

	/**Returns the value of the specified setting
	 * ? Open to name changes
	 */
	public getValue(name: GSKeys): I_GlobalSettings[GSKeys] {
		return this._settings[name];
	}

	/**Base settings getter */
	static get BaseSettings(): I_GlobalSettings {
		return DefaultGlobalSettings;
	}
}
