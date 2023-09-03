/**
 * Represents the type/source of the message; either from the user or the bot
 * @param USER The message is from the user
 * @param BOT The message is from the bot
 */
export enum MESSAGE_SOURCE {
	USER = 0,
	BOT = 1,
}


export interface MessageInterface {
	id: string;
	source: MESSAGE_SOURCE;
	unixTime: number;
	text: string;
}
