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
 * Could be replaced by string.split(delimiter) but that would be cheating 😉
 * @param str
 * @param delimiter
 * @returns
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
	result.push(temp);

	return result;
}

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

				if (nextIndex === -1) throw new Error("No closing bracket found");

				result.push(str.substring(i + 1, nextIndex));
				i = nextIndex + 1;

				if (i < str.length && str[i] != " ") throw new Error("Space not found");

				continue;
			} else {
				result.push(temp);
				temp = "";
			}
		} else {
			temp += str[i];
		}
	}

	temp && result.push(temp);

	return result;
}

// Testing;
Log("add 10 15", basicSplitter, "basic splitter");

Log(
	"concat hello there 'Hii its been a good move'",
	stringSplitter,
	"string splitter"
);
