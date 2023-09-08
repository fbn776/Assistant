import {
	IconArrowBackUp,
	IconCaretDown,
	IconCaretLeft,
	IconCaretRight,
	IconCaretUp,
	IconCopy,
	IconCut,
	IconTrash,
} from "@tabler/icons-react";
import { GlobalController } from "../controllers/c_Controller";

import { Benchmark } from "../../tests/test_utils";

class QuickToolBarItem {
	/**Text/Element to be displayed in the tool bar;*/
	displayItem: string | JSX.Element;
	/**Determines what happens when user clicks on this particular tool bar item */
	onClick: (controller?: GlobalController, txt?: string) => void;

	constructor(
		item: string | JSX.Element,
		onClick: (c?: GlobalController, txt?: string) => void
	) {
		this.displayItem = item;
		this.onClick = onClick;
	}
}

function insertText(c?: GlobalController, txt?: string) {
	if (!c?.uiController.dependencies.mainInputRef?.current) return;

	// c.dependencies.mainInputRef.current.focus();
	c.uiController.input.insertTextAt(txt ?? "");
}

const specialCharacters = [
	"(",
	")",
	"{",
	"}",
	"[",
	"]",
	"<",
	">",
	"'",
	'"',
	",",
	".",
	"=",
	"+",
	"-",
	"*",
	";",
	":",
	"/",
	"|",
	"&",
	"!",
	"?",
	"@",
	"#",
	"%",
	"^",
	"~",
	"_",
	"$",
];

export const QuickToolBarItems: Array<QuickToolBarItem> = [
	...specialCharacters.map((char) => new QuickToolBarItem(char, insertText)),

	/**Controls */
	new QuickToolBarItem(<IconCaretLeft stroke={1.5} />, (c) => {
		c?.uiController.input.offsetCursor(-1);
	}),
	new QuickToolBarItem(<IconCaretRight stroke={1.5} />, (c) => {
		c?.uiController.input.offsetCursor(1);
	}),
	new QuickToolBarItem(<IconCaretUp stroke={1.5} />, (c) => {
		c?.uiController.input.setToPreviousHistory();
	}),
	new QuickToolBarItem(<IconCaretDown stroke={1.5} />, (c) => {
		c?.uiController.input.setToNextHistory();
	}),
	new QuickToolBarItem(<IconArrowBackUp size={22} />, (c) => {
		c?.uiController.input.setToLastMessage()
	}),
	new QuickToolBarItem(<IconCopy size={20} />, () => {}),
	new QuickToolBarItem(<IconCut size={20} />, () => {}),
	
	new QuickToolBarItem(<IconTrash size={20} />, (c) => {
		c?.uiController.input.clear();
	}),
];
