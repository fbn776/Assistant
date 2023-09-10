/**
 * Represents the type/source of the message; either from the user or the bot
 */
export enum MESSAGE_SOURCE {
	/**The message is from the user */
	USER = 0,
	/**The message is from the bot */
	BOT = 1,
}

/**
 * Represents the type of the message;
 */
export enum MESSAGE_TYPE {
	/**A simple text message; the message only contains simple simple text */
	TEXT,
	/**An error message; usually from the BOT, when then user sends some message containing error */
	ERROR,
}

export interface I_Message {
	id: string;
	source: MESSAGE_SOURCE;
	unixTime: number;
	text: string;
	type: MESSAGE_TYPE;
}
