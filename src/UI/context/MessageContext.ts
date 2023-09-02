import { createContext } from "react";
import { MessageController } from "../../data/controllers/c_MessageController";

export const MessageControllerContext = createContext(new MessageController());
