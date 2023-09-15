import { CommandRegistry } from "./CommandRegistry";
import { BaseController } from "../c_ControllerBase";

export class CommandController extends BaseController {
	CONTROLLER_NAME = "CommandController";

	registry: CommandRegistry | null;

	/**This needs to be initialized first; this is a dependency;
	 * This function takes in a command registry instance; this instance includes all the registered command.
	 */
	constructor(registry?: CommandRegistry) {
		super();
		this.registry = registry || null;
	}
}
