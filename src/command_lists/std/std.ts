import {RC_biArgs, RC_monoArgs, RC_NoArgs, RC_triArgs} from "../registry_instance";
import {E_ArgumentTypes as types} from "../../execution/syntax/syntaxdata/ArgumentsData";

/**Clears the screen */
RC_NoArgs(["clear", "cls", "clr"], ["Clears the screen"], (ctrl) => {
    ctrl.message.deleteLocalData();
    return "Cleared";
});

/**Reloads the page */
RC_NoArgs(["refresh", "reload"], ["Reloads the page"], (_) => {
    window.location.reload();
    return "Reloaded";
});

/**Displays help menu */
RC_NoArgs(["help", "h"], ["Shows the help menu"], () => {
    return "Help; TODO";
});

/**IF statement */
RC_triArgs(
    ["if"],
    [types.boolean, types.any, types.any],
    ["An if statement"],
    (_, a: boolean, b: any, c: any) => {
        console.log(a, b, c);
        return a ? b : c;
    }
);


RC_monoArgs(
    ["print", "p"],
    types.string,
    ["Prints a string"],
    (_, a: string) => {
        _.message.quickies.botTextReply(a);
        return null;
    }
)
RC_biArgs(
    ["repeat"],
    [types.number, types.command],
    ["Repeats a string a number of times"],
    (_, a: number, b: () => any) => {
        if (a < 0) throw new Error("Cannot repeat negative number of times");
        for (let i = 0; i < a; i++) {
            b();
        }

        return "yayyaaa"
    }
)