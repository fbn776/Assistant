import {CR} from "../registry_instance.ts";
import { E_ArgumentTypes as types } from "../../execution/syntax/syntaxdata/ArgumentsData.ts";

//DEG TO RAD
new CR()
    .addAlias("rad", "radians", "radOf", "toRad")
    .addDocs("Converts degree to radians")
    .addMonoArgs(types.number)
    .addExec((_, a: number) => a * (Math.PI / 180))
    .build();

//RAD TO DEG
new CR()
    .addAlias("deg", "degrees", "degOf", "toDeg")
    .addDocs("Convert radians to degree")
    .addMonoArgs(types.number)
    .addExec((_, a: number) => a * (180 / Math.PI))
    .build();

//SINE
new CR()
    .addAlias("sin", "sine")
    .addDocs("Returns the sine of a number")
    .addMonoArgs(types.number)
    .addExec((_, a: number) => Math.sin(a))
    .build();

//COSINE
new CR()
    .addAlias("cos", "cosine")
    .addDocs("Returns the cosine of a number")
    .addMonoArgs(types.number)
    .addExec((_, a: number) => Math.cos(a))
    .build();

//TAN
new CR()
    .addAlias("tan", "tangent")
    .addDocs("Returns the tangent of a number")
    .addMonoArgs(types.number)
    .addExec((_, a: number) => Math.tan(a))
    .build();

//ARC-SINE
new CR()
    .addAlias("arcsin", "arcsine", "asin", "asine")
    .addDocs("Returns the arc sine")
    .addMonoArgs(types.number)
    .addExec((_, a: number) => Math.asin(a))
    .build();

//ARC-COSINE
new CR()
    .addAlias("arccos", "arccosine", "acos", "acosine")
    .addDocs("Returns the arc cosine of a number")
    .addMonoArgs(types.number)
    .addExec((_, a: number) => Math.acos(a))
    .build();

//ARC-TAN
new CR()
    .addAlias("arctan", "arctangent", "atan", "atangent")
    .addDocs("Returns the arc tangent of a number")
    .addMonoArgs(types.number)
    .addExec((_, a: number) => Math.atan(a))
    .build();
