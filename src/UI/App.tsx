import { FC, useEffect, useState } from "react";
import "./app.css";
import { UpperSection } from "./sections/UpperSection";
import { LowerSection } from "./sections/LowerSection";
import { I_Message } from "../data/structures/s_message";
import { ControllersContext } from "./providers/contexts";
import { GlobalController } from "../controllers/c_Controller";
import { GlobalSettingsController } from "../controllers/c_GlobalSettingsController";
import { MessageController } from "../controllers/messages/c_MessageController";
import { UIController } from "../controllers/UI/c_UIController";

//Global controller for the app;
const globalController = new GlobalController(
	new MessageController(),
	new GlobalSettingsController(),
	new UIController()
);

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
			if (e.key === "Enter") {
				if (
					document.activeElement ===
					globalController.uiController.dependencies.mainInputRef?.current
				) {
					globalController.uiController.input.submit();
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
