/**Represents the type of syntax items */
export enum E_SyntaxTypes {
	literal,
	command,
}

type T_SyntaxCommandArgument = Array<SyntaxLiteral | SyntaxCommand>;
export class SyntaxItemBase {
	public readonly name: string;
	public readonly type: E_SyntaxTypes;
	constructor(type: E_SyntaxTypes, name: string) {
		this.type = type;
		this.name = name;
	}
}

/**This represents a non-divisible unit of the syntax */
export class SyntaxLiteral extends SyntaxItemBase {
	constructor(name: string) {
		super(E_SyntaxTypes.literal, name);
	}
}

/**This represents the executable commands of a syntax */
export class SyntaxCommand extends SyntaxItemBase {
	private _arguments: T_SyntaxCommandArgument;
	constructor(name: string, commandArgs: T_SyntaxCommandArgument = []) {
		super(E_SyntaxTypes.command, name);
		this._arguments = commandArgs;
	}

	addArgument(arg: SyntaxLiteral | SyntaxCommand) {
		this._arguments.push(arg);
	}

	get arguments() {
		return this._arguments;
	}
}

/**
 * The SyntaxTree represents the wrapper for a syntax representation; this contains the start or root of the syntax;
 * The root then is a reference to a SyntaxCommand or SyntaxLiteral;
 */
export class SyntaxTree {
	private _root: SyntaxCommand | null = null;

	addArgument(command: SyntaxCommand) {
		this._root = command;
	}

	get root() {
		return this._root;
	}

	/**A recursive function to convert the output of tertiary parser to a passed base;
	 * The base should be a SyntaxTree; This modifies the base.
	 * The SyntaxCommand as base is for recursion.
	 */
	static makeTree(input: any, base: SyntaxTree | SyntaxCommand) {
		if (Array.isArray(input)) {
			let command = new SyntaxCommand(input[0]);
			base.addArgument(command);
			for (let i = 1; i < input.length; i++) {
				SyntaxTree.makeTree(input[i], command);
			}
		} else {
			if (base instanceof SyntaxCommand)
				base.addArgument(new SyntaxLiteral(input));
		}
	}
}
