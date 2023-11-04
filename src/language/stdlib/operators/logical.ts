import {CR} from "../registry_instance.ts";
import {E_ArgumentTypes as types} from "../../execution/syntax/syntaxdata";

//AND
new CR()
    .addAlias("and")
    .addDocs("Checks if two values are true", "and a b", "and true false")
    .addArgs(2, types.boolean)
    .addExec((_, a: boolean, b: boolean) => a && b)
    .build();

//OR
new CR()
    .addAlias("or")
    .addDocs("Checks if one of two values is true", "or a b", "or true false")
    .addArgs(2, types.boolean)
    .addExec((_, a: boolean, b: boolean) => a || b)
    .build();

//NOT
new CR()
    .addAlias("not")
    .addDocs("Checks if a value is false", "not a", "not true")
    .addArgs(1, types.boolean)
    .addExec((_, a: boolean) => !a)
    .build();

