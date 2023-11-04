import {CR} from "../registry_instance.ts";
import {E_ArgumentTypes as types} from "../../execution/syntax/syntaxdata/ArgumentsData.ts";
import {ProdList} from "../../../utils/command_helpers/helpers.ts";

//ADDITION
new CR()
    .addAlias("add", "plus", "sum")
    .addDocs("Find the sum of the given list of numbers", "add a b c d", "add 1 2 3 4")
    .addVarArgs(types.number)
    .addExec((_, ...nums: number[]) => {
        if (nums.length === 0) throw new Error("Argument list is empty")
        return nums.reduce((val: number, curr: number) => {
            return val + curr;
        });
    })
    .build();

//SUBTRACTION
new CR()
    .addAlias("subtract", "minus", "sub")
    .addDocs("Find the difference of the numbers in a list from left to right", "", "number2")
    .addVarArgs(types.number)
    .addExec((_, ...nums: number[]) => {
        if (nums.length === 0) throw new Error("Argument list is empty")
        return nums.reduce((val: number, curr: number) => {
            return val - curr;
        });
    })
    .build();

//MULTIPLICATION
new CR()
    .addAlias("mult", "multiply", "prod", "product")
    .addDocs("Multiplies a list numbers", "mult a b", "mult 1 4 5")
    .addVarArgs(types.number)
    .addExec((_, ...nums: number[]) => {
        if (nums.length === 0) throw new Error("Argument list is empty")
        return ProdList(...nums);
    })
    .build();

//DIVISION
new CR()
    .addAlias("div", "divide")
    .addDocs("Divides two numbers", "div a b")
    .addArgs(2, types.number)
    .addExec((_, a: number, b: number) => a / b)
    .build()

//REMINDER
new CR()
    .addAlias("modulo", "rem", "reminder", "mod")
    .addDocs("Get the reminder of two numbers", "mod a b")
    .addArgs(2, types.number)
    .addExec((_, a: number, b: number) => a % b)
    .build()

//EXPONENTIATION
new CR()
    .addAlias("exp", "power", "pow")
    .addDocs("Returns the result exponential expression")
    .addArgs(2, types.number)
    .addExec((_, a: number, b: number) => Math.pow(a, b))
    .build();
