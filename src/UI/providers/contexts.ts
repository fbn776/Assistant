import { createContext } from "react";
import { GlobalController } from "../../controllers/c_Controller";

export const ControllersContext = createContext(new GlobalController());
