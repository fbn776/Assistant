/**
 * Controllers are class that are used to control the UI and the data flow of the application.
 * Controller may or may not depend on handlers.
 * These handlers are used to handle different events. For example; the UIController has a handler for handling input events.
 * These handlers are used to abstract away the logic of the events.
 */


/**
 * Interface containing dependencies for the controller.
 */
export interface I_dependencies {
	/**The main input ref object */
	mainInputRef: React.MutableRefObject<HTMLInputElement | null> | null;
	/**Ref object for the message container*/
	messageContainer: React.MutableRefObject<HTMLDivElement | null> | null;
}
