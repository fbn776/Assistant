import { I_Message, MESSAGE_SOURCE } from "../data/structures/s_message";
import { BaseController } from "./c_BaseController";
import { GlobalController } from "./c_Controller";

/**
 * This is a controller class for handling related to messages storing, retrieving, deletion and addition.
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

	/** The length or number of messages stored */
	get count() {
		return this.messages.length;
	}

	/**The length or number of user sourced messages stored */
	get userCount() {
		return this.getAllUserMessages().length;
	}

	/**The length or number of bot sourced message stored */
	get botCount() {
		return this.getAllBotMessages().length;
	}

	/**Adds a new message to the message list
	 * @param message The message object to be added
	 */
	addMessage(message: I_Message) {
		this.setMessages((messages) => [...messages, message]);
	}

	/**Returns the list of all messages */
	getAllMessages() {
		return this.messages;
	}

	/**Returns the message at a given index */
	getMessageAtIndex(index: number) {
		if (index < 0 || index >= this.messages.length) return null;
		return this.messages[index];
	}

	/**Returns the message at a given index; but indexing is reversed. ie the last message is at index 0.
	 */
	getMessageAtIndexFromLast(index: number) {
		if (index < 0 || index >= this.messages.length) return null;
		return this.messages[this.messages.length - index - 1];
	}

	/**Returns the i-th user message from the beginning*/
	getUserMessageAtIndex(index: number) {
		if (index < 0 || index >= this.messages.length) return null;
		let i = 0,
			j = 0;
		while (i < this.messages.length) {
			if (this.messages[i].source === MESSAGE_SOURCE.USER) {
				if (j === index) return this.messages[i];
				j++;
			}
			i++;
		}
		return null;
	}

	/**Returns the i-th user message from the last. That is last user message is at index 0 and so on. */
	getUserMessageAtIndexFromLast(index: number) {
		let l = this.messages.length,
			j = 0;
		if (index < 0 || index >= l) return null;
		while (l--) {
			if (this.messages[l].source === MESSAGE_SOURCE.USER) {
				if (j === index) return this.messages[l];
				j++;
			}
		}
		return null;
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

	/**Gets all the message of source BOT */
	getAllBotMessages() {
		return this.messages.filter(
			(message) => message.source === MESSAGE_SOURCE.BOT
		);
	}

	/**Gets all the message of source USER */
	getAllUserMessages() {
		return this.messages.filter(
			(message) => message.source === MESSAGE_SOURCE.USER
		);
	}

	/**Gets a specific message data of the source *USER* with the given ID */
	getUserMessage(id: string): I_Message | null {
		for (let message of this.getAllUserMessages()) {
			if (message.source === MESSAGE_SOURCE.USER && message.id === id)
				return message;
		}
		return null;
	}

	/**Gets a specific message data of the source *BOT* with the given ID */
	getBotMessage(id: string): I_Message | null {
		for (let message of this.getAllUserMessages()) {
			if (message.source === MESSAGE_SOURCE.BOT && message.id === id)
				return message;
		}
		return null;
	}

	/**Returns the last message data in the messages array */
	getLastMessage() {
		return this.messages[this.messages.length - 1];
	}

	/**Gets the last user message data
	 *
	 * This could be written another using the `getLastUserMessage()` function, but performance wise this is better;
	 */
	getLastUserMessage() {
		let l = this.messages.length;
		while (l--) {
			if (this.messages[l].source === MESSAGE_SOURCE.USER)
				return this.messages[l];
		}
		return null;
	}

	/**Gets the last bot message data
	 *
	 * This could be written another using the `getLastUserMessage()` function, but performance wise this is better;
	 */
	getLastBotMessage() {
		let l = this.messages.length;
		while (l--) {
			if (this.messages[l].source === MESSAGE_SOURCE.BOT)
				return this.messages[l];
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
