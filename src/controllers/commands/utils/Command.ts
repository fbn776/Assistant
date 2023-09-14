import Documentation from "./documentation/Documentation";
import { ArgumentsData } from "./arguments";
import { CommandNameError } from "./command_utils";

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

	static ValidateCommandName(name: string) {
		//Checks if the staring with a number; throw error if yes;
		if (name[0] >= "0" && name[0] <= "9")
			throw new CommandNameError("Command names shouldn't start with a ", name);

		//Checks if a character has non-alphanumeric(+underscore) characters
		if (!/^[a-zA-Z0-9_]+$/.test(name))
			throw new CommandNameError(
				"Command name should only include alphanumeric and underscore characters. Found characters that doesn't meet this condition",
				name
			);
	}
}
