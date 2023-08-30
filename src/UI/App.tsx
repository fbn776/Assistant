import { FC, useEffect } from "react";
import "./app.css";
import { IconCategory, IconSend } from "@tabler/icons-react";

enum MessageType {
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

const Message: FC<MessageProps> = ({ type, text, time }) => {
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

export const App: FC = () => {
	useEffect(() => {
		window.onclick = () => {
			document.body.classList.toggle("dark");
		};
	}, []);

	return (
		<>
			<section className="w-full top-0 min-h-[calc(100dvh-var(--btmBarHeight))] bg-l-secnd-cont-bg dark:bg-d-secnd-cont-bg">
				<Message
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
				/>
			</section>
			<section className="w-full h-[var(--btmBarHeight)] bottom-0 border-l-prim-variant dark:border-d-prim-variant border-t-2 bg-l-prim-cont-bg dark:bg-d-prim-cont-bg">
				<div className="h-[40%] w-full flex">
					<div className="h-full aspect-square"></div>
					<div className="flex-1 h-full bg-opacity-70 dark:bg-opacity-70 bg-l-prim-cont-variant dark:bg-d-prim-cont-variant text-l-prim-cont-txt dark:text-d-prim-cont-txt"></div>
				</div>
				<div className="w-full h-[60%] flex justify-center items-center p-3 gap-3">
					<IconCategory
						className="stroke-l-prim-cont-txt dark:stroke-d-prim-cont-txt"
						size={30}
					/>
					<input
						type="text"
						className="w-full h-full outline-none border-none shadow-inner px-4 py-2 rounded-full bg-l-prim-cont-variant dark:bg-d-prim-cont-variant text-l-prim-cont-txt dark:text-d-prim-cont-txt"
						placeholder="Type here.."
					/>
					<IconSend
						className="stroke-l-prim-cont-txt dark:stroke-d-prim-cont-txt"
						size={30}
					/>
				</div>
			</section>
		</>
	);
};
