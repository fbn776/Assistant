import "./app.css";
import { FC, useEffect, useState } from "react";
import { LowerSection, UpperSection } from "./sections";
import { I_Message } from "../data/structures/s_message";
import { ControllersContext } from "./providers/contexts";
import GlobalController from "../controllers/GlobalController.ts";
import {
	CommandController,
	SettingsController,
	MessageController,
	UIController,
} from "../controllers";
import "../language/stdlib";
import { command_registry_instance } from "../language/stdlib/registry_instance";

//Global controller for the app;
const globalController = new GlobalController(
	new MessageController(),
	new SettingsController(),
	new UIController(),
	new CommandController(command_registry_instance)
);


export const App: FC = () => {
	//Sets the state controller for the messages;
	globalController.message.init(useState<I_Message[]>([]));

	useEffect(() => {
		//Initial toggle
		document.body.classList.toggle(
			"dark",
			globalController.globalSettings.getValue("theme") === "dark"
		);

		//A theme change listener, for updating the theme when the value changes
		globalController.globalSettings.onChange("theme", () => {
			document.body.classList.toggle(
				"dark",
				globalController.globalSettings.getValue("theme") === "dark"
			);
		});

		//! REMOVE THIS; THIS IS FOR TESTING PURPOSES ONLY; Change this to a proper shortcut system;
		window.onkeydown = (e) => {
			if (e.key === "d" && e.ctrlKey) {
				let curr = globalController.globalSettings.getValue("theme");
				globalController.globalSettings.setValue(
					"theme",
					curr === "dark" ? "light" : "dark"
				);

				e.preventDefault();
			}
			if (e.key === "Enter") {
				if (
					document.activeElement ===
					globalController.ui.dependencies.mainInputRef?.current
				) {
					globalController.ui.input.debouncedEval();
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
