import ParserUtils from "./Parser_utils";

// Commands.register({
// 	name: ["add", "addition", "plus"],
// 	arguments: [DATATYPE.number, DATATYPE.number],
// 	metadata: new Documentation(
// 		"Adds two numbers together",
// 	),
// 	exec: (a, b) => {
// 		return a + b;
// 	}
// });

class Cs extends Error {
	line: number;
	constructor(name: string, line: number) {
		super(name);
		this.line = line;
	}
}

import { Benchmark, Log } from "../../tests/test_utils";

export class Parser {
	public static parse(input: string) {
		let stage1 = ParserUtils.tertiaryParser(input);
	}
}
