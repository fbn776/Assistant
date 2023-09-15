import { Parser } from "../parser/parser";
import { GlobalController } from "../../controllers/c_Controller";
import { SyntaxCommand, SyntaxLiteral } from "../syntax/syntax";
import { EvalErrors } from "../errors/evalErrors";
import { E_ArgumentTypes } from "../syntax/command";
import EvaluatorUtils from "./evaluatorUtils";

/**Execution class, executes the command string to a fixed value */
export class Executer {
	private readonly _globCtrl: GlobalController;
	private readonly _parser = new Parser();

	constructor(globalCtrl: GlobalController) {
		this._globCtrl = globalCtrl;
	}

	/**
	 * This executes a string (possibly commands in strings).
	 * This functions first parses the string and converts it to a SyntaxTree.
	 *
	 * If there are errors in the parse phase, then errors are return these errors are instance of `ParseError`, handle parse errors by this info.
	 * If no errors, then root(SyntaxCommand) of the SyntaxTree is taken and fed into a recursive function `_executeCommand`
	 * @see _executeCommand
	 * Again, if errors are found then those errors are returned, the errors returned in this phase are instance of `CompileErrors`.
	 *
	 * NOTE: Sometimes the returned errors are not of type `ParseError` or `CompileErrors` they are just plain `Error`.
	 * If this happens then there's something wrong with the code. Fix it 🥲.
	 */
	execute(str: string): any | Error {
		let parsed = this._parser.parse(str);
		//If error return the error
		if (parsed instanceof Error) return parsed;

		try {
			let exec = this._executeCommand(parsed.root!);
			return exec;
		} catch (error) {
			return error;
		}
	}

	/**
	 * A recursive function for executing the parsed SyntaxTree and outputs the defined return type.
	 * If there are errors in SyntaxCommand, then errors are thrown. These doesn't handle errors.
	 * So the errors should be handled by when using this function
	 */
	private _executeCommand(input: SyntaxCommand) {
		let inputCmd = input,
			/**Name of the command user entered*/
			inputCmdName = inputCmd!.name,
			/**User entered command arguments*/
			inputArgs = inputCmd.arguments;

		//Check if the root command exists in the registry;
		if (!this._globCtrl.command.registry!.exists(inputCmdName))
			throw new EvalErrors.CommandNotFound();

		/**The corresponding command object taken from the command registry */
		let cmdObj = this._globCtrl.command.registry!.getCommandData(inputCmdName)!;
		/**The corresponding command arguments*/
		let cmdArgs = cmdObj.arguments;
		/**The required number of arguments taken from command object in registry */
		let reqArgsNums = cmdArgs.requiredNumber;

		/**If the required number of arguments are positive and not equal to input command argument number then throw error
		 * @see ArgumentsData rule 2 (c)
		 */
		if (reqArgsNums > 0 && inputArgs.length !== reqArgsNums)
			throw new EvalErrors.ArgumentsNumberMismatch(cmdObj, inputCmd);

		/**If number of arg types is 1 then the type but `cmdArgs` length != 1 then take this type to be the type of all other arguments
		 * Take the type to be uniform
		 */
		let generalType: E_ArgumentTypes | null = null;
		if (cmdObj.arguments.types.length === 1)
			generalType = cmdObj.arguments.types[0];

		/**If the required number is 0, then straight up execute and return the value*/
		if (reqArgsNums === 0) return cmdObj.exec(this._globCtrl);

		/**Traverse through the arguments, convert the given arguments to a evaluvatable form.
		 * ie the `inputArgs` is made of SyntaxLiteral or SyntaxCommand;
		 * if SyntaxLiteral, then convert then taken the literal to the require JS type and place it in the argument position, and continue.
		 * else (its a Syntax Command), then recursive call this function, but with input as current value and then resolve this function to a single value, and continue
		 */
		inputArgs = inputArgs.map((arg, i) => {
			if (arg instanceof SyntaxLiteral) {
				//If its a general type, then take the general type value; else get the corresponding type value for command definition;
				let type = generalType || cmdObj.arguments.types[i];

				//If the Literal cannot be converted to the type, then throw error;
				if (!EvaluatorUtils.canConvertToType(arg.name, type))
					throw new EvalErrors.IncorrectType();

				return EvaluatorUtils.convertToType(arg.name, type);
			}
			//For now the syntax tree can only contain SyntaxLiteral or SyntaxCommand, but if this changes do stuff here;
			//If this reaches here, then this means that arg is a SyntaxCommand;
			return this._executeCommand(arg);
		});

		/**Here the input arguments are converted to JS - native stuff, put these values into the command function, defined in the registry*/
		return cmdObj.exec(this._globCtrl, ...inputArgs);
	}
}
