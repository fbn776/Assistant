import { MessageController } from "..";
import { MESSAGE_SOURCE, MESSAGE_TYPE } from "../../data/structures/s_message";


export class MessageQuickiesHandler {
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
		})
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

	/**This message represents a error message.
	 * This message is used when there is an error/typo in the command
	 * This displays the position along with the command at which the error occurred.
	 */
	commandError() {

	}

}