import { CommandRegistry } from "./CommandRegistry";
import { BaseController } from "../c_BaseController";

export class CommandController extends BaseController {
	CONTROLLER_NAME = "CommandController";

	registry: CommandRegistry | null = null;

	/**This needs to be initialized first; this is a dependency;
	 * This function takes in a command registry instance; this instance includes all the registered command. 
	 */
	initRegistry(registry: CommandRegistry) {
		this.registry = registry;
	}
}
