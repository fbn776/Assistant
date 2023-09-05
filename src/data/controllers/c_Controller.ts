import { I_ControllerBase } from "../structures/s_controllers";
import { GlobalSettingsController } from "./c_GlobalSettingsController";
import { MessageController } from "./c_MessageController";

/**
 * This is a global controller class for handling everything related to other controllers.
 * This makes sure that the other containers are used in a centralized manner.
 */
export class GlobalController implements I_ControllerBase {
	messageController: MessageController;
	globalSettingsController: GlobalSettingsController;

	private controllerList: I_ControllerBase[];

	constructor(messageController: MessageController, globalSettingsController: GlobalSettingsController) {
		this.messageController = messageController;
		this.globalSettingsController = globalSettingsController;

		this.controllerList = [
			this.messageController,
			this.globalSettingsController,
		];
	}

	/**Removes all the locally stored data*/
	deleteLocalData() {
		for (let controller of this.controllerList) {
			controller.deleteLocalData();
		}
	}
}
