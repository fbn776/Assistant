import { useEffect } from "react";
import {
	DefaultGlobalSettings,
	I_GlobalSettings,
} from "../../data/structures/s_globalSettings";
import { BaseController } from "../c_ControllerBase";

/**
 * TODO
 * In a bit of a confusion here. I chose to store settings as a react state. So that whenever a setting change, it automatically updates the UI.
 * But the issue is, since the settings are provided by a Context and that context is at the root, any changes made to settings updates the UI, always.
 * So kinda torn between storing settings as a react state or just a plain object.
 * My idea is, like using a listener to listen to changes in settings and then provide an updater, which then can be used to update the UI. But I don't know how to do that.
 */

/**
 * Controller for managing global settings.
 */
export class GlobalSettingsController extends BaseController {
	CONTROLLER_NAME = "GlobalSettingsController";

	private _settings: I_GlobalSettings = GlobalSettingsController.BaseSettings;
	private _setSettings: React.Dispatch<React.SetStateAction<I_GlobalSettings>> =
		() => {};

	/**
	 * This initializes the message state.
	 * @param state The return value of a useState() hook of type Array of messages
	 */
	init(
		state: [
			I_GlobalSettings,
			React.Dispatch<React.SetStateAction<I_GlobalSettings>>,
		]
	) {
		[this._settings, this._setSettings] = state;
	}

	/**Returns the value of the specified setting
	 * ? Open to name changes
	 */
	getValue(
		name: keyof I_GlobalSettings
	): I_GlobalSettings[keyof I_GlobalSettings] {
		return this._settings[name];
	}

	/**Sets the value of the specified setting
	 * ? Open to name changes
	 */
	setValue(
		name: keyof I_GlobalSettings,
		value: I_GlobalSettings[keyof I_GlobalSettings]
	) {
		this._setSettings((prevState) => ({ ...prevState, [name]: value }));
	}

	deleteLocalData() {
		//TODO
	}

	/**Runs when any of the settings change.
	 *
	 *   **`NOTE: Use this only inside of a React component.`**
	 */
	onSettingsChange(callback: () => void) {
		useEffect(callback, [this._settings]);
	}

	/**Base settings getter */
	static get BaseSettings(): I_GlobalSettings {
		return DefaultGlobalSettings;
	}
}
