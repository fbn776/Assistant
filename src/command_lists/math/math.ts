import {
	ArgumentsData,
	Documentation,
	E_ArgumentTypes as types,
} from "../../controllers/command";
import command_registry_instance from "../registry_instance";

command_registry_instance.register({
	name: ["add"],
	arguments: new ArgumentsData(2, types.number, types.number),
	metadata: new Documentation("Adds twp numbers and returns the result"),
	exec: (a, b) => a + b,
});
