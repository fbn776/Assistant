import { FC, useContext } from "react";
import { Message } from "../components/Messages";
import { ControllersContext } from "../providers/contexts";

export const UpperSection: FC = () => {
	const msgController = useContext(ControllersContext).messageController;
	let messages = msgController.getAllMessages();
	return (
		<section className="w-full fixed top-0 min-h-[calc(100dvh-var(--btmBarHeight))] bottom-[var(--btmBarHeight)] bg-l-secnd-cont-bg dark:bg-d-secnd-cont-bg upper-section-scrollbar overflow-y-scroll pb-5">
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
