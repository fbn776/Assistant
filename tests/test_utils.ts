/**
 * A printer/logger function that prints the title, the result of the test function and the time it took to run the test function.
 */
export function Log<T>(title: string = "", testFunc: () => T) {
	console.log(`\n\x1b[4;1m\x1b[34;1m${title}\x1b[0m`);
	console.time("time");
	console.log(testFunc());
	console.timeEnd("time");
}

export function Benchmark<T>(
	title: string = "",
	testFunc: () => T,
	n: number = 1000000
) {
	console.log(`\n\x1b[4;1m\x1b[34;1m${title}\x1b[0m`);
	let total = 0;
	let min = 999999999,
		max = 0,
		start, end, dt;

	for (let i = 0; i < n; i++) {
		start = performance.now();
		testFunc();
		end = performance.now();
		
		dt = end - start;
		total += dt;
		if(dt > max) max = dt;
		if(dt < min) min = dt;
	}

	console.table({
		"Number of runs": n,
		"Total time": total,
		"Average time": total / n,
		"Min time": min,
		"Max time": max,
	})
}
