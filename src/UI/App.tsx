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
	const currentTimeStamp = Date.now();

	const currentDate = new Date(currentTimeStamp);

	const hours = currentDate.getHours();
	const minutes = currentDate.getMinutes();

	const formattedHours = hours < 10 ? `0${hours}` : `${hours}`;
	const formattedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;

	return`${formattedHours}:${formattedMinutes}`;

}


const Message: FC<MessageProps> = ({ type, text, time }) => {
	const isBot = (type === MessageType.BOT);
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
				<div className="w-full opacity-50 text-[0.60rem] text-right pt-2">{convertUnixTime(time)}</div>
			</div>
		</div>
	);
};

export const App: FC = () => {

	useEffect(() => {
		window.onclick = () => {
			document.body.classList.toggle("dark");
		}
	}, []);

	return (
		<>
			<section className="w-full top-0 min-h-[calc(100vh-60px)] bg-l-secnd-cont-bg dark:bg-d-secnd-cont-bg">
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
			<section className="w-full h-[60px] bottom-0 border-l-prim-variant dark:border-d-prim-variant border-t-2 bg-l-prim-cont-bg dark:bg-d-prim-cont-bg">
				<div className="w-full h-full flex justify-center items-center p-3 gap-3">
					<IconCategory
						className="stroke-l-prim-cont-txt dark:stroke-d-prim-cont-txt"
					/>
					<input
						type="text"
						className="w-full h-full outline-none border-none bg-l-prim-cont-variant dark:bg-d-prim-cont-variant text-l-prim-cont-txt dark:text-d-prim-cont-txt shadow-inner px-3 rounded-2xl"
						placeholder="Type here.."
					/>
					<IconSend className="stroke-l-prim-cont-txt dark:stroke-d-prim-cont-txt" />
				</div>
			</section>
		</>
	);
};
