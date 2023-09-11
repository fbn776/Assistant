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

enum E_SyntaxTypes {
	literal,
	command,
}
type T_SyntaxCommandArgument = Array<SyntaxLiteral | SyntaxCommand>;


class SyntaxLiteral {
	public value: string;
	public type: E_SyntaxTypes = E_SyntaxTypes.literal;

	constructor(value: string) {
		this.value = value;
	}
}

class SyntaxCommand {
	public name: string;
	public type: E_SyntaxTypes = E_SyntaxTypes.command;
	public arguments: T_SyntaxCommandArgument = [];

	constructor(name: string, commandArgs: T_SyntaxCommandArgument) {
		this.name = name;
		this.arguments = commandArgs;
	}
}


//sum 10 30 (add 10 30) 40

let a = new SyntaxCommand("sum", [
	new SyntaxLiteral("10"),
	new SyntaxLiteral("30"),
	new SyntaxCommand("add", [
		new SyntaxLiteral("10"),
		new SyntaxLiteral("30"),
	]),
	new SyntaxLiteral("40"),
])


console.log(a);


export class Parser {
	public static parse(input: string) {
		let stage1 = ParserUtils.tertiaryParser(input);

		console.log(stage1);
	}
}
