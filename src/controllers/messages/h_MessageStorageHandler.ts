import { MessageController } from "./c_MessageController";


export default class MessageStorageHandler {
	private _parent: MessageController;

	constructor(parent: MessageController) {
		this._parent = parent;

		console.log(this._parent)
	}

}	