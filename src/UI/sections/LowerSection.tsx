import { IconCommand, IconSend } from "@tabler/icons-react";
import { FC, useContext } from "react";
import { MessageControllerContext } from "../../data/controllers/MessageContext";


interface QuickToolBarItem {
	name: string;
	onClick?: () => void;
	icons?: JSX.Element[];
}
const QuickToolBarItems: Array<QuickToolBarItem> = [
	{
		name: "/",
	},
	{
		name: "#",
	},
	{
		name: "@",
	},
	{
		name: "'",
	},
	{
		name: '"',
	},
	{
		name: "!",
	},
	{
		name: "?",
	},
	{
		name: "*",
	},
	{
		name: "&",
	},
	{
		name: "|",
	},
	{
		name: ">",
	},
	{
		name: "<",
	},
	{
		name: "\\",
	},
];


export const LowerSection: FC = () => {
	const msgController = useContext(MessageControllerContext);

	return (
		<section className="w-full h-[var(--btmBarHeight)] bottom-0 border-l-prim-variant dark:border-d-prim-variant border-t-2 bg-l-prim-cont-bg dark:bg-d-prim-cont-bg">
			<div className="h-[40%] w-full flex">
				<div className="h-full aspect-square flex items-center justify-center">
					<IconCommand
						className="stroke-l-prim-cont-txt dark:stroke-d-prim-cont-txt"
						size={30}
						stroke={1.5}
					/>
				</div>
				<div className="no-scrollbar flex flex-grow overflow-x-scroll h-full bg-opacity-70 dark:bg-opacity-70 bg-l-prim-cont-variant dark:bg-d-prim-cont-variant text-l-prim-cont-txt dark:text-d-prim-cont-txt">
					{QuickToolBarItems.map((item, index) => (
						<div
							key={index}
							className="font-medium aspect-square flex justify-center items-center"
						>
							{item.name}
						</div>
					))}
				</div>
			</div>
			<div className="w-full h-[60%] flex justify-center items-center p-3 gap-3">
				<div className="h-[90%] aspect-square bg-[url(../../fbn776.png)] bg-cover rounded-full border-l-prim-variant dark:border-d-prim-variant border-2"></div>
				<input
					type="text"
					className="w-full h-full outline-none border-none shadow-inner px-4 py-2 rounded-full bg-l-prim-cont-variant dark:bg-d-prim-cont-variant text-l-prim-cont-txt dark:text-d-prim-cont-txt"
					placeholder="Type here.."
				/>
				<IconSend
					className="stroke-l-prim-cont-txt dark:stroke-d-prim-cont-txt"
					size={35}
					onClick={() => { 
						msgController.addMessage({
							source: 0,
							text: "Hello",
							unixTime: Date.now(),
							id: Date.now().toString(),
						})
					}}
				/>
			</div>
		</section>
	);
};
