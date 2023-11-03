
/**This error is used only when the command is registered.
 * This is more like a pre-compilation error.
 */
export class CommandValidationError extends Error {
	constructor(str: string, name: string) {
		super(`Command validation error\n\nReason: ${str}\n\nOccurred due to: ${name}\n`);
	}
}
