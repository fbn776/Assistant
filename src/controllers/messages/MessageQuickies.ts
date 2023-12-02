import { MessageController } from "..";
import { MESSAGE_SOURCE, MESSAGE_TYPE } from "../../data/structures/s_message";
import { ParseErrors } from "../../language/execution/errors/parseErrors";

/**
 * A utility class that helps for quick message dispatch
 */
export default class MessageQuickies {
	private _parent;

	constructor(parent: MessageController) {
		this._parent = parent;
	}

	/**Represents a user sent message */
	userMessage(userText: string, time = Date.now()) {
		this._parent.addMessage({
			source: MESSAGE_SOURCE.USER,
			text: userText,
			type: MESSAGE_TYPE.TEXT,
			unixTime: time,
			id: this._parent.generateRandomID(),
		});
	}

	/**A simple plain text reply from the bot */
	botTextReply(botText: string, time = Date.now()) {
		this._parent.addMessage({
			source: MESSAGE_SOURCE.BOT,
			text: botText,
			type: MESSAGE_TYPE.TEXT,
			unixTime: time,
			id: this._parent.generateRandomID(),
		});
	}

	/**Represents an error message.
	 * This is used when there is an error/typo in the command
	 * This displays the position along with the command at which the error occurred. This is sent by the bot
	 */
	errorMsg(error: string) {
		this._parent.addMessage({
			source: MESSAGE_SOURCE.BOT,
			text: error,
			type: MESSAGE_TYPE.ERROR,
			unixTime: Date.now(),
			id: this._parent.generateRandomID(),
		});
	}

	/**The same as command error, but has additional formatting */
	commandTypo(command: string, error: ParseErrors.ParseError) {
		this._parent.addMessage({
			source: MESSAGE_SOURCE.BOT,
			text: command,
			type: MESSAGE_TYPE.FORMATTED_ERROR,
			unixTime: Date.now(),
			id: this._parent.generateRandomID(),
			additionalData: {
				heading: "Command Typo",
				errorMsg: error.message,
				position: error.position,
			},
		});
	}

	// helpText(data: I_HelpMessageFormat) {
	// 	this._parent.addMessage({
	// 		source: MESSAGE_SOURCE.BOT,
	// 		text: command,
	// 		type: MESSAGE_TYPE.FORMATTED_ERROR,
	// 		unixTime: Date.now(),
	// 		id: this._parent.generateRandomID(),
	// 		additionalData: {
	// 			heading: "Command Typo",
	// 			errorMsg: error.message,
	// 			position: error.position,
	// 		},
	// 	});
	// }
}
