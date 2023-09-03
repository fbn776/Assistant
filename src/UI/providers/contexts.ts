import { createContext } from "react";
import { GlobalController } from "../../data/controllers/c_Controller";

export const ControllersContext = createContext(new GlobalController());
