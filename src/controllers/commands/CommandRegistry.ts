
import { CommandNameError, hasDuplicates } from "../../execution/test/utils/command_utils";
import {Command} from "../../execution/test/Command.ts";
import {ArgumentsData, Documentation} from "../../execution/test";

/**The format of the command that is registered to the `CommandRegistry` */
export interface I_CommandRegistryFormat {
	/**The name or names of the command; each name points to the same command functionality; that is all the name given are aliases of each other */
	name: string[];
	/**The arguments needed for the command to be executed */
	arguments: ArgumentsData;
	/**The documentation for the command; here the description is required, rest are optional */
	metadata: Documentation;
	/**The actual code to be executed when the command is executed; this is JS code that runs in back */
	exec: (...args: any[]) => any;
}

/**
 * _commands stores the key value pair in the format <command_name>: <Command_class>
 * Each alias of the command takes occupies a separate space in the map;
 */
export class CommandRegistry {
	private _commands: Map<string, Command> = new Map();

	/**Adds or registers a new command to the command registry;
	 * This validates the commands before registering and if errors are found then this throws an error */
	register(data: I_CommandRegistryFormat) {
		this._validate(data);

		let cmd = new Command(data.name, data.arguments, data.metadata, data.exec);
		this._addCommand(cmd);
	}

	/**Adds the given command to the command registry
	 * This takes in a command and then loops though each name and adds it to the registry;
	 * This doesn't check for any errors, so make sure to check for errors before calling this function;
	 */
	private _addCommand(cmd: Command) {
		for (let name of cmd.names) {
			this._commands.set(name, cmd);
		}
	}

	/**A validator that validates a Command object; This is different from the Command name validator, as it only validates the command name, not the object*/
	private _validate(data: I_CommandRegistryFormat) {
		if (data.name.length === 0)
			throw new Error("Invalid name; there needs be at least one name.");

		let dup = hasDuplicates(data.name);
		if (dup !== false)
			throw new CommandNameError(
				"Command alias duplicate found",
				dup as string
			);

		for (let name of data.name) {
			//Validates the name pattern;
			Command.ValidateCommandName(name);

			if (this.exists(name))
				throw new CommandNameError("The command already exists.", name);
		}
	}

	/**Checks if a command exists in the registry */
	exists(name: string) {
		return this._commands.has(name);
	}

	/**Returns the command data; if not found then null is returned */
	getCommandData(cmd: string) {
		return this._commands.get(cmd) || null;
	}
}
