import {CR} from "../registry_instance.ts";

//PI
new CR()
    .addAlias("pi", "PI")
    .addDocs("Value of PI (3.14159265359)", "pi")
    .noArgs()
    .addExec((_) => Math.PI)
    .build();

//E
new CR()
    .addAlias("e", "E")
    .addDocs("Value of E (2.71828182845904523)", "e")
    .noArgs()
    .addExec((_) => Math.E)
    .build();
