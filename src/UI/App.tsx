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
}

function returnIf(condition: boolean, ifTrue: string, ifFalse: string) {
	return condition ? ifTrue : ifFalse;
}

const Message: FC<MessageProps> = ({ type, text }) => {
	const isBot = (type === MessageType.BOT);
	return (
		<div className={"w-full px-3 pt-3 flex" + (isBot ? "" : " justify-end")}>
			<div
				className={
					"max-w-[70%] p-3 shadow-md" +
					(isBot
						? " bg-msgBot rounded-[0px_10px_10px_10px]"
						: " bg-msgUser rounded-[10px_10px_0px_10px]")
				}
			>
				<p>{text}</p>
			</div>
		</div>
	);
};

export const App: FC = () => {
	return (
		<>
			<section className="w-full top-0 min-h-[calc(100vh-60px)] bg-slate-50">
				<Message type={MessageType.BOT} text="Hello there how can I help?"/>
				<Message type={MessageType.USER} text="Great! whats the time?" />
				<Message type={MessageType.USER} text="And whats the news?"/>
				<Message type={MessageType.BOT} text="The time is 12:40pm"/>
				<Message type={MessageType.BOT} text="The news is that I'm a  terrible programmer"/>
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
