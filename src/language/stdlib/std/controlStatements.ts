import {CR} from "../registry_instance.ts";
import {E_ArgumentTypes as types} from "../../execution/syntax/syntaxdata";

//EVAL
new CR()
    .addAlias("eval")
    .addDocs("Evaluates command(s), returns the last evaluated result", "eval <command/> <command/> ...", "eval (add 1 2)")
    .addVarArgs(types.command)
    .addExec((_, ...args: (() => {})[]) => {
        let result;
        for (let arg of args) {
            result = arg();
        }
        return result;
    })
    .build();


//IF STATEMENT
new CR()
    .addAlias("if", "check")
    .addDocs("IF statement; checks if a condition is true/false and executes the corresponding statement", "if condition <if true then statement> <if false the statement>", "if (eq 1 2) (add 3 2) (add 5 4)")
    .addVarArgs(types.command)
    .addExec((_, ...args: any[]) => {
        if (args.length < 2) throw new Error("IF statement requires at least 2 arguments");

        if (args[0]()) return args[1]();
        else if (args.length > 2) return args[2]();
    })
    .build();

/**
 * // Simple while statement
 while (lt (get i) 10) (
 (get i)
 (set i (add (get i) 1))
 )
 */
new CR()
    .addAlias("while")
    .addDocs("")
    .addArgs(2, types.command)
    .addExec((_, a: () => boolean, b: () => any) => {
        const MAX_ITERATIONS = 10000;
        let i = 0;
        while (a() && MAX_ITERATIONS > i) {
            b();
            i++;
        }
    })
    .build()