import { MESSAGE_SOURCE } from "../../data/structures/s_message";
import { UIController } from "./c_UIController";

export class UIInputHandler {
	private _parent;

	//Alias
	private get _globCtrl() {
		return this._parent.parent;
	}
	private get _mainInputRef() {
		return this._parent.dependencies.mainInputRef;
	}

	constructor(parent: UIController) {
		this._parent = parent;
	}

	isEmpty() {
		return this.getText() === "";
	}

	/**Clears the main input */
	clear() {
		if (this._mainInputRef?.current) this._mainInputRef.current.value = "";
	}

	/**Gets the main input text */
	getText() {
		if (this._mainInputRef?.current) return this._mainInputRef.current.value;

		return "";
	}

	/**Sets the value of the input text box to the given text value. This removes any previous text */
	setText(text: string) {
		if (this._mainInputRef?.current) this._mainInputRef.current.value = text;
	}

	/**Insert a piece of text at the given position; if no position is given then, it inputs text at the current cursor position*/
	insertTextAt(text: string, position?: number) {
		const inputElm = this._mainInputRef?.current;
		if (!inputElm) return;

		let pos = position ? position : this.getCursorPosition(),
			val = this.getText();

		this.setText(val.substring(0, pos) + text + val.substring(pos));
		this.setCursorPosition(pos + 1);
		inputElm.focus();
	}

	/**Returns the caret (cursor) position of the input; in case of an error this returns -1*/
	getCursorPosition() {
		if (!this._mainInputRef?.current) return -1;
		return this._mainInputRef.current.selectionStart ?? -1;
	}

	/**Sets the cursor position of the input to the specified position. This also focuses the input.
	 *
	 * ! **NOTE: Has doubt regarding the compatibility of this function.**
	 */
	setCursorPosition(caretPos: number) {
		var elm = this._mainInputRef?.current;
		if (!elm) return;
		if (elm.selectionStart != null) {
			elm.focus();
			elm.setSelectionRange(caretPos, caretPos);
		} else elm.focus();
	}

	/**Move the cursor a specified distance; depending on the sign the cursor moves forward(+) or backwards(-) */
	offsetCursor(offset: number) {
		let txtLen = this.getText().length,
			pos = this.getCursorPosition() + offset;
		pos = pos > txtLen - 1 ? txtLen : pos < 0 ? 0 : pos;

		this.setCursorPosition(pos);
	}

	/**Submission event; pushes a new message to the message controller, the executes and then push the result message 
	 * @param text An optional parameter; The text to be submitted; if not given then the text in the input is used; (Used mainly for testing purposes)
	*/
	submit(text?: string) {
		if (this.isEmpty()) return;

		//When submitting, first display the message as user message;
		this._globCtrl.messageController.addMessage({
			id: Date.now().toString(),
			text: this.getText(),
			source: MESSAGE_SOURCE.USER,
			unixTime: Date.now(),
		});

		this._globCtrl.messageController.addMessage({
			id: (Date.now() + 1).toString(),
			text: `The message is ${this.getText()}`,
			source: MESSAGE_SOURCE.BOT,
			unixTime: Date.now(),
		});

		//If the `clearOnSubmit` setting is set to true, then clear the input;
		if (this._globCtrl.globalSettingsController.getValue("clearOnSubmit"))
			this.clear();

		//Scroll to the last message element
		if (this._globCtrl.globalSettingsController.getValue("scrollToNewMessage"))
			/*Used a timeout here; because the message added above are not instantly added, they take some time (due to state management by react).
			So a timeout is used to access the above added message*/
			setTimeout(() => this._parent.message.scrollToLatest(), 0);
	}

	/**
	 * 
	*/
	private _historyIndex = 0;
	getPreviousHistory() {
		this._historyIndex ++;

		if(this._historyIndex > this._globCtrl.messageController.userCount) {
			this._historyIndex = this._globCtrl.messageController.userCount;
		}

		let msg = this._globCtrl.messageController.getUserMessageAtIndexFromLast(this._historyIndex);
		this.setText(msg?.text ?? "")

		console.log(this._historyIndex);
	}

	getNextHistory() {
		this._historyIndex --;

		if(this._historyIndex < 0) {
			this._historyIndex = 0;
		}

		let msg = this._globCtrl.messageController.getUserMessageAtIndexFromLast(this._historyIndex);
		this.setText(msg?.text ?? "");
		console.log(this._historyIndex)
	}
}
