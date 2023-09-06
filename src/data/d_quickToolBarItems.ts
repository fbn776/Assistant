import { GlobalController } from './../controllers/c_Controller';

class QuickToolBarItem {
	/**Text/Element to be displayed in the tool bar;*/
	displayItem: string | JSX.Element[];
	/**Determines what happens when user clicks on this particular tool bar item */
	onClick: (controller?: GlobalController, txt?: string) => void;

	constructor(item: string | JSX.Element[], onClick: (c?: GlobalController, txt?: string) => void) {
		this.displayItem = item;
		this.onClick = onClick;
	}
}

function insertText(c?: GlobalController, txt?: string) {
	c?.uiEvents.input.insertText(txt ?? "");
}

export const QuickToolBarItems: Array<QuickToolBarItem> = [
	new QuickToolBarItem("#", (c) => {
		c?.uiEvents.input.insertText("#");
	}),
	new QuickToolBarItem("<", insertText),
	new QuickToolBarItem(">", insertText),
	new QuickToolBarItem("/", insertText),
	new QuickToolBarItem('"', insertText),
	new QuickToolBarItem("'", insertText),
	new QuickToolBarItem("`", insertText),
	new QuickToolBarItem("!", insertText),
	new QuickToolBarItem("@", insertText),
	new QuickToolBarItem("$", insertText),
	new QuickToolBarItem("%", insertText),
	new QuickToolBarItem("^", insertText),
	new QuickToolBarItem("&", insertText),
	new QuickToolBarItem("*", insertText),
	new QuickToolBarItem("(", insertText),
	new QuickToolBarItem(")", insertText),
	new QuickToolBarItem("-", insertText),
	new QuickToolBarItem("_", insertText),
	new QuickToolBarItem("+", insertText),
	new QuickToolBarItem("=", insertText),
	new QuickToolBarItem("{", insertText),
	new QuickToolBarItem("}", insertText),
	new QuickToolBarItem("[", insertText),
	new QuickToolBarItem("]", insertText),
	new QuickToolBarItem("|", insertText),
];
