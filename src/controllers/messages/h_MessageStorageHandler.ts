import { MessageController } from "./c_MessageController";


export default class MessageStorageHandler {
	private _parent: MessageController;

	constructor(parent: MessageController) {
		this._parent = parent;
	}

	hasLocalData(): boolean {
		return false;
	}

	private _parseToJSON() {

	}

	private _parseFromJSON() {

	}

	store() {
		this._parent;
		this._parseFromJSON()
		this._parseToJSON()
	}

	load() {
		
	}

	clear() {

	}
}