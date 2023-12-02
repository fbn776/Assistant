import MessageController from "./MessageController.ts";


export default class MessageStorageHandler {
	private readonly _parent: MessageController;

	constructor(parent: MessageController) {
		this._parent = parent;

		console.log(this._parent)
	}

}	