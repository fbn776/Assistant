import {CR} from "../../registry_instance.ts";
import { E_ArgumentTypes as types } from "../../../execution/syntax/syntaxdata/ArgumentsData.ts";

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

new CR()
	.addAlias("sum")
	.addDocs("Find the sum of the given list of numbers", "", "")
	.addVarArgs(types.number)
	.addExec((_, ...nums: number[]) => {
		if(nums.length === 0) throw new Error("Argument list is empty")

		return nums.reduce((val: number, curr: number) => {
			return val + curr;
		});
	})
	.build();

