import { Command } from "../syntax/syntaxdata/Command.ts";
import { SyntaxCommand, SyntaxItemBase } from "../syntax/syntax.ts";
export namespace EvalErrors {
	/**
	 TODO is it really necessary to have a enum error type, can I check that with `instanceof`?
	 TODO Standardized this
	 */
	export enum E_EvalErrorType {
		CommandNotFound,
		Unknown,
		ArgumentsNumberMismatch,
		IncorrectType,
	}

	export class EvalError extends Error {
		readonly type: E_EvalErrorType;
		readonly commandData: Command | null = null;
		readonly foundItem: SyntaxItemBase | null = null;
		constructor(
			txt: string,
			type: E_EvalErrorType,
			cmdData?: Command,
			foundData?: SyntaxItemBase
		) {
			super(txt);
			this.type = type;
			this.commandData = cmdData || null;
			this.foundItem = foundData || null;
		}
	}

	export class CommandNotFound extends EvalError {
		constructor() {
			super("Command not found", E_EvalErrorType.CommandNotFound);
		}
	}

	/**Represents a an unknown error*/
	export class Unknown extends EvalError {
		constructor() {
			super("Unknown error has occurred", E_EvalErrorType.Unknown);
		}
	}

	export class ArgumentsNumberMismatch extends EvalError {
		constructor(cmdData: Command, foundData: SyntaxCommand) {
			super(
				`The number of commands expected by command was ${cmdData.arguments.requiredNumber} but input has ${foundData.arguments.length} arguments`,
				E_EvalErrorType.ArgumentsNumberMismatch,
				cmdData,
				foundData
			);
		}
	}

	export class IncorrectType extends EvalError {
		constructor() {
			super("Incorrect type", E_EvalErrorType.IncorrectType);
		}
	}
}
