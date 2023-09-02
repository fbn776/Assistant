import { createContext } from "react";
import { MessageController } from './MessageController';

export const MessageControllerContext = createContext(new MessageController());
