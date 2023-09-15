import { isBoolean, isNumeric } from "../../utils/utils";
import { E_ArgumentTypes } from "../syntax/command";

export default class EvaluatorUtils {
	/**Checks if a string can be casted to a type */
	static canConvertToType(value: string, expectedType: E_ArgumentTypes) {
		switch (expectedType) {
			case E_ArgumentTypes.number:
				return isNumeric(value);

			case E_ArgumentTypes.boolean:
				return isBoolean(value);

			//Since everything is technically a string, just return true; but this can change in the future
			case E_ArgumentTypes.string:
			case E_ArgumentTypes.any:
				return true;
		}


		return true;
	}

	/**Converts a string value to an expected type; this has no type cast checks, do the checks before using this */
	static convertToType(value: string, expectedType: E_ArgumentTypes) {
		switch (expectedType) {
			case E_ArgumentTypes.number:
				return Number(value);

			case E_ArgumentTypes.boolean:
				return value === "true" ? true : false;

			case E_ArgumentTypes.string:
			case E_ArgumentTypes.any:
				return value;
		}

		
		return value;
	}
}