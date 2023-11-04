/**Standard Commands list**/
import {CR} from "../registry_instance.ts";
import {E_ArgumentTypes as types} from "../../execution/syntax/syntaxdata/ArgumentsData.ts";

//PRINT
new CR()
    .addAlias("print", "p", "msg", "message", "echo")
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
