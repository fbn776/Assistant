import React, { FC, useRef } from "react";
import { convertUnixTime } from "../utils/utils";
import { MESSAGE_SOURCE, I_Message } from "../../data/structures/s_message";

/**
 * The message component
 * TODO Implement ID/key prop
 */
export const Message: FC<I_Message> = ({ source, text, unixTime, id }) => {
	const msgCont: React.MutableRefObject<HTMLDivElement | null> = useRef(null);

	const isBot = source === MESSAGE_SOURCE.BOT;
	return (
		<div
			id={id}
			className={"w-full px-3 pt-3 flex" + (isBot ? "" : " justify-end")}
			ref={msgCont}
		>
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
					{convertUnixTime(unixTime)}
				</div>
			</div>
		</div>
	);
};
