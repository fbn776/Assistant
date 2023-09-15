import { Command } from "./test/Command.ts";
import { SyntaxCommand, SyntaxItemBase } from "./parser/syntax";
export namespace CompilerErrors {

	/**
	 TODO is it really necessary to have a enum error type, can I check that with `instanceof`?
	 TODO Standardized this
	 */
	export enum E_CompileErrorType {
		CommandNotFound,
		Unknown,
		ArgumentsNumberMismatch,
		IncorrectType
	}

	export class CompileError extends Error {
		readonly type: E_CompileErrorType;
		readonly commandData: Command | null = null;
		readonly foundItem: SyntaxItemBase | null = null;
		constructor(txt: string, type: E_CompileErrorType, cmdData?: Command, foundData?: SyntaxItemBase) {
			super(txt);
			this.type = type;
			this.commandData = cmdData || null;
			this.foundItem = foundData || null;
		}
	}

	export class CommandNotFound extends CompileError {
		constructor() {
			super("Command not found", E_CompileErrorType.CommandNotFound);
		}
	}

	export class Unknown extends CompileError {
		constructor() {
			super("Unknown error has occurred", E_CompileErrorType.Unknown);
		}
	}

	export class ArgumentsNumberMismatch extends CompileError {
		constructor(cmdData: Command, foundData: SyntaxCommand) {
			super(
				`The number of commands expected by command was ${cmdData.arguments.requiredNumber} but input has ${foundData.arguments.length} arguments`,
				E_CompileErrorType.ArgumentsNumberMismatch,
				cmdData,
				foundData
			);
		}
	}

	export class IncorrectType extends CompileError {
		constructor() {
			super("Incorrect type", E_CompileErrorType.IncorrectType)
		}
	}
}
