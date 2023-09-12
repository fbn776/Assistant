export interface I_GlobalSettings {
	/** Controls the theme */
	theme: "light" | "dark";

	/**Controls weather the date of the message is shown*/
	showMessageDate: boolean;
	/**Controls weather when new message is created, it is scrolled to*/
	scrollToNewMessage: boolean;
	/**Controls scroll behavior */
	scrollToMessageBehavior: "smooth" | "instant" | "auto";

	/**Controls message submission on enter */
	submitOnEnter: boolean;
	/**Controls weather the message input is cleared on submit */
	clearOnSubmit: boolean;
}

export const DefaultGlobalSettings: I_GlobalSettings = {
	theme: "light",

	showMessageDate: true,
	scrollToNewMessage: true,
	scrollToMessageBehavior: "smooth",

	submitOnEnter: true,
	clearOnSubmit: false,
};
