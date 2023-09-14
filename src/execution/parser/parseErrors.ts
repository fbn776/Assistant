export enum E_ParseErrorType {
	spaceNotFound,
	noClosingQuoteFound,
	InvalidQuotes,
	emptyBrackets,
	bracketMismatch,
	quotesMismatch,
	InvalidBracket,
}

export default class ParseErrorBase extends Error {
	/**The string index at which the error occurred */
	readonly position: number;
	readonly errorType: E_ParseErrorType;

	constructor(name: string, errorAt: number, errorType: E_ParseErrorType) {
		super(name);
		this.position = errorAt;
		this.errorType = errorType;
	}
}

class SpaceNotFound extends ParseErrorBase {
	constructor(errorAt: number) {
		super("Space not found", errorAt, E_ParseErrorType.spaceNotFound);
	}
}

class NoClosingQuoteFound extends ParseErrorBase {
	constructor(errorAt: number) {
		super(
			"No closing quote found",
			errorAt,
			E_ParseErrorType.noClosingQuoteFound
		);
	}
}

class InvalidQuotes extends ParseErrorBase {
	constructor(errorAt: number) {
		super("Invalid quotes", errorAt, E_ParseErrorType.InvalidQuotes);
	}
}

class EmptyBrackets extends ParseErrorBase {
	constructor(errorAt: number) {
		super("Empty brackets found", errorAt, E_ParseErrorType.emptyBrackets);
	}
}

class BracketMismatch extends ParseErrorBase {
	constructor(errorAt: number) {
		super("Bracket mismatch", errorAt, E_ParseErrorType.bracketMismatch);
	}
}

class QuotesMismatch extends ParseErrorBase {
	constructor(errorAt: number) {
		super("Quotes mismatch", errorAt, E_ParseErrorType.quotesMismatch);
	}
}

class InvalidBracket extends ParseErrorBase {
	constructor(errorAt: number) {
		super("Invalid bracket found", errorAt, E_ParseErrorType.InvalidBracket);
	}
}

export const ParseErrors = {
	SpaceNotFound,
	NoClosingQuoteFound,
	InvalidBracket,
	InvalidQuotes,
	EmptyBrackets,
	BracketMismatch,
	QuotesMismatch,
};
