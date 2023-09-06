import { I_ControllerBase } from "../data/structures/s_controllers";
import { GlobalController } from "./c_Controller";

export class BaseController implements I_ControllerBase {
	CONTROLLER_NAME: string = "BaseController";

	parent: GlobalController = null as any;

	bind(parent: GlobalController) {
		this.parent = parent;
	}
}