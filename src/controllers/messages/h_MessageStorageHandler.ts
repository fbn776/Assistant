import request from "../storage/indexedDB";
import { MessageController } from "./c_MessageController";


export default class MessageStorageHandler {
	private _parent: MessageController;

	constructor(parent: MessageController) {
		this._parent = parent;
		console.log(request)

		request.onsuccess = (event: Event) => {
			console.log(event);
		}
		request.onerror = (event: any) => {
			console.error("Operation failed", event)
		}
	}

}