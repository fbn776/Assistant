import {CR} from "../registry_instance";
import { E_ArgumentTypes as types } from "../../execution/syntax/syntaxdata/ArgumentsData";

new CR()
	.addAlias("add", "plus")
	.addDocs("Adds two numbers together", "number1", "number2")
	.addArgs(2, types.number, types.number)
	.addExec((_, a: number, b: number) => {
		return a + b;
	})
	.build();

new CR()
	.addAlias("subtract", "minus")
	.addDocs("Subtracts two numbers", "number1", "number2")
	.addArgs(2, types.number, types.number)
	.addExec((_, a: number, b: number) => {
		return a - b;
	})
	.build();

