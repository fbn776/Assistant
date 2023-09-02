import { FC } from "react";

export enum MessageType {
	USER,
	BOT,
}

interface MessageProps {
	type: MessageType;
	text: string;
	time: number;
}

function convertUnixTime(unixTime: number): string {
	const currentDate = new Date(unixTime);

	const hours = currentDate.getHours();
	const minutes = currentDate.getMinutes();

	const formattedHours = hours < 10 ? `0${hours}` : `${hours}`;
	const formattedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;

	return `${formattedHours}:${formattedMinutes}`;
}

export const Message: FC<MessageProps> = ({ type, text, time }) => {
	const isBot = type === MessageType.BOT;
	return (
		<div className={"w-full px-3 pt-3 flex" + (isBot ? "" : " justify-end")}>
			<div
				className={
					"max-w-[70%] p-3 shadow-md " +
					(isBot
						? "bg-l-secnd text-l-secnd-txt dark:bg-d-secnd dark:text-d-secnd-txt rounded-[0px_10px_10px_10px]"
						: "bg-l-prim text-l-prim-txt dark:bg-d-prim dark:text-d-prim-txt rounded-[10px_10px_0px_10px]")
				}
			>
				<p>{text}</p>
				<div className="w-full opacity-50 text-[0.60rem] text-right pt-2">
					{convertUnixTime(time)}
				</div>
			</div>
		</div>
	);
};