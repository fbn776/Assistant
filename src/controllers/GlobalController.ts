import { BaseController, CommandController, SettingsController, MessageController, UIController } from ".";
import { Executer } from "../language/execution/evaluator/evaluator";

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
 * This modularizes the code more. This means certain events, functions, operations are available as simple functions, so usage of those events, operations are abstracted away.
 *
 ** This might need some refactoring, better structure or other stuff. This is open to changes;
 */
export class GlobalController {
	/**Message controller. For controlling the reading and writing messages.*/
	message: MessageController;
	/**Global settings controller. For controlling the getting and setting and storage of global settings */
	globalSettings: SettingsController;
	/**UI controller. For controlling different UI elements like input and messages */
	ui: UIController;
	/**Command controller. For handling stuff related to commands */
	command: CommandController;
	/**An instance of the executer class. For execution of results */
	executer = new Executer(this);

	private _controllerList: BaseController[];

	constructor(
		messageController = new MessageController(),
		globalSettingsController = new SettingsController(),
		uiController = new UIController(),
		commandController = new CommandController()
	) {
		this.message = messageController;
		this.globalSettings = globalSettingsController;
		this.ui = uiController;
		this.command = commandController;

		this._controllerList = [
			this.message,
			this.globalSettings,
			this.ui,
			this.command,
		];

		for (let controller of this._controllerList) {
			controller.bind(this);
		}
	}
}
