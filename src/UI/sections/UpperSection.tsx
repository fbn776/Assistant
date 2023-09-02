import { FC } from "react";
import { Message, MessageType } from "../components/Messages";

export const UpperSection: FC = () => {
	return (
		<section className="w-full top-0 min-h-[calc(100dvh-var(--btmBarHeight))] bg-l-secnd-cont-bg dark:bg-d-secnd-cont-bg">
			{/* <Message
					type={MessageType.BOT}
					text="Hello there how can I help?"
					time={Date.now()}
				/>
				<Message
					type={MessageType.USER}
					text="Great! whats the time?"
					time={Date.now()}
				/>
				<Message
					type={MessageType.USER}
					text="And whats the news?"
					time={Date.now()}
				/>
				<Message
					type={MessageType.BOT}
					text="The time is 12:40pm"
					time={Date.now()}
				/>
				<Message
					type={MessageType.BOT}
					text="The news is that I'm a  terrible programmer"
					time={Date.now()}
				/> */}
			<Message type={MessageType.USER} text="Hello" time={Date.now()} />
		</section>
	);
};
