import {CR} from "../registry_instance.ts";
import {E_ArgumentTypes as types} from "../../execution/syntax/syntaxdata/ArgumentsData.ts";

//EQUALITY
new CR()
    .addAlias("eq", "equals", "equal", "is")
    .addDocs("Checks if two values are equal", "eq a b", "eq 1 2")
    .addArgs(2, types.any)
    .addExec((_, a: any, b: any) => a === b)
    .build();

//INEQUALITY
new CR()
    .addAlias("neq", "not-equals", "not-equal", "is-not")
    .addDocs("Checks if two values are not equal", "neq a b", "neq 1 2")
    .addArgs(2, types.any)
    .addExec((_, a: any, b: any) => a !== b)
    .build();

//GREATER THAN
new CR()
    .addAlias("gt", "greater-than")
    .addDocs("Checks if a value is greater than another", "gt a b", "gt 1 2")
    .addArgs(2, types.number)
    .addExec((_, a: number, b: number) => a > b)
    .build();

//LESS THAN
new CR()
    .addAlias("lt", "less-than")
    .addDocs("Checks if a value is less than another", "lt a b", "lt 1 2")
    .addArgs(2, types.number)
    .addExec((_, a: number, b: number) => a < b)
    .build();

//GREATER THAN OR EQUAL TO
new CR()
    .addAlias("gte", "greater-than-equal", "greater-than-or-equal")
    .addDocs("Checks if a value is greater than or equal to another", "gte a b", "gte 1 2")
    .addArgs(2, types.number)
    .addExec((_, a: number, b: number) => a >= b)
    .build();

//LESS THAN OR EQUAL TO
new CR()
    .addAlias("lte", "less-than-equal", "less-than-or-equal")
    .addDocs("Checks if a value is less than or equal to another", "lte a b", "lte 1 2")
    .addArgs(2, types.number)
    .addExec((_, a: number, b: number) => a <= b)
    .build();
