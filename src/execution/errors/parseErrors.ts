export namespace ParseErrors {
	export enum E_ParseErrorType {
		spaceNotFound,
		noClosingQuoteFound,
		InvalidQuotes,
		emptyBrackets,
		bracketMismatch,
		quotesMismatch,
		InvalidBracket,
	}

	export class ParseErrorBase extends Error {
		/**The string index at which the error occurred */
		readonly position: number;
		readonly errorType: E_ParseErrorType;

		constructor(name: string, errorAt: number, errorType: E_ParseErrorType) {
			super(name);
			this.position = errorAt;
			this.errorType = errorType;
		}
	}

	export class SpaceNotFound extends ParseErrorBase {
		constructor(errorAt: number) {
			super("Space not found", errorAt, E_ParseErrorType.spaceNotFound);
		}
	}

	export class NoClosingQuoteFound extends ParseErrorBase {
		constructor(errorAt: number) {
			super(
				"No closing quote found",
				errorAt,
				E_ParseErrorType.noClosingQuoteFound
			);
		}
	}

	export class InvalidQuotes extends ParseErrorBase {
		constructor(errorAt: number) {
			super("Invalid quotes", errorAt, E_ParseErrorType.InvalidQuotes);
		}
	}

	export class EmptyBrackets extends ParseErrorBase {
		constructor(errorAt: number) {
			super("Empty brackets found", errorAt, E_ParseErrorType.emptyBrackets);
		}
	}

	export class BracketMismatch extends ParseErrorBase {
		constructor(errorAt: number) {
			super("Bracket mismatch", errorAt, E_ParseErrorType.bracketMismatch);
		}
	}

	export class QuotesMismatch extends ParseErrorBase {
		constructor(errorAt: number) {
			super("Quotes mismatch", errorAt, E_ParseErrorType.quotesMismatch);
		}
	}

	export class InvalidBracket extends ParseErrorBase {
		constructor(errorAt: number) {
			super("Invalid bracket found", errorAt, E_ParseErrorType.InvalidBracket);
		}
	}
}
