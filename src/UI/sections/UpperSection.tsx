import { FC, useContext, useRef } from "react";
import { Message } from "../components/Messages";
import { ControllersContext } from "../providers/contexts";

export const UpperSection: FC = () => {
	const globalController = useContext(ControllersContext);
	let messages = globalController.messageController.getAllMessages();

	return (
		<section className="w-full fixed top-0 min-h-[calc(100dvh-var(--btmBarHeight))] bottom-[var(--btmBarHeight)] bg-l-secnd-cont-bg dark:bg-d-secnd-cont-bg upper-section-scrollbar overflow-x-hidden overflow-y-scroll pb-5">
			<div
				ref={
					(globalController.uiController.dependencies.messageContainer =
						useRef(null))
				}
			>
				{messages.map((msg) => {
					return (
						<Message
							key={msg.id}
							source={msg.source}
							text={msg.text}
							unixTime={msg.unixTime}
							id={msg.id}
							type={msg.type}
						/>
					);
				})}
			</div>
		</section>
	);
};
