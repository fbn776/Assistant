import { UIController } from "./c_UIController";

export class UIMessageHandler {
	private _parent: UIController;

	constructor(parent: UIController) {
		this._parent = parent;
	}
}
