import { FC } from "react";
import { I_Message } from "../../data/structures/s_message";
import { convertUnixTime } from "../utils/utils";
export interface I_MessageTypeProp {
	data: I_Message;
	isBot: boolean;
}

export const TextMessage: FC<I_MessageTypeProp> = (props) => {
	return (
		<p
			className={
				"message-general message-text " +
				(props.isBot ? "bot-message" : "user-message")
			}
		>
			{props.data.text}
			<span className="message-time">
				{convertUnixTime(props.data.unixTime)}
			</span>
		</p>
	);
};

export const ErrorMessage: FC<I_MessageTypeProp> = (props) => {
	return (
		<p
			className={
				"message-general message-text " +
				(props.isBot ? "bot-message" : "user-message")
			}
		>
			<div className="message-error-text">{props.data.text}</div>
			<span className="message-time">
				{convertUnixTime(props.data.unixTime)}
			</span>
		</p>
	);
};

export const FormattedErrorMessage: FC<I_MessageTypeProp> = (props) => {
	return (
		<p
			className={
				"message-general message-text " +
				(props.isBot ? "bot-message" : "user-message")
			}
		>
			<div className="message-error-text">
				<h2>{props.data.additionalData.heading}</h2>
				{props.data.text}
				<p>{props.data.additionalData.message}</p>
			</div>
			<span className="message-time">
				{convertUnixTime(props.data.unixTime)}
			</span>
		</p>
	);
};
