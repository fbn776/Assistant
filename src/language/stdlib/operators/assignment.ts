import {CR} from "../registry_instance.ts";
import {E_ArgumentTypes as types} from "../../execution/syntax/syntaxdata/ArgumentsData.ts";

//ASSIGNMENT
new CR()
    .addAlias("set", "let", "assign")
    .addDocs("This creates a new variable and assigns it a value", "set <varible name> <value>", "set a 5")
    .addVarArgs(types.any)
    .addExec((_, ...args: any[]) => {
        if(args.length < 2) throw new Error("Variable assignment statement requires at least 2 arguments, a name and value(s)");

        /**
         * NOTE: The variables are stored in the local store.
         * If there are more than 2 arguments the value is an array of the rest of the arguments, excluding the 1st element.
         */
        return _.command.localStore.setVar(args[0], args.length === 2 ? args[1] : args.slice(1));
    })
    .build();

//GET
new CR()
    .addAlias("get")
    .addMonoArgs(types.string)
    .addDocs("This returns the value of a variable", "get <varible name>", "get a")
    .addExec((_, a: string) => {
        if(!_.command.localStore.hasVar(a)) throw new Error(`Variable '${a}' does not exist`)
        return _.command.localStore.getVar(a)
    })
    .build();
