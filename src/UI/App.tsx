import { FC, useEffect, useState } from "react";
import "./app.css";
import { UpperSection } from "./sections/UpperSection";
import { LowerSection } from "./sections/LowerSection";
import { I_Message } from "../data/structures/s_message";
import { ControllersContext } from "./providers/contexts";
import { GlobalController } from "../data/controllers/c_Controller";
import { GlobalSettingsController } from "../data/controllers/c_GlobalSettingsController";

//Global controller for the app;
const globalController = new GlobalController();

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

	return (
		<ControllersContext.Provider value={globalController}>
			<UpperSection />
			<LowerSection />
		</ControllersContext.Provider>
	);
};
