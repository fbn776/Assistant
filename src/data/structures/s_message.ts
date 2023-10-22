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
	/**Same as error, but the message text, will be in JSON and contains information about the error */
	FORMATTED_ERROR
}

export interface I_AdditionalMsgDataBase {

}

export interface I_FormattedErrorMsgData extends I_AdditionalMsgDataBase {
	heading: string;
	errorMsg: string;
	position: number;
}

type T_AdditionalMsgData = I_FormattedErrorMsgData;

export interface I_Message {
	id: string;
	source: MESSAGE_SOURCE;
	unixTime: number;
	text: string;
	type: MESSAGE_TYPE;
	/**For special cases; this should be a string, number, boolean, object etc. But the important part is, it should be JSON parsable  */
	additionalData?: T_AdditionalMsgData;
}

/**The React prop for MessageTypeComponent */
export interface I_MessageTypeProp {
	data: I_Message;
	isBot: boolean;
}
