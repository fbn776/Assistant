import { IconCommand, IconSend } from "@tabler/icons-react";
import { FC, useContext, useRef } from "react";
import { ControllersContext } from "../providers/contexts";
import { QuickToolBarItems } from "../../data/d_quickToolBarItems";

export const LowerSection: FC = () => {
	const globalController = useContext(ControllersContext);
	const settingsController = globalController.globalSettingsController;

	return (
		<section className="w-full fixed h-[var(--btmBarHeight)] bottom-0 border-l-prim-variant dark:border-d-prim-variant border-t-2 bg-l-prim-cont-bg dark:bg-d-prim-cont-bg">
			<div className="h-[40%] w-full flex">
				<div className="h-full aspect-square flex items-center justify-center">
					<IconCommand
						className="stroke-l-prim-cont-txt dark:stroke-d-prim-cont-txt cursor-pointer primary-color-on-hover"
						size={30}
						stroke={1.5}
					/>
				</div>
				<div className="no-scrollbar flex flex-grow overflow-x-scroll h-full bg-opacity-70 dark:bg-opacity-70 bg-l-prim-cont-variant dark:bg-d-prim-cont-variant text-l-prim-cont-txt dark:text-d-prim-cont-txt">
					{QuickToolBarItems.map((item, index) => (
						<div
							key={index}
							className="font-semibold cursor-pointer aspect-square flex justify-center items-center quick-toolbar-items primary-color-on-hover"
							onClick={() => {
								item.onClick(globalController, item.displayItem as string);
							}}
						>
							{item.displayItem}
						</div>
					))}
				</div>
			</div>
			<div className="w-full h-[60%] flex justify-center items-center p-3 gap-3">
				<div
					className="h-[90%] aspect-square bg-[url(../../fbn776.png)] bg-cover rounded-full border-l-prim-variant dark:border-d-prim-variant border-2"
					onClick={() => {
						// !! Remove this later
						settingsController.setValue(
							"theme",
							settingsController.getValue("theme") === "dark" ? "light" : "dark"
						);
					}}
				></div>
				<input
					type="search"
					autoComplete="off"
					aria-label="Main input box"
					className="disable-default-search-style w-full h-full outline-none border-none shadow-inner px-4 py-2 rounded-full bg-l-prim-cont-variant dark:bg-d-prim-cont-variant text-l-prim-cont-txt dark:text-d-prim-cont-txt resize-none"
					placeholder="Type here.."
					ref={
						(globalController.uiController.dependencies.mainInputRef =
							useRef<HTMLInputElement>(null))
					}
				/>
				<IconSend
					className="stroke-l-prim-cont-txt dark:stroke-d-prim-cont-txt"
					size={35}
					onClick={() => {
						globalController.uiController.input.submit();
					}}
				/>
			</div>
		</section>
	);
};
