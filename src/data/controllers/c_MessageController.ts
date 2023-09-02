import { MessageInterface } from "../structures/s_message";

/**
 * This is a controller class for handling everything related to messages.
 * This makes sure that the messages are handled in a centralized manner, ie this forms a single point of truth for the messages;
 */
export class MessageController {
	private messages: MessageInterface[] = [];
	private setMessages: React.Dispatch<
		React.SetStateAction<MessageInterface[]>
	> = () => {};

	/**
	 * This takes in a message state and assigns it to the controller, so that the controller alone can handle it;
	 * @param state The return value of a useState() hook of type Array of messages
	 */
	setMessageState(
		state: [
			MessageInterface[],
			React.Dispatch<React.SetStateAction<MessageInterface[]>>
		]
	) {
		[this.messages, this.setMessages] = state;
	}

	/**
	 * Adds a new message to the end
	 * @param message the message to be added
	 */
	addMessage(message: MessageInterface) {
		this.setMessages((messages) => [...messages, message]);
	}

	/**
	 * Returns the list of all message
	 */
	getAllMessages() {
		return this.messages;
	}

	/**
	 * searches for a message with the given ID
	 * @param id The ID of the message to be searched
	 * @returns returns the message object if found else null
	 */
	getMessage(id: string): (MessageInterface | null) {
		for(let message of this.messages) {
			if(message.id === id)
				return message;
		}
		return null;
	}


}
