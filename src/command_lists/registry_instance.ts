/**The registry instance class. This has the registry instance that is used to store the commands.
 * This same instance is used in the command controller
 */
import {CommandRegistry, I_CommandRegistryFormat,} from "../execution/CommandRegistry.ts";
import Documentation from "../execution/syntax/syntaxdata/Documentation.ts";
import {ArgumentsData, E_ArgumentTypes} from "../execution/syntax/syntaxdata";

export const command_registry_instance = new CommandRegistry();

/**
 * CR - Command Registry; a command builder class, that builds a command and then registers it to the command registry when `build` is called;
 * @param names The name of the command
 * @param args The arguments data
 * @see {@link ArgumentsData}
 * @param metadata The documentation data
 * @see {@link Documentation}
 * @param exec The function to execute when the command is called
 */
export class CR {
    private names: string[] = [];
    private args!: [number, ...E_ArgumentTypes[]];
    private metadata: [string, string?, string?] = ["", "", ""];
    private exec!: I_CommandRegistryFormat["exec"];

    /**Adds the name of the command, more than one names are treated as command aliases*/
    addAlias(...names: string[]) {
        this.names = [...this.names, ...names];
        return this;
    }

    /**Adds the arguments data*/
    addArgs(num: number, ...types: E_ArgumentTypes[]) {
        this.args = [num, ...types];
        return this;
    }

    /**Variable arguments, only type required**/
    addVarArgs(type: E_ArgumentTypes) {
        this.args = [-1, type];
        return this;
    }

    /**No arguments taken**/
    addNoArgs() {
        this.args = [0];
        return this;
    }

    /**Mono argument**/
    addMonoArgs(type: E_ArgumentTypes) {
        this.args = [1, type];
        return this;
    }

    noArgs() {
        this.args = [0];
        return this;
    }

    /**(OPTIONAL) Adds the documentation data*/
    addDocs(desc: string, syntax?: string, example?: string) {
        this.metadata = [desc, syntax, example];
        return this;
    }

    /**Adds the function to execute when the command is called*/
    addExec(exec: I_CommandRegistryFormat["exec"]) {
        this.exec = exec;
        return this;
    }

    /**Builds the command and registers it to the command registry*/
    build() {
        command_registry_instance.register({
            name: this.names,
            arguments: new ArgumentsData(...this.args),
            metadata: new Documentation(...this.metadata),
            exec: this.exec,
        });
    }
}