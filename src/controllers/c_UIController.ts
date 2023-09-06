import { I_UIEventsInput } from "./../data/structures/s_controllers";
import { I_dependencies } from "../data/structures/s_controllers";
import { BaseController } from "./c_BaseController";
import { MESSAGE_SOURCE } from "../data/structures/s_message";

export class UIController extends BaseController {
	CONTROLLER_NAME = "UIController";

	/**Dependencies object for storing different dependencies to which the different events the controller depends on.
	 *
	 * **NOTE: This needs to set at first to the different dependencies else things might not work properly.**
	 * @see I_dependencies for adding new methods
	 */
	readonly dependencies: I_dependencies = {
		mainInputRef: null,
		messageContainer: null,
	};

	/**
	 * Controller for handling different UI events.
	 *
	 * ! Could be refactored to a better way; but currently too lazy, I guess.
	 * @see I_UIEvents for adding new methods
	 */
	readonly input: I_UIEventsInput = {
		isEmpty: () => {
			return this.input.getText() === "";
		},

		clear: () => {
			if (this.dependencies.mainInputRef?.current)
				this.dependencies.mainInputRef.current.value = "";
		},

		getText: () => {
			if (this.dependencies.mainInputRef?.current)
				return this.dependencies.mainInputRef.current.value;

			return "";
		},

		setText: (text) => {
			if (this.dependencies.mainInputRef?.current)
				this.dependencies.mainInputRef.current.value = text;
		},

		insertTextAt: (text, position?) => {
			const inputElm = this.dependencies.mainInputRef?.current;
			if (!inputElm) return;

			let pos = position ? position : this.input.getCursorPosition(),
				val = this.input.getText();

			this.input.setText(val.substring(0, pos) + text + val.substring(pos));
			this.input.setCursorPosition(pos + 1);
			inputElm.focus();
		},

		getCursorPosition: () => {
			if (!this.dependencies.mainInputRef?.current) return -1;
			return this.dependencies.mainInputRef.current.selectionStart ?? -1;
		},

		setCursorPosition: (caretPos) => {
			var elem = this.dependencies.mainInputRef?.current;
			if (!elem) return;
			if (elem.selectionStart) {
				elem.focus();
				elem.setSelectionRange(caretPos, caretPos);
			} else elem.focus();
		},

		submit: () => {
			if (this.input.isEmpty()) return;

			//When submitting, first display the message as user message;
			this.parent.messageController.addMessage({
				id: Date.now().toString(),
				text: this.input.getText(),
				source: MESSAGE_SOURCE.USER,
				unixTime: Date.now(),
			});

			//If the `clearOnSubmit` setting is set to true, then clear the input;
			if (this.parent.globalSettingsController.getValue("clearOnSubmit"))
				this.input.clear();
		},
	};
}
