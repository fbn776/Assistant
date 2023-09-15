import {
	ArgumentsData as Args,
	Documentation as Docs,
	E_ArgumentTypes as type,
} from "../../execution/syntax/command";
import { command_registry_instance as CR} from "../registry_instance";
/**
CR.register({
	name: [],
	arguments: new Args(),
	metadata: new Docs(""),
	exec: (_, ) => {},
});
 */

CR.register({
	name: ["add", "plus"],
	arguments: new Args(2, type.number),
	metadata: new Docs("Adds twp numbers and returns the result"),
	exec: (_, a, b) => a + b,
});

CR.register({
	name: ["sub", "subtract", "minus"],
	arguments: new Args(2, type.number),
	metadata: new Docs(""),
	exec: (_, a: number, b: number) => a - b,
});

CR.register({
	name: ["mult", "multiply"],
	arguments: new Args(2, type.number),
	metadata: new Docs(""),
	exec: (_, a: number, b: number) => a * b,
});

CR.register({
	name: ["div", "divide"],
	arguments: new Args(2, type.number),
	metadata: new Docs(""),
	exec: (_, a: number, b: number) => a / b,
});

CR.register({
	name: ["sqrt", "square_root", "root"],
	arguments: new Args(1, type.number),
	metadata: new Docs(""),
	exec: (_, a: number) => Math.sqrt(a),
});

