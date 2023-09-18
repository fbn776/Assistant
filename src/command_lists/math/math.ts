import { RC } from "../registry_instance";
import { E_ArgumentTypes as types } from "../../execution/syntax/command/ArgumentsData";

RC(
	["math", "add"],
	[2, types.number, types.number],
	["Adds two numbers together", "number1", "number2"],
	(_, a: number, b: number) => {
		return a + b;
	}
);
