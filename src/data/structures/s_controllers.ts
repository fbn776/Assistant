/**
 * Controllers are class that are used to control the UI and the data flow of the application.
 * Controller may or may not depend on handlers.
 * These handlers are used to handle different events. For example; the UIController has a handler for handling input events.
 * These handlers are used to abstract away the logic of the events.
 */
import { GlobalController } from "../../controllers/c_Controller";

export interface I_ControllerBase {
	/**Name of the controller class; used to identify the controller class*/
	CONTROLLER_NAME: string;

	/**Represents the parent/global controller class; this is set by the bind method */
	parent: GlobalController;

	/** Binds a controller to its parent controller;
	 * 
	 *  This is **very important** as the a child controller access the globalController and every other controller registered with the globalController from here.
	 * 
	 * This should be called inside the globalController's constructor*/
	bind: (parent: GlobalController) => void;

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
