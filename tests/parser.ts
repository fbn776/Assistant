/**
 * A printer/logger function
 */
function Log<T>(
	input: string,
	testFunc: (arg0: string) => Array<T>,
	title: string = ""
) {
	console.log(`\n\x1b[4;1m\x1b[34;1m${title}\x1b[0m`);
	console.time(title);
	console.log(testFunc(input));
	console.timeEnd(title);
}

/**
 * Basic splitting; splits the string based on the given delimiter. No additional process done.
 * Could be replaced by `string.split(delimiter)` but that would be cheating 😉
 * @param str string to be splitted (input)
 * @param delimiter delimiter to split the string on
 * @returns the splitted string as an array
 */
function basicSplitter(str: string, delimiter: string = " "): string[] {
	let result: string[] = [];
	let temp = "";
	for (let i = 0; i < str.length; i++) {
		if (str[i] == delimiter) {
			result.push(temp);
			temp = "";
		} else {
			temp += str[i];
		}
	}
	temp && result.push(temp);

	return result;
}


function getBrackets(str: string, start: string, end: string) {

}

/**
 * A more advanced splitter that splits the string based on the given `delimiter` and also splits the string if there is quotes (', ", `) in the string.
 * @param str input string
 * @param delimiter delimiter to split the string on
 * @returns the splitted string as an array
 */
function stringSplitter(str: string, delimiter: string = " "): string[] {
	let result: string[] = [];
	let temp = "";
	for (let i = 0; i < str.length; i++) {
		if (
			str[i] === delimiter ||
			str[i] === "'" ||
			str[i] === '"' ||
			str[i] === "`"
		) {
			if (str[i] != delimiter) {
				if (i > 0 && str[i - 1] != " ") throw new Error("Space not found");

				let nextIndex = str.indexOf(str[i], i + 1);

				if (nextIndex === -1) throw new Error("No closing quote found");

				result.push(str.substring(i + 1, nextIndex));
				i = nextIndex + 1;

				if (i < str.length && str[i] != " ") throw new Error("Space not found");

				continue;
			}
			result.push(temp);
			temp = "";
		} else {
			temp += str[i];
		}
	}
	//Only push if there is something in temp; (short circuit evaluation)
	temp && result.push(temp);

	return result;
}

function bracketSplitter(str: string, delimiter: string = " "): any {
	let result: any = [];

	for(let i=0; i < str.length; i++) {
		
	}

	return result;
}

// Testing;
Log("add 10 15 ", basicSplitter, "basic splitter");

Log(
	"concat 10 20 15 'and some text' 'and some more text' 10 argN",
	stringSplitter,
	"string splitter"
);

Log("add 10 20 (sum 10 (add 10 20) 20) 10", bracketSplitter, "bracket splitter");
