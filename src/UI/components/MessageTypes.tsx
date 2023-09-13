import { FC } from "react";
import { I_MessageTypeProp } from "../../data/structures/s_message";
import { convertUnixTime } from "../utils/utils";

/**A regular message */
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

/**A error message; same as a regular message, but the font color is red (defined at tailwind config file) */
export const ErrorMessage: FC<I_MessageTypeProp> = (props) => {
	return (
		<p
			className={
				"message-general message-text " +
				(props.isBot ? "bot-message" : "user-message")
			}
		>
			<span className="message-error-text">{props.data.text}</span>
			<span className="message-time">
				{convertUnixTime(props.data.unixTime)}
			</span>
		</p>
	);
};

/**An error message, but is formatted; the formatting is done in accordance with `additionalData` */
export const FormattedErrorMessage: FC<I_MessageTypeProp> = (props) => {
	let pos = props.data.additionalData!.position;
	let cmd = props.data.text;
	let start = pos - 1;
	let end = pos + 1 >= cmd.length - 1 ? cmd.length : pos + 1;

	let txt = (
		<>
			{cmd.substring(0, start)}
			<i className="error-marker">{cmd.substring(start, end)}</i>
			{cmd.substring(end)}
		</>
	);

	return (
		<p
			className={
				"message-general message-text " +
				(props.isBot ? "bot-message" : "user-message")
			}
		>
			<span className="message-error-text">
				<b>{props.data.additionalData?.heading}</b>
				<br />
				<span className="mb-[8px] block">{txt}</span>
				<b>Reason: </b>
				{props.data.additionalData?.errorMsg}
			</span>
			<span className="message-time">
				{convertUnixTime(props.data.unixTime)}
			</span>
		</p>
	);
};
