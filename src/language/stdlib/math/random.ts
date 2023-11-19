import {CR} from "../registry_instance.ts";
import {E_ArgumentTypes as types} from "../../execution/syntax/syntaxdata/ArgumentsData.ts";

//RANDOM
new CR()
    .addAlias("rand", "random", "randFloat", "randomFloat")
    .addDocs("Returns a random floating number, this can take 3 different forms, one takes no argument - return float b/w 0 and 1; second takes one argument (a) - return float b/w 0 and a; third takes two arguments (a,b) - return float b/w a and b", "rand <a?> <b?>", "rand 10")
    .addVarArgs(types.number)
    .addExec((_, ...nums: number[]) => {
        if (nums.length === 0)
            return Math.random();
        else if (nums.length === 1) {
            return Math.random() * nums[0];
        } else if (nums.length == 2) {
            return Math.random() * (nums[1] - nums[0]) + nums[0];
        }
        throw new Error("Invalid number of arguments; Random command takes 0, 1 or 2 arguments");
    })
    .build();

new CR()
    .addAlias("randInt", "randomInt")
    .addDocs("Returns a random integer between two numbers, both inclusive", "randint a b", "randint 1 10")
    .addArgs(2, types.number, types.number)
    .addExec((_, a: number, b: number) => {
        return Math.floor(Math.random() * (b - a + 1)) + a;
    })
    .build();