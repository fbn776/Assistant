export enum E_ParseErrorType {
	spaceNotFound,
	noClosingQuoteFound,
	InvalidQuotes,
	emptyBrackets,
	bracketMismatch,
	quotesMismatch,
	InvalidBracket
}

export default class ParseError extends Error {
	/**The string index at which the error occurred */
	readonly position: number;
	readonly errorType: E_ParseErrorType;

	constructor(name: string, errorAt: number, errorType: E_ParseErrorType) {
		super(name);
		this.position = errorAt;
		this.errorType = errorType;
	}
}

export class SpaceNotFoundError extends ParseError {
	constructor(errorAt: number) {
		super("Space not found", errorAt, E_ParseErrorType.spaceNotFound);
	}
}

export class NoClosingQuoteFoundError extends ParseError {
	constructor(errorAt: number) {
		super("No closing quote found", errorAt, E_ParseErrorType.noClosingQuoteFound);
	}
}

export class InvalidQuotesError extends ParseError {
	constructor(errorAt: number) {
		super("Invalid quotes", errorAt, E_ParseErrorType.InvalidQuotes);
	}
}

export class EmptyBracketsError extends ParseError {
	constructor(errorAt: number) {
		super("Empty brackets found", errorAt, E_ParseErrorType.emptyBrackets);
	}
}

export class BracketMismatchError extends ParseError {
	constructor(errorAt: number) {
		super("Bracket mismatch", errorAt, E_ParseErrorType.bracketMismatch);
	}
}

export class QuotesMismatchError extends ParseError {
	constructor(errorAt: number) {
		super("Quotes mismatch", errorAt, E_ParseErrorType.quotesMismatch);
	}
}

export class InvalidBracketError extends ParseError {
	constructor(errorAt: number) {
		super("Invalid bracket found", errorAt, E_ParseErrorType.InvalidBracket);
	}
}