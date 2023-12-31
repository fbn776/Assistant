import { FC, useContext, useRef } from "react";
import { Message } from "../components/messages/Messages.tsx";
import { ControllersContext } from "../providers/contexts";

export const UpperSection: FC = () => {
	const globalController = useContext(ControllersContext);
	let messages = globalController.message.getAllMessages();

	return (
		<section className="w-full fixed top-0 min-h-[calc(100dvh-var(--btmBarHeight))] bottom-[var(--btmBarHeight)] bg-l-secnd-cont-bg dark:bg-d-secnd-cont-bg upper-section-scrollbar overflow-x-hidden overflow-y-scroll pb-5">
			<div
				ref={(globalController.ui.dependencies.messageContainer = useRef(null))}
			>
				{messages.map((msg) => {
					return <Message data={msg} key={msg.id} />;
				})}
			</div>
		</section>
	);
};
