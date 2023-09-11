import Documentation from "./Documentation";

export default class DocumentationBuilder {
	private _description: string = "";
	private _syntax: string | null = null;
	private _examples: string | null = null;

	addDescription(description: string) {
		this._description = description;
		return this;
	}

	addSyntax(syntax: string) {
		this._syntax = syntax;
		return this;
	}

	addExamples(examples: string) {
		this._examples = examples;
		return this;
	}

	build() {
		return new Documentation(this._description, this._syntax, this._examples);
	}
}
