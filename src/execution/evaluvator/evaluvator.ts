import { Parser } from "../parser/Parser";
import { GlobalController } from "../../controllers/c_Controller";
import { SyntaxCommand, SyntaxLiteral } from "../syntax/syntax";
import { CompilerErrors } from "../errors/compileErrors";
import { E_ArgumentTypes } from "../syntax/command";
import EvaluatorUtils from "./evaluatorUtils";

export class Executer {
	private readonly _globCtrl: GlobalController;
	readonly Parser = new Parser();

	constructor(globalCtrl: GlobalController) {
		this._globCtrl = globalCtrl;
	}

	compile(str: string) {
		let parsed = this.Parser.parse(str);
		if (parsed instanceof Error) return parsed;

		try {
			let exec = this.execute(parsed.root!);
			return exec;
		} catch (error) {
			return error;
		}
	}

	execute(input: SyntaxCommand) {
		let root = input,
			//These are the found command
			cmdName = root!.name,
			inputArgs = root.arguments;

		if (!inputArgs) throw new CompilerErrors.Unknown();

		//Check if the root command exists in the registry;
		if (!this._globCtrl.commandController.registry!.exists(cmdName))
			throw new CompilerErrors.CommandNotFound();

		//These contain the original command requirements.
		let cmd =
			this._globCtrl.commandController.registry!.getCommandData(cmdName)!;
		let cmdArgs = cmd.arguments;
		let reqNums = cmdArgs.requiredNumber;

		if (reqNums > 0 && inputArgs.length !== reqNums)
			throw new CompilerErrors.ArgumentsNumberMismatch(cmd, root);

		//TODO for now variable number of arguments only support uniform type; this will change in the future;
		let generalType: E_ArgumentTypes | null = null;
		if (cmd.arguments.types.length === 1) generalType = cmd.arguments.types[0];

		//TODO For now I haven't decided when there is 0 required arguments, but input has some number of arguments;
		inputArgs = inputArgs.map((arg, i) => {
			if (arg instanceof SyntaxLiteral) {
				//If its a general type, then take the general type value; else get the corresponding type value for command definition;
				let type = generalType || cmd.arguments.types[i];

				if (!EvaluatorUtils.canConvertToType(arg.name, type))
					throw new CompilerErrors.IncorrectType();

				return EvaluatorUtils.convertToType(arg.name, type);
			}
			//For now the syntax tree can only contain SyntaxLiteral or SyntaxCommand, but if this changes do stuff here;
			//If this reaches here, then this means that arg is a SyntaxCommand;
			return this.execute(arg);
		});
		return cmd.exec(...inputArgs);
	}
}
