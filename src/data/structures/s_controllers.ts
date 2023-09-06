export interface I_ControllerBase {
	/**Name of the controller class; used to identify the controller class*/
	CONTROLLER_NAME: string;

	/**Some controllers may stores some data locally, thus this function can be used to delete that data.*/
	deleteLocalData?: () => void;
}

/**
 * Interface containing dependencies for the controller.
 */
export interface I_dependencies {
	/**The main input ref object */
	mainInputRef: React.MutableRefObject<HTMLInputElement | null> | null;
	/**Ref object for the message container*/
	messageContainer: React.MutableRefObject<HTMLDivElement | null> | null;
}

export interface I_UIEvents {
	/**Input events */
	input: I_UIEventsInput;
	/**Messages events */
	messages: I_UIEventsMessages;
}

export interface I_UIEventsInput {
	/**Checks if the input is empty or not */
	isEmpty: () => boolean;
	/**Clears the main input */
	clear: () => void;
	/**Submits the main input text to the submission work */
	submit: () => void;
	/**Gets the main input text */
	getText: () => string;
	/**Sets the value of the input text box to the given text value. This removes any previous text */
	setText: (text: string) => void;
	/**Insert a piece of text at the given position; if no position is given then, it inputs text at the current cursor position*/
	insertTextAt: (text: string, position?: number) => void;
	/**Returns the caret (cursor) position of the input; in case of an error this returns -1*/
	getCursorPosition: () => number;
	/**Sets the cursor position of the input to the specified position. This also focuses the input.
	 *
	 * **NOTE: Has doubt regarding the compatibility of this function.**
	 */
	setCursorPosition: (position: number) => void;
}

export interface I_UIEventsMessages {}
