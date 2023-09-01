import { secondaryParser, bracketSplitter, stringSplitter } from "./parser";
import { Benchmark, Log } from "./test_utils";

/******Testing********/
Log("String splitting (1)", () =>
	stringSplitter("concat hello world 'hi there'")
);

Log("Bracket wise splitting (1)", () => bracketSplitter("a (b (cd) e)"));
Log("Bracket wise splitting (2)", () =>
	bracketSplitter("add 1 2 3 (sum 1 2 3) (avg 10 10)")
);
Log("Bracket wise splitting (3)", () =>
	bracketSplitter("concat hello 'Hello there howdy'")
);
Log("Bracket wise splitting (4)", () =>
	bracketSplitter("lower (concat Hello World 'Im someone')")
);

Benchmark("Benchmarking bracket splitter", () =>
	bracketSplitter("lower (concat Hello World 'Im someone')")
);

Log("Main parser (1)", () =>
	secondaryParser("add 1 2 3 (sum 1 2 3) (avg 10 10)")
);
Log("Main parser (2)", () =>
	secondaryParser("concat hello 'hi there' (lower HELLO)")
);
Log("Main parser (3)", () => secondaryParser("search 'hello world' 'hello'"));

Benchmark("Benchmarking main parser", () =>
	secondaryParser(
		"add 1 2 3 (sum 1 2 3) (avg 10 10) (root 10) (mult 20 4 (sum 10 (avg 10 5)))"
	)
);
