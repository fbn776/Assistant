import {CR} from "../registry_instance.ts";
import {E_ArgumentTypes as types} from "../../execution/syntax/syntaxdata/ArgumentsData.ts";
import {GCDList, ProdList} from "../../utils/command_helpers/helpers.ts";

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

//SQUARE ROOT
new CR()
    .addAlias("root", "sqrt")
    .addDocs("Returns the square root")
    .addMonoArgs(types.number)
    .addExec((_, a: number) => Math.sqrt(a))
    .build();

//ABSOLUTE VALUE
new CR()
    .addAlias("abs", "absolute")
    .addDocs("Returns the absolute value")
    .addMonoArgs(types.number)
    .addExec((_, a: number) => Math.abs(a))
    .build();

//FACTORIAL
new CR()
    .addAlias("fact", "factorial")
    .addDocs("Returns the factorial")
    .addMonoArgs(types.number)
    .addExec((_, a: number) => {
        if (a <= 1)
            return 1;

        let r = 1;
        for (let i = 1; i <= a; i++)
            r *= i;

        return r;
    })
    .build();

//LOGARITHM 10
new CR()
    .addAlias("log", "log10")
    .addDocs("Returns the logarithm to the base 10")
    .addMonoArgs(types.number)
    .addExec((_, a: number) => Math.log10(a))
    .build();

//LOGARITHM 2
new CR()
    .addAlias("log2")
    .addDocs("Returns the logarithm to the base 2")
    .addMonoArgs(types.number)
    .addExec((_, a: number) => Math.log2(a))
    .build();

//LOGARITHM e
new CR()
    .addAlias("loge", "ln")
    .addDocs("Returns the natural logarithm")
    .addMonoArgs(types.number)
    .addExec((_, a: number) => Math.log(a))
    .build();

//GCD
new CR()
    .addAlias("gcd", "hcf")
    .addDocs("Returns the Greatest Common Divisor (GCD) of a list of numbers")
    .addVarArgs(types.number)
    .addExec((_, ...nums: number[]) => {
        if (nums.length === 0) throw new Error("Argument list is empty")
        return GCDList(...nums);
    })
    .build();

//LCM
new CR()
    .addAlias("lcm")
    .addDocs("Returns the Largest Common Multiplier of a list of numbers")
    .addVarArgs(types.number)
    .addExec((_, ...nums: number[]) => {
        if (nums.length === 0) throw new Error("Argument list is empty")
        return ProdList(...nums) / GCDList(...nums);
    })
    .build();

//ROUND
new CR()
	.addAlias("round")
	.addDocs("Rounds a number to the nearest integer", "round a", "round 1.5")
	.addMonoArgs(types.number)
	.addExec((_, a: number) => Math.round(a))
	.build();

//FLOOR
new CR()
	.addAlias("floor")
	.addDocs("Returns the largest integer less than or equal to a given number", "floor a", "floor 1.5")
	.addMonoArgs(types.number)
	.addExec((_, a: number) => Math.floor(a))
	.build();

//CEIL
new CR()
	.addAlias("ceil")
	.addDocs("Returns the smallest integer greater than or equal to a given number", "ceil a", "ceil 1.5")
	.addMonoArgs(types.number)
	.addExec((_, a: number) => Math.ceil(a))
	.build();

