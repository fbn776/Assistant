import { I_Message } from "../data/structures/s_message";
import { BaseController } from "./BaseController";
import { GlobalController } from "./c_Controller";

/**
 * This is a controller class for handling everything related to messages.
 * This makes sure that the messages are handled in a centralized manner, ie this forms a single point of truth for the messages;
 */
export class MessageController extends BaseController {
	CONTROLLER_NAME = "MessageController";
	parent: GlobalController = null as any;

	private messages: I_Message[] = [];
	private setMessages: React.Dispatch<React.SetStateAction<I_Message[]>> =
		() => {};

	
	/**
	 * This initializes the message state.
	 * @param state The return value of a useState() hook of type Array of messages
	 */
	init(
		state: [I_Message[], React.Dispatch<React.SetStateAction<I_Message[]>>]
	) {
		[this.messages, this.setMessages] = state;
	}

	addMessage(message: I_Message) {
		this.setMessages((messages) => [...messages, message]);
	}

	getAllMessages() {
		return this.messages;
	}

	/**
	 * searches for a message with the given ID
	 * @param id The ID of the message to be searched
	 * @returns returns the message object if found else null
	 */
	getMessage(id: string): I_Message | null {
		for (let message of this.messages) {
			if (message.id === id) return message;
		}
		return null;
	}

	/**
	 * Deletes the messages stored locally.
	 */
	deleteLocalData() {
		//TODO
	}
}
