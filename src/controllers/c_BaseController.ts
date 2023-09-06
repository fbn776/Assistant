import { I_ControllerBase } from "../data/structures/s_controllers";
import { GlobalController } from "./c_Controller";

export class BaseController implements I_ControllerBase {
	CONTROLLER_NAME: string = "BaseController";

	parent: GlobalController = null as any;

	/**### Important 
	 * This bind function is used to bind any child controller to its parent controller. This sets the `parent` property of the child controller to the parent controller.
	 * 
	 * This should be called inside the globalController's constructor. If not called, then the child controller will not be able to access the globalController and every other controller registered with the globalController.
	*/
	bind(parent: GlobalController) {
		this.parent = parent;
	}
}