enum CompileErrorType {
	CommandNotFound,
}

export class CompileError extends Error {
	constructor(txt: string) {
		super(txt);
	}
}

class CommandNotFound extends CompileError {
	constructor() {
		super("Command not found");
	}
}

export const CompilerErrors = {
	CommandNotFound,
};
