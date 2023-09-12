export default class ParseError extends Error {
	readonly position: number;

	constructor(name: string, errorAt: number) {
		super(name);
		this.position = errorAt;
	}
}

