import { useEffect } from "react";
import { I_ControllerBase } from "../structures/s_controllers";
import { I_GlobalSettings } from "../structures/s_globalSettings";

export class GlobalSettingsController implements I_ControllerBase {
	private settings: I_GlobalSettings = GlobalSettingsController.BaseSettings;
	private setSettings: React.Dispatch<React.SetStateAction<I_GlobalSettings>> =
		() => {};

	/**
	 * This initializes the message state.
	 * @param state The return value of a useState() hook of type Array of messages
	 */
	init(
		state: [
			I_GlobalSettings,
			React.Dispatch<React.SetStateAction<I_GlobalSettings>>
		]
	) {
		[this.settings, this.setSettings] = state;
	}

	/**Returns the value of the specified setting */
	getValue(
		name: keyof I_GlobalSettings
	): I_GlobalSettings[keyof I_GlobalSettings] {
		return this.settings[name];
	}

	/**Sets the value of the specified setting */
	setValue(
		name: keyof I_GlobalSettings,
		value: I_GlobalSettings[keyof I_GlobalSettings]
	) {
		this.setSettings((prevState) => ({ ...prevState, [name]: value }));
	}

	deleteLocalData() {
		//TODO
	}

	/**Runs when any of the settings change.
	 * **`NOTE: Use this only inside of a React component.`**
	 */
	onSettingsChange(callback: () => void) {
		useEffect(callback, [this.settings]);
	}

	/**Base settings getter */
	static get BaseSettings(): I_GlobalSettings {
		return {
			scrollToNewMessage: true,
			showMessageDate: true,
			theme: "light",
		};
	}
}
