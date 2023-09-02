import { FC, useContext } from "react";
import { Message } from "../components/Messages";
import { MessageControllerContext } from "../context/MessageContext";

export const UpperSection: FC = () => {
	const msgController = useContext(MessageControllerContext);
	let messages = msgController.getAllMessages();
	return (
		<section className="w-full top-0 min-h-[calc(100dvh-var(--btmBarHeight))] bg-l-secnd-cont-bg dark:bg-d-secnd-cont-bg">
			{messages.map((msg) => {
				return (
					<Message
						key={msg.id}
						source={msg.source}
						text={msg.text}
						unixTime={msg.unixTime}
						id={msg.id}
					/>
				);
			})}
		</section>
	);
};
