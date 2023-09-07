import React, { FC, useEffect, useRef } from "react";
import { convertUnixTime } from "../utils/utils";
import { MESSAGE_SOURCE, I_Message } from "../../data/structures/s_message";

/**
 * The message component
 * TODO Implement ID/key prop
 */
export const Message: FC<I_Message> = ({ source, text, unixTime, id }) => {
	const msgCont: React.MutableRefObject<HTMLDivElement | null> = useRef(null);
	const isBot = source === MESSAGE_SOURCE.BOT;

	//For entry animation;
	useEffect(() => {
		setTimeout(() => {
			if (msgCont.current) msgCont.current.style.transform = "translateX(0px)";
		}, 0);
	}, []);

	return (
		<div
			id={id}
			className={
				"w-full px-3 pt-3 flex transition-transform" +
				(isBot ? " translate-x-[-100%]" : " justify-end translate-x-[100%]")
			}
			ref={msgCont}
		>
			<p
				className={
					"min-w-[100px] max-w-[70%] pl-3 pr-3 py-2 shadow-md flex justify-between gap-2 " +
					(isBot
						? "bg-l-secnd text-l-secnd-txt dark:bg-d-secnd dark:text-d-secnd-txt rounded-[0px_10px_10px_10px]"
						: "bg-l-prim text-l-prim-txt dark:bg-d-prim dark:text-d-prim-txt rounded-[10px_10px_0px_10px]")
				}
			>
				{text}
				<span className="h-full opacity-50 text-[0.60rem] text-right flex items-end">
					{convertUnixTime(unixTime)}
				</span>
			</p>
		</div>
	);
};
