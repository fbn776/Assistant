import { MESSAGE_SOURCE } from "../../data/structures/s_message";
import { I_UIEventsInput } from "../../data/structures/s_controllers";
import { UIController } from "./c_UIController";

export class UIInputHandler implements I_UIEventsInput {
	private _parent: UIController;
	//Alias
	private get _mainInputRef() {
		return this._parent.dependencies.mainInputRef;
	};

	constructor(parent: UIController) {
		this._parent = parent;
	}

	isEmpty() {
		return this.getText() === "";
	}

	clear() {

		if (this._mainInputRef?.current) this._mainInputRef.current.value = "";
	}

	getText() {
		if (this._mainInputRef?.current) return this._mainInputRef.current.value;

		return "";
	}

	setText(text: string) {
		if (this._mainInputRef?.current) this._mainInputRef.current.value = text;
	}

	insertTextAt(text: string, position?: number) {
		const inputElm = this._mainInputRef?.current;
		if (!inputElm) return;

		let pos = position ? position : this.getCursorPosition(),
			val = this.getText();

		this.setText(val.substring(0, pos) + text + val.substring(pos));
		this.setCursorPosition(pos + 1);
		inputElm.focus();
	}

	getCursorPosition() {
		if (!this._mainInputRef?.current) return -1;
		return this._mainInputRef.current.selectionStart ?? -1;
	}

	setCursorPosition(caretPos: number) {
		var elem = this._mainInputRef?.current;
		if (!elem) return;
		if (elem.selectionStart) {
			elem.focus();
			elem.setSelectionRange(caretPos, caretPos);
		} else elem.focus();
	}

	submit() {
		if (this.isEmpty()) return;

		//When submitting, first display the message as user message;
		this._parent.parent.messageController.addMessage({
			id: Date.now().toString(),
			text: this.getText(),
			source: MESSAGE_SOURCE.USER,
			unixTime: Date.now(),
		});

		this._parent.parent.messageController.addMessage({
			id: (Date.now() + 1).toString(),
			text: `The message is ${this.getText()}`,
			source: MESSAGE_SOURCE.BOT,
			unixTime: Date.now(),
		});

		//If the `clearOnSubmit` setting is set to true, then clear the input;
		if (this._parent.parent.globalSettingsController.getValue("clearOnSubmit"))
			this.clear();
	}
}
