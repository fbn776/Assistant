/**A util class for representing documentation of a command.
 * 
 * Used a documentation class, because this could potentially change in the future. Using a documentation class allows for more flexibility.
 * This also allows for more flexible usage in different use cases.
 * 
 * A potential `DocumentationBuilder` class probably needed, if documentations become more complex (Thats for future😉).
 */
export default class Documentation {
	/**The description the command. This explains the command */
	readonly description: string;
	/**[Optional] Used to represent the general syntax of a command */
	readonly syntax: string | null;
	/**[Optional] Used for examples of the command */
	readonly examples: string | null;

	constructor(
		description: string,
		syntax: string | null = null,
		examples: string | null = null
	) {
		this.description = description;
		this.syntax = syntax;
		this.examples = examples;
	}
}

