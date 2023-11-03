/**Represents the argument data types */
export enum E_ArgumentTypes {
	number = "number",
	string = "string",
	boolean = "boolean",
	command = "command",
	any = "any",
}

/**
 * Arguments types represents the number of arguments a command can take and the data type of each argument;
 * This is used to check if the arguments passed to a command are valid;
 *
 * ### RULES:
 * 
 * 1. The number of arguments(requiredNumber) given should be equal to the number of arguments passed into the rest parameter;
 *   If the argument types are uniform; then only one type is needed;
 *   ie if the length of arg type is 1 (but required number is not 1) then the type is taken as the type for all other arguments;
 *
 * 2. The number of arguments can be a negative, zero or positive integer;
 *	a. negative integer => This means the number of arguments are variable and can be as many as possible; In this case; the number of argument types passed should be 1. This type is taken as the type for all other arguments;
 *	b. zero => This means the command takes no arguments;
 *	c. positive integer => This means the command takes a fixed number of arguments;
 * 
 * 3. Number of arguments cannot be 0, if required number is not 0;
 */
export class ArgumentsData {
	public readonly requiredNumber: number;
	readonly types: E_ArgumentTypes[];

	constructor(number: number, ...rest: E_ArgumentTypes[]) {
		this.requiredNumber = number;
		this.types = rest;

		this.validate();
	}

	private validate() {
		//Rule 3
		if(this.types.length === 0 && this.requiredNumber != 0)
			throw new Error("Number of argument types cannot be zero, when the no of arguments are not 0");

		//Rule 2 (a)
		if (this.requiredNumber < 0 && this.types.length !== 1)
			throw new Error(
				"Invalid number of argument types; Only one type is needed for variable number of arguments"
			);

		//Rule 1 and 2 (c)
		if (
			this.requiredNumber > 0 &&
			this.types.length > 1 &&
			this.requiredNumber !== this.types.length
		)
			throw new Error(
				"Invalid number of argument types; The number of argument types should be equal to the number of arguments required"
			);
	}
}
