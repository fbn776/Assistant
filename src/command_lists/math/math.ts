import {
	ArgumentsData,
	Documentation,
	E_ArgumentTypes as types,
} from "../../execution/test";
import command_registry_instance from "../registry_instance";

command_registry_instance.register({
	name: ["add"],
	arguments: new ArgumentsData(2, types.number, types.number),
	metadata: new Documentation("Adds twp numbers and returns the result"),
	exec: (a, b) => a + b,
});

command_registry_instance.register({
	name: ["sum"],
	arguments: new ArgumentsData(-1, types.number),
	metadata: new Documentation("Finds sum of n numbers"),
	exec: (...rest: number[]) => {
		let sum = 0;
		for(let a of rest)
			sum += a;
		return sum;
	}
})