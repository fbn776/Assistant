import { CommandRegistry } from "./utils/Registry";
import { BaseController } from "../c_BaseController";

class CommandController extends BaseController {
	CONTROLLER_NAME = "CommandController";

	registry: CommandRegistry;

	constructor() {
		super();
		this.registry = new CommandRegistry();
	}
}
