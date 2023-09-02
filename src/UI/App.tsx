import { FC, useState } from "react";
import "./app.css";
import { UpperSection } from "./sections/UpperSection";
import { LowerSection } from "./sections/LowerSection";
import { MessageController } from "../data/controllers/c_MessageController";
import { MessageInterface } from "../data/structures/s_message";
import { MessageControllerContext } from "./context/MessageContext";

//! DARK MODE; Remove this when done
document.body.classList.toggle("dark");

/**
 * Message controller instance;
 * This is used to control the messages state, this means only through this controller can the messages can read, added, or removed.
 * Provides a layer of abstraction between the UI and the data.
 */
const messageController = new MessageController();

export const App: FC = () => {
	//Sets the state controller for the messages;
	messageController.setMessageState(useState<MessageInterface[]>([]));

	return (
		<MessageControllerContext.Provider value={messageController}>
			<UpperSection />
			<LowerSection />
		</MessageControllerContext.Provider>
	);
};
