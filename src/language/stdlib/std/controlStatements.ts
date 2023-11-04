import {CR} from "../registry_instance.ts";
import {E_ArgumentTypes as types} from "../../execution/syntax/syntaxdata";


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

