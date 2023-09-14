import "./app.css";
import { FC, useEffect, useState } from "react";
import { LowerSection, UpperSection } from "./sections";
import { I_Message } from "../data/structures/s_message";
import { ControllersContext } from "./providers/contexts";
import {
	CommandController,
	GlobalController,
	GlobalSettingsController,
	MessageController,
	UIController,
} from "../controllers";
import command_registry_instance from "../command_lists/registry_instance";
import "../command_lists";

//Global controller for the app;
const globalController = new GlobalController(
	new MessageController(),
	new GlobalSettingsController(),
	new UIController(),
	new CommandController(command_registry_instance)
);
// console.log(command_registry_instance);

export const App: FC = () => {
	//Sets the state controller for the messages;
	globalController.messageController.init(useState<I_Message[]>([]));
	//Sets the state controller for the settings;
	globalController.globalSettingsController.init(
		useState(GlobalSettingsController.BaseSettings)
	);

	//For the theme toggling
	globalController.globalSettingsController.onSettingsChange(() => {
		document.body.classList.toggle(
			"dark",
			globalController.globalSettingsController.getValue("theme") === "dark"
		);
	});

	//! REMOVE THIS;
	useEffect(() => {
		window.onkeydown = (e) => {
			if (e.key === "d" && e.ctrlKey) {
				let curr = globalController.globalSettingsController.getValue("theme");
				globalController.globalSettingsController.setValue(
					"theme",
					curr === "dark" ? "light" : "dark"
				);

				e.preventDefault();
			}
			if (e.key === "Enter") {
				if (
					document.activeElement ===
					globalController.uiController.dependencies.mainInputRef?.current
				) {
					globalController.uiController.input.debouncedEval();
				}
			}
		};
	}, []);

	return (
		<ControllersContext.Provider value={globalController}>
			<UpperSection />
			<LowerSection />
		</ControllersContext.Provider>
	);
};
