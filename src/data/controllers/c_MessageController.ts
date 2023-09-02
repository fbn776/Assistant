import { MessageInterface } from "../structures/s_message";

export class MessageController {
	private messages: MessageInterface[] = [];
	private setMessages: React.Dispatch<
		React.SetStateAction<MessageInterface[]>
	> = () => {};

	/**
	 * This takes in a message state and assigns it to the controller, so that the controller alone can handle it;
	 * @param state
	 */
	setMessageState(
		state: [
			MessageInterface[],
			React.Dispatch<React.SetStateAction<MessageInterface[]>>
		]
	) {
		[this.messages, this.setMessages] = state;
	}

	addMessage(message: MessageInterface) {
		this.setMessages((messages) => [...messages, message]);
	}

	getAllMessages() {
		return this.messages;
	}
}
