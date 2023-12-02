import CommandRegistry from "./CommandRegistry.ts";
import BaseController from "../BaseController.ts";
import CommandsLocalStore from "./CommandsLocalStore.ts";

export default class CommandController extends BaseController {
	CONTROLLER_NAME = "CommandController";

	registry: CommandRegistry | null;
	localStore = new CommandsLocalStore();

	/**
	 * The constructor takes in a command registry instance; this instance includes all the registered command.
	 */
	constructor(registry?: CommandRegistry) {
		super();
		this.registry = registry || null;
	}
}
