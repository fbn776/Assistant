import { UIController } from "./c_UIController";
import { GlobalSettingsController } from "./c_GlobalSettingsController";
import { MessageController } from "./c_MessageController";
import { BaseController } from "./c_BaseController";

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
		uiController = new UIController()
	) {
		this.messageController = messageController;
		this.globalSettingsController = globalSettingsController;
		this.uiController = uiController;

		this._controllerList = [
			this.messageController,
			this.globalSettingsController,
			this.uiController,
		];

		for (let controller of this._controllerList) {
			controller.bind(this);
		}
	}
}
