/**The registry instance class. This has the registry instance that is used to store the commands.
 * This same instance is used in the command controller
 */
import {
	CommandRegistry,
	I_CommandRegistryFormat,
} from "../execution/CommandRegistry.ts";
import Documentation from "../execution/syntax/command/Documentation";
import { ArgumentsData } from "../execution/syntax/command/ArgumentsData";
import { E_ArgumentTypes } from "../execution/syntax/command/ArgumentsData.ts";

export const command_registry_instance = new CommandRegistry();

/**A shorthand function to register a command to the command register (RC -> Register Command)
 * @param name The name of the command
 * @param args The arguments data
 * @see {@link ArgumentsData}
 * @param metadata The documentation data
 * @see {@link Documentation}
 * @param exec The function to execute when the command is called
 */
export const RC = (
	name: string[],
	args: [number, ...E_ArgumentTypes[]],
	metadata: [string, string?, string?],
	exec: I_CommandRegistryFormat["exec"]
) => {
	command_registry_instance.register({
		name,
		arguments: new ArgumentsData(...args),
		metadata: new Documentation(...metadata),
		exec,
	});
};

/**A shorthand for representing a command registerer for commands having 0 arguments */
export const RC_NoArgs = (
	name: string[],
	metadata: [string, string?, string?],
	exec: I_CommandRegistryFormat["exec"]
) => {
	command_registry_instance.register({
		name,
		arguments: new ArgumentsData(0),
		metadata: new Documentation(...metadata),
		exec,
	});
};

/**A shorthand for representing a command registerer for a command having 1 argument */
export const RC_monoArgs = (
	name: string[],
	arg: E_ArgumentTypes,
	metadata: [string, string?, string?],
	exec: I_CommandRegistryFormat["exec"]
) => {
	command_registry_instance.register({
		name,
		arguments: new ArgumentsData(0, arg),
		metadata: new Documentation(...metadata),
		exec,
	});
};

/**A shorthand for representing a command registerer for a command having 2 arguments */
export const RC_biArgs = (
	name: string[],
	args: [E_ArgumentTypes, E_ArgumentTypes],
	metadata: [string, string?, string?],
	exec: I_CommandRegistryFormat["exec"]
) => {
	command_registry_instance.register({
		name,
		arguments: new ArgumentsData(0, ...args),
		metadata: new Documentation(...metadata),
		exec,
	});
};

/**A shorthand for representing a command registerer for a command having 2 arguments */
export const RC_triArgs = (
	name: string[],
	args: [E_ArgumentTypes, E_ArgumentTypes, E_ArgumentTypes],
	metadata: [string, string?, string?],
	exec: I_CommandRegistryFormat["exec"]
) => {
	command_registry_instance.register({
		name,
		arguments: new ArgumentsData(0, ...args),
		metadata: new Documentation(...metadata),
		exec,
	});
};
