/**The registry instance class. This has the registry instance that is used to store the commands.
 * This same instance is used in the command controller
 */
import { CommandRegistry } from "../controllers/commands/CommandRegistry.ts";

const command_registry_instance = new CommandRegistry();


export default command_registry_instance;