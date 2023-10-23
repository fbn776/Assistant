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


//IF STATEMENT
new CR()
    .addAlias("if")
    .addDocs("IF statement; checks if a condition is true/false and executes the corresponding statement", "if condition <true statement> <false statement>", "if (")
    .addVarArgs(types.command)
    .addExec((_, ...args: any[]) => {
        if (args.length < 2) throw new Error("IF statement requires at least 2 arguments");

        if (args[0]()) return args[1]();
        else if (args.length > 2) return args[2]();
    })
    .build();

//PRINT
new CR()
    .addAlias("print", "p", "msg", "message")
    .addDocs("Prints the given value to the console", "print value1 value2 ...", "print 1")
    .addVarArgs(types.string)
    .addExec((_, ...args: string[]) => {
        _.message.quickies.botTextReply(args.join(" "));
        return null;
    })
    .build();

//CLEAR
new CR()
    .addAlias("clear", "cls", "clr")
    .addDocs("Clears the messages (not delete, just removes them from the screen)", "clear", "clear")
    .addNoArgs()
    .addExec((_) => {
        _.message.clearMessages();
        return null;
    })
    .build();

//HELP
new CR()
    .addAlias("help", "h", "man", "manual")
    .addDocs("Shows the help message", "help", "help")
    .addVarArgs(types.string)
    .addExec((_, ...args: string[]) => {
        if(args.length === 0) {
            _.message.quickies.botTextReply("Help message");
            return null;
        } else if (args.length === 1) {
            _.message.quickies.botTextReply("Manual page: " + args[0]);
            return null;
        } else {
            throw new Error("HELP command takes at most 1 argument")
        }
    })
    .build();