

export default class Documentation {
	readonly description: string;
	readonly syntax: string | null;
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
