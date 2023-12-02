import UIController from "./UIController.ts";

interface I_UIEventsMessage {}

export default class MessageUIHandler implements I_UIEventsMessage {
	private _parent: UIController;
	//Alias
	private get _deps() {
		return this._parent.dependencies;
	}

	constructor(parent: UIController) {
		this._parent = parent;
	}

	/**Returns the message elements list or null is not present */
	getElementList() {
		return this._deps?.messageContainer?.current?.children ?? null;
	}

	/**Gets the last or last pushed message element */
	getLastElement() {
		const list = this._deps?.messageContainer?.current?.children;
		if (!list) return null;
		return list[list?.length - 1];
	}

	/**Scrolls to the bottom of the message container; used when submission of user input text.
	 *  The scroll behavior is determined by the settings value of `scrollToMessageBehavior`. */
	containerScrollToBottom() {
		this._deps.messageContainer?.current!.scrollIntoView({
			block: "end",
			behavior: this._parent.parent.globalSettings.getValue(
				"scrollToMessageBehavior"
			) as any,
		});
	}
}
