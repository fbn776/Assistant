import { ArgumentsData } from "../../controllers/command/utils/arguments";
import Documentation from "../../controllers/command/utils/documentation/Documentation";
import { E_ArgumentTypes as types } from "../../controllers/command/utils/arguments";
import command_registry_instance from "../registry_instance";

command_registry_instance.register({
	name: ["add"],
	arguments: new ArgumentsData(2, types.number, types.number),
	metadata: new Documentation("Adds twp numbers and returns the result"),
	exec: (a, b) => a + b,
});
