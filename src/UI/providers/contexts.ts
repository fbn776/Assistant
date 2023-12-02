import { createContext } from "react";
import { GlobalController } from "../../controllers/GlobalController.ts";

export const ControllersContext = createContext(new GlobalController());
