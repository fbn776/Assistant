import { Parser } from "./parser/parser";
import { GlobalController } from "../controllers/c_Controller";
import { SyntaxTree } from "./parser/syntax";
import { SyntaxItemBase } from "./parser/syntax";
import { CompilerErrors } from "./compileErrors";

export class Executer {
	private readonly _globCtrl: GlobalController;
	readonly Parser = new Parser();

	constructor(globalCtrl: GlobalController) {
		this._globCtrl = globalCtrl;
	}

	compile(str: string) {
		let parsed = this.Parser.parse(str);
		if(parsed instanceof Error)
			return parsed;

		this.execute(parsed);

		return parsed;
	}

	execute(input: SyntaxTree | SyntaxItemBase) {
		if (input instanceof SyntaxTree) {
			let root = input.root,
				cmdName = root!.name;

			
			//Check if the root command exists in the registry;
			if (!this._globCtrl.commandController.registry!.exists(cmdName))
				throw new CompilerErrors.CommandNotFound();
			
			let cmd = this._globCtrl.commandController.registry?.getCommandData(cmdName)

			console.log(cmd)
			
		}
	}
}
