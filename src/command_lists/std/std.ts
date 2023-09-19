import { RC_NoArgs, RC_triArgs } from '../registry_instance';
import { E_ArgumentTypes as types } from "../../execution/syntax/command/ArgumentsData";


/**Clears the screen */
RC_NoArgs(
	["clear", "cls", "clr"],
	["Clears the screen"],
	(ctrl) => {
		ctrl.message.deleteLocalData()
		return "Cleared"
	}
)

/**Reloads the page */
RC_NoArgs(
	["refresh", "reload"],
	["Reloads the page"],
	(_) => {
		window.location.reload()
		return "Reloaded"
	}
)

/**Displays help menu */
RC_NoArgs(
	["help", "h"],
	["Shows the help menu"],
	() => {
		return "Help; TODO"
	}
)

/**IF statement */
RC_triArgs(
	["if"],
	[types.boolean, types.any, types.any],
	["An if statement"],
	(_, a: boolean, b: any, c: any) => {
		console.log(a, b, c)
		return a ? b : c;
	}
)