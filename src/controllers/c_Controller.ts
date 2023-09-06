import { UIController } from './c_UIController';
import { I_UIEvents, I_dependencies } from "./../data/structures/s_controllers";
import { MESSAGE_SOURCE } from "../data/structures/s_message";
import { GlobalSettingsController } from "./c_GlobalSettingsController";
import { MessageController } from "./c_MessageController";
import { BaseController } from './BaseController';

/**
 * This is a global controller class for handling most of the things in the app. This also is an access point accessing for every other controller.
 * This makes sure that the things happen in a centralized manner.
 *
 * This class is a singleton class, thus only one instance of this class should be created.
 *
 * This controller has access to different events. These events are used to communicate with the UI.
 * For these events to occur the UI needs to submit some dependencies to the controller.
 *
 * NOTE: This is a controller class; this is supposed to provide a singular source of control, so the UI doesn't have any behavior logic build into it.
 * This modularize the code more. This means certain events, functions, operations are available as simple functions, so usage of those events, operations are abstracted away.
 *
 ** This might need some refactoring, better structure or other stuff. This is open to changes;
 */
export class GlobalController {
	messageController: MessageController;
	globalSettingsController: GlobalSettingsController;
	uiController: UIController;

	private _controllerList: BaseController[];

	constructor(
		messageController = new MessageController(),
		globalSettingsController = new GlobalSettingsController(),
		uiController = new UIController(),
	) {
		this.messageController = messageController;
		this.globalSettingsController = globalSettingsController;
		this.uiController = uiController;
		
		this._controllerList = [
			this.messageController,
			this.globalSettingsController,
			this.uiController
		];

		for(let controller of this._controllerList) {
			controller.bind(this);
		}
	}


	/**
	 * Controller for handling different UI events.
	 *
	 * ! Could be refactored to a better way; but currently too lazy, I guess.
	 * @see I_UIEvents for adding new methods
	 */
	readonly uiEvents: I_UIEvents = {
		input: {
			isEmpty: () => {
				return this.uiEvents.input.getText() === "";
			},

			clear: () => {
				if (this.dependencies.mainInputRef?.current)
					this.dependencies.mainInputRef.current.value = "";
			},

			getText: () => {
				if (this.dependencies.mainInputRef?.current)
					return this.dependencies.mainInputRef.current.value;

				return "";
			},

			setText: (text) => {
				if(this.dependencies.mainInputRef?.current)
					this.dependencies.mainInputRef.current.value = text;
			},

			insertTextAt: (text, position?) => {
				console.time("insertTextAt");
				const inputElm = this.dependencies.mainInputRef?.current;
				if (!inputElm) return;

				let pos = position ? position : this.uiEvents.input.getCursorPosition(),
					val = this.uiEvents.input.getText();

				this.uiEvents.input.setText(val.substring(0, pos) + text + val.substring(pos));
				this.uiEvents.input.setCursorPosition(pos + 1);
				inputElm.focus();
			},

			getCursorPosition: () => {
				if (!this.dependencies.mainInputRef?.current) return -1;
				return this.dependencies.mainInputRef.current.selectionStart ?? -1;
			},

			setCursorPosition: (caretPos) => {
				var elem = this.dependencies.mainInputRef?.current;
				if (!elem) return;
				if (elem.selectionStart) {
					elem.focus();
					elem.setSelectionRange(caretPos, caretPos);
				} else elem.focus();
			},

			submit: () => {
				if (this.uiEvents.input.isEmpty()) return;

				//When submitting, first display the message as user message;
				this.messageController.addMessage({
					id: Date.now().toString(),
					text: this.uiEvents.input.getText(),
					source: MESSAGE_SOURCE.USER,
					unixTime: Date.now(),
				});

				//If the `clearOnSubmit` setting is set to true, then clear the input;
				if (this.globalSettingsController.getValue("clearOnSubmit"))
					this.uiEvents.input.clear();
			},
		},

		messages: {},
	};

	/**Dependencies object for storing different dependencies to which the different events the controller depends on.
	 *
	 * **NOTE: This needs to set at first to the different dependencies else things might not work properly.**
	 * @see I_dependencies for adding new methods
	 */
	readonly dependencies: I_dependencies = {
		mainInputRef: null,
		messageContainer: null,
	};
}
