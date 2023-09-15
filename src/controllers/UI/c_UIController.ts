import { I_dependencies } from "../../data/structures/s_controllers";
import { BaseController } from "../c_ControllerBase";
import { UIInputHandler } from "./h_UIInputHandler";
import { UIMessageHandler } from "./h_UIMessageHandler";

export class UIController extends BaseController {
	CONTROLLER_NAME = "UIController";

	/**Dependencies object for storing different dependencies to which the different events the controller depends on.
	 *
	 * **NOTE: This needs to set at first to the different dependencies else things might not work properly.**
	 * @see I_dependencies for adding new dependencies
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
	readonly input: UIInputHandler;
	readonly message: UIMessageHandler;

	constructor() {
		super();
		this.input = new UIInputHandler(this);
		this.message = new UIMessageHandler(this);
	}

	/**Plays a success animation and tick icon; for quick utils
	 * This automatically plays and then removes the animation;
	 */
	initSuccessAnimation(elm: HTMLElement) {
		elm.classList.add("play-success-animation");
		elm.addEventListener("animationend", () => {
			elm.classList.remove("play-success-animation");
		});
	}
}
