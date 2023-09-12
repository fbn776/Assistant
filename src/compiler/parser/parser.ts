import { GlobalController } from "../../controllers";
import ParseError from "./errors";
import ParserUtils from "./parserUtils";

export class Parser {
	private _globalController: GlobalController;
	constructor(globalController: GlobalController) {
		this._globalController = globalController;
	}

	parse(input: string) {
		try {
			let stage1 = ParserUtils.tertiaryParser(input);
			let stage2 = ParserUtils.primaryParser(stage1);

			console.log(stage2);
		} catch (error) {
			
			if (error instanceof ParseError) {
				this._globalController.messageController.quickies.botTextReply(
					error.message
				);
			} else {
				this._globalController.messageController.quickies.botTextReply(
					"An unknown error occurred"
				);
			}
		}
	}
}
