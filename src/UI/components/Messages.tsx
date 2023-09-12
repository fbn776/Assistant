import React, { FC, useEffect, useRef } from "react";
import {
	MESSAGE_SOURCE,
	I_Message,
	MESSAGE_TYPE,
} from "../../data/structures/s_message";
import { ErrorMessage, I_MessageProps, TextMessage } from "./MessageTypes";

function conditionalMessageRender(data: I_Message) {
	switch (data.type) {
		default:
		case MESSAGE_TYPE.TEXT:
			return <TextMessage data={data} />;
		case MESSAGE_TYPE.ERROR:
			return <ErrorMessage data={data} />;
	}
}

/**
 * The message component
 */
export const Message: FC<I_MessageProps> = (props) => {
	const data = props.data;
	const msgCont: React.MutableRefObject<HTMLDivElement | null> = useRef(null);
	const isBot = data.source === MESSAGE_SOURCE.BOT;

	//For entry animation;
	useEffect(() => {
		setTimeout(() => {
			if (msgCont.current) msgCont.current.style.transform = "translateX(0px)";
		}, 0);
	}, []);

	return (
		<div
			id={data.id}
			className={
				"w-full px-3 pt-3 flex transition-transform" +
				(isBot ? " translate-x-[-100%]" : " justify-end translate-x-[100%]")
			}
			ref={msgCont}
		>
			{conditionalMessageRender(data)}
		</div>
	);
};
