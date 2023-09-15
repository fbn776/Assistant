import {
	IconArrowBackUp,
	IconCaretDown,
	IconCaretLeft,
	IconCaretRight,
	IconCaretUp,
	IconCopy,
	IconCut,
	IconTrash,
	IconClipboard,
} from "@tabler/icons-react";
import { GlobalController } from "../controllers/c_Controller";

class QuickToolBarItem {
	/**Text/Element to be displayed in the tool bar;*/
	displayItem: string | JSX.Element;
	/**Determines what happens when user clicks on this particular tool bar item */
	onClick: (
		controller?: GlobalController,
		txt?: string,
		ref?: React.RefObject<HTMLDivElement>
	) => void;

	constructor(
		item: string | JSX.Element,
		onClick: (
			c?: GlobalController,
			txt?: string,
			ref?: React.RefObject<HTMLDivElement>
		) => void
	) {
		this.displayItem = item;
		this.onClick = onClick;
	}
}

function insertText(c?: GlobalController, txt?: string) {
	if (!c?.ui.dependencies.mainInputRef?.current) return;

	// c.dependencies.mainInputRef.current.focus();
	c.ui.input.insertTextAt(txt ?? "");
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
		c?.ui.input.offsetCursor(-1);
	}),
	new QuickToolBarItem(<IconCaretRight stroke={1.5} />, (c) => {
		c?.ui.input.offsetCursor(1);
	}),
	new QuickToolBarItem(<IconCaretUp stroke={1.5} />, (c) => {
		c?.ui.input.setToPreviousHistory();
	}),
	new QuickToolBarItem(<IconCaretDown stroke={1.5} />, (c) => {
		c?.ui.input.setToNextHistory();
	}),
	new QuickToolBarItem(<IconArrowBackUp size={22} />, (c) => {
		c?.ui.input.setToLastMessage();
	}),
	new QuickToolBarItem(<IconCopy size={20} />, (c, _txt, ref) => {
		c?.ui.input.copyText();
		if (ref?.current) c?.ui.initSuccessAnimation(ref?.current);
	}),
	new QuickToolBarItem(<IconCut size={20} />, (c, _txt, ref) => {
		c?.ui.input.cutText();
		if (ref?.current) c?.ui.initSuccessAnimation(ref?.current);
	}),

	new QuickToolBarItem(<IconClipboard size={20} />, (c, _txt, ref) => {
		c?.ui.input.pasteText(
			() => {
				if (ref?.current) {
					ref.current.classList.remove("disabled");
					c.ui.initSuccessAnimation(ref.current);
				}
			},
			(e) => {
				console.error(e);
				if (ref?.current) ref.current.classList.add("disabled");
			}
		);
	}),

	new QuickToolBarItem(<IconTrash size={20} />, (c, _txt, ref) => {
		c?.ui.input.clear();
		c?.ui.input.focus();
		if (ref?.current) c?.ui.initSuccessAnimation(ref?.current);
	}),
];
