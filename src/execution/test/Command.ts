import Documentation from "./Documentation.ts";
import { ArgumentsData } from "./ArgumentsData.ts";
import { CommandValidationError } from "./utils/command_utils.ts";

export class Command {
	public readonly names: string[];
	public readonly arguments: ArgumentsData;
	public readonly metadata: Documentation;
	public readonly exec: (...args: any[]) => any;

	constructor(
		names: string[],
		args: ArgumentsData,
		metadata: Documentation,
		exec: (args: any) => any
	) {
		this.names = names;
		this.arguments = args;
		this.metadata = metadata;
		this.exec = exec;
	}

	/**Checks if a command name is a valid name, checks for;
	 * - It starts with an alphabet or an underscore
	 * - The name should only contain alphanumeric characters and underscores only
	 *
	 * NOTE: If the above mentioned are not met, then this throws an error.
	 */
	static CommandNameValidator(name: string) {
		//Checks if the staring with a number; throw error if yes;
		if (name[0] >= "0" && name[0] <= "9")
			throw new CommandValidationError(
				"Command names shouldn't start with a ",
				name
			);

		//Checks if a character has non-alphanumeric(+underscore) characters
		if (!/^[a-zA-Z0-9_]+$/.test(name))
			throw new CommandValidationError(
				"Command name should only include alphanumeric and underscore characters. Found characters that doesn't meet this condition",
				name
			);
	}
	
}
