import { FC } from "react";
import { I_Message, MESSAGE_SOURCE } from "../../data/structures/s_message";
import { convertUnixTime } from "../utils/utils";

export interface I_MessageProps {
	data: I_Message;
}

export const TextMessage: FC<I_MessageProps> = (props) => {
	const data = props.data;
	const isBot = props.data.source === MESSAGE_SOURCE.BOT;
	return (
		<p
			className={
				"min-w-[100px] max-w-[70%] pl-3 pr-3 py-2 shadow-md flex justify-between gap-2 " +
				(isBot
					? "bg-l-secnd text-l-secnd-txt dark:bg-d-secnd dark:text-d-secnd-txt rounded-[0px_10px_10px_10px]"
					: "bg-l-prim text-l-prim-txt dark:bg-d-prim dark:text-d-prim-txt rounded-[10px_10px_0px_10px]")
			}
		>
			{data.text}

			<span className="h-full opacity-50 text-[0.60rem] text-right flex items-end">
				{convertUnixTime(data.unixTime)}
			</span>
		</p>
	);
};

export const ErrorMessage: FC<I_MessageProps> = (props) => {
	return <div>hello</div>;
};
