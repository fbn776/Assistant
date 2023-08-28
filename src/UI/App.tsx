import { FC } from "react";
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
						? "bg-msgBot rounded-[0px_10px_10px_10px]"
						: "bg-msgUser rounded-[10px_10px_0px_10px]")
				}
			>
				<p>{text}</p>
				<div className="w-full opacity-50 text-[0.60rem] text-right pt-2">{convertUnixTime(time)}</div>
			</div>
		</div>
	);
};

export const App: FC = () => {
	return (
		<>
			<section className="w-full top-0 min-h-[calc(100vh-60px)] bg-slate-50">
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
			<section className="w-full h-[60px] bg-white bottom-0 border-slate-600 border-t-2">
				<div className="w-full h-full flex justify-center items-center p-3 gap-1">
					<IconCategory size={"30px"} />
					<input
						type="text"
						className="w-full h-full outline-none border-none bg-slate-100 shadow-inner px-3 rounded-2xl"
						placeholder="Type here.."
					/>
					<IconSend />
				</div>
			</section>
		</>
	);
};
