import { GlobalController } from "../../controllers";
import ParserUtils from "./parserUtils";
import { SyntaxTree } from "./syntax";

export class Parser {
	private _globalController: GlobalController;
	constructor(globalController: GlobalController) {
		this._globalController = globalController;
	}

	parse(input: string): SyntaxTree | Error {
		try {
			let stage1 = ParserUtils.tertiaryParser(input);
			let stage2 = ParserUtils.primaryParser(stage1);			
			return stage2;
		} catch (error) {
			return error as Error;
		}
	}
}
