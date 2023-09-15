import { UIController } from "./c_UIController";
import { debounce } from "../../utils/utils";
import { ParseErrors } from "../../execution/errors/ParseErrors";

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

	/**Focuses the main input */
	focus() {
		this._mainInputRef?.current?.focus();
	}

	/**Checks if the main input felid is empty */
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
		this.setCursorPosition(pos + text.length);
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
	/**
	 * Controls the backward and forward history of the input; Used to get previously typed messages.
	 * The _historyIndex is used to keep track of the current index of the history. A higher value means an older message and a lower value means a newer message.
	 * ie 0 means the last typed, 1 means the second last typed and so on...
	 * *It is important to reset the _historyIndex to -1 when a new message is submitted.
	 * @see setToPreviousHistory
	 * @see setToNextHistory
	 */
	private _historyIndex = -1;

	/**Sets the previous item in history to the input box
	 * @returns true if it is able to go to previous; false if the start of the history is reached
	 */
	setToPreviousHistory() {
		this._historyIndex++;

		if (this._historyIndex > this._globCtrl.message.userCount - 1) {
			this._historyIndex = this._globCtrl.message.userCount - 1;
			return false;
		}

		let msg = this._globCtrl.message.getUserMessageAtIndexFromLast(
			this._historyIndex
		);
		this.setText(msg?.text ?? "");

		return true;
	}

	/**Sets the next item in history to the input box
	 * @returns true if it is able to go to next; false if the end of the history is reached
	 */
	setToNextHistory() {
		this._historyIndex--;

		if (this._historyIndex < 0) {
			this._historyIndex = 0;
			return false;
		}

		let msg = this._globCtrl.message.getUserMessageAtIndexFromLast(
			this._historyIndex
		);
		this.setText(msg?.text ?? "");
		return true;
	}

	/**Sets the input value to the last user message */
	setToLastMessage() {
		this.setText(this._globCtrl.message.getLastUserMessage()?.text ?? "");
	}

	/**Selects the all the text in the main input text box */
	selectAllText() {
		if (!this._mainInputRef?.current) return;

		this._mainInputRef.current.select();
		this._mainInputRef.current.setSelectionRange(0, 99999);
	}

	/**Copies text from the main input to the clipboard */
	async copyText() {
		if (!this.isEmpty() && !navigator.clipboard) return;

		this.focus();

		try {
			await navigator.clipboard.writeText(this.getText());
			this.selectAllText();
		} catch (err) {
			console.error("Failed to copy: ", err);
		}
	}

	/** Cuts text from the main input to the clipboard */
	async cutText() {
		this.copyText();
		this.clear();
	}

	pasteText(onSuccess: () => void, onError: (e: any) => void) {
		this.focus();
		navigator.clipboard
			.readText()
			.then((clipText) => {
				this.insertTextAt(clipText);
				onSuccess();
			})
			.catch(onError);
	}

	/**Submission event; pushes a new message to the message controller, the executes and then push the result message
	 */
	evalInputText() {
		const text = this.getText();
		if (this.isEmpty()) return;
		const _msgCtrl = this._globCtrl.message;

		//When submitting, first display the message as user message;
		this._globCtrl.message.quickies.userMessage(text);

		let final = this._globCtrl.executer.execute(text);
		if (final instanceof Error) {
			if (final instanceof ParseErrors.ParseError)
				_msgCtrl.quickies.commandTypo(text, final);
			_msgCtrl.quickies.errorMsg(final.message);
		} else {
			_msgCtrl.quickies.botTextReply(final);
		}

		//If the `clearOnSubmit` setting is set to true, then clear the input;
		if (this._globCtrl.globalSettings.getValue("clearOnSubmit")) this.clear();

		//Scroll to the last message element
		if (this._globCtrl.globalSettings.getValue("scrollToNewMessage"))
			/*Used a timeout here; because the message added above are not instantly added, they take some time (due to state management by react).
			So a timeout is used to access the above added message*/
			setTimeout(() => this._parent.message.containerScrollToBottom(), 0);

		this._historyIndex = -1;
	}

	/**A debounced eval, this does the same thing as the `evalInputText`, but is wrapped in a debounce, the denouncer is set at 150ms */
	debouncedEval = debounce(this.evalInputText, 150);
}
