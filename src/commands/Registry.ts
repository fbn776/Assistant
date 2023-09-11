import { Command } from "./Command";
import Documentation from "./documentation/Documentation";
import { ArgumentsData } from "./utils/arguments";
import { CommandNameError, hasDuplicates } from "./utils/command_utils";

// Commands.register({
// 	name: ["add", "addition", "plus"],
// 	arguments: ArgumentTypes(),
// 	metadata: new Documentation(
// 		"Adds two numbers together",
// 	),
// 	exec: (a, b) => {
// 		return a + b;
// 	}
// });

export interface I_CommandRegisterData {
	name: string[];
	arguments: ArgumentsData;
	metadata: Documentation;
	exec: (...args: any[]) => any;
}

/**
 *
 * _commands stores the key value pair in the format <command_name>: <Command_class>
 * Each alias of the command takes occupies a separate space in the map;
 */
export class CommandRegistry {
	private _commands: Map<string, Command> = new Map();

	public register(data: I_CommandRegisterData) {
		//Validates the incoming data; for errors, if errors are found this throws and error;
		this.Validate(data);

		let cmd = new Command(data.name, data.arguments, data.metadata, data.exec);
		console.log(cmd)
	}

	private _addCommand(cmd: Command) {
		for (let name of cmd.names) {
			this._commands.set(name, cmd);
		}
	}

	/**Checks if a command exists in the registry */
	exists(name: string) {
		return this._commands.has(name);
	}

	private Validate(data: I_CommandRegisterData) {
		if (data.name.length === 0)
			throw new Error("Invalid name; there needs be at least one name.");

		let dup = hasDuplicates(data.name);
		if(dup !== false)
			throw new CommandNameError("Command alias duplicate found", dup as string);
		
		for (let name of data.name) {
			//Validates the name pattern;
			Command.ValidateCommandName(name);

			//Checks if the command name already exits;
			if(this._commands.has(name))
				throw new CommandNameError("The command name already exists.", name);
		}
	}
}


