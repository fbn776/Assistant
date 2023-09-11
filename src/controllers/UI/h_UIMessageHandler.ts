import { UIController } from "./c_UIController";


interface I_UIEventsMessage {
	
}


export class UIMessageHandler implements I_UIEventsMessage {
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
		if(!list) return null;
		return list[list?.length - 1]
	}

	/**Scrolls the last message into view */
	scrollToLatest() {
		let lastElm = this.getLastElement();
		lastElm?.scrollIntoView({
			block: "end",
			behavior: this._parent.parent.globalSettingsController.getValue(
				"scrollToMessageBehavior"
			) as any,
		});
	}

	
}
