import { I_ControllerBase } from "../data/structures/s_controllers";
import { MESSAGE_SOURCE } from "../data/structures/s_message";
import { GlobalSettingsController } from "./c_GlobalSettingsController";
import { MessageController } from "./c_MessageController";

/**
 * This is a global controller class for handling most of the things in the app. This also is an access point accessing for every other controller.
 * This makes sure that the things happen in a centralized manner.
 *
 * This class is a singleton class, thus only one instance of this class should be created.
 *
 * This controller has access to different events. These events are used to communicate with the UI.
 * For these events to occur the UI needs to submit some dependencies to the controller.
 */
export class GlobalController implements I_ControllerBase {
	CONTROLLER_NAME = "GlobalController";

	messageController: MessageController;
	globalSettingsController: GlobalSettingsController;

	private _controllerList: I_ControllerBase[];

	constructor(
		messageController = new MessageController(),
		globalSettingsController = new GlobalSettingsController()
	) {
		this.messageController = messageController;
		this.globalSettingsController = globalSettingsController;

		this._controllerList = [
			this.messageController,
			this.globalSettingsController,
		];
	}

	/**Removes all the locally stored data*/
	deleteLocalData() {
		for (let controller of this._controllerList) {
			if (controller.deleteLocalData) controller.deleteLocalData();
		}
	}
	
	//! Could be refactored to a better way; but currently too lazy, I guess.
	readonly uiEvents: I_UIEvents = {
		input: {
			getInputText: () => {
				if (this.dependencies.mainInputRef?.current)
					return this.dependencies.mainInputRef.current.value;

				return "";
			},

			clearInput: () => {
				if (this.dependencies.mainInputRef?.current)
					this.dependencies.mainInputRef.current.value = "";
			},

			submitInput: () => {
				this.messageController.addMessage({
					id: Date.now().toString(),
					text: this.uiEvents.input.getInputText(),
					source: MESSAGE_SOURCE.USER,
					unixTime: Date.now(),
				});

				//If the `clearOnSubmit` setting is set to true, then clear the input;
				if (this.globalSettingsController.getValue("clearOnSubmit"))
					this.uiEvents.input.clearInput();
			},
		},
	};

	/**Dependencies object for storing different dependencies to which the different events the controller depends on.
	 *
	 * **NOTE: This needs to set at first to the different dependencies else things might not work properly.**
	 */
	readonly dependencies: I_dependencies = {
		mainInputRef: null,
	};
}

interface I_dependencies {
	/**The main input ref object */
	mainInputRef: React.MutableRefObject<HTMLInputElement | null> | null;
}

interface I_UIEvents {
	/**Input events */
	input: I_UI_Events_Input;
}
interface I_UI_Events_Input {
	/**Clears the main input */
	clearInput: () => void;
	/**Submits the main input text to the submission work */
	submitInput: () => void;
	/**Gets the main input text */
	getInputText: () => string;
}
