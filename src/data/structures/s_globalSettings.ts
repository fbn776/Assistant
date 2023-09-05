export interface I_GlobalSettings {
	/** Controls the theme */
	theme: "light" | "dark";

	/**Controls weather when new message is created, it is scrolled to*/
	scrollToNewMessage: boolean;
	/**Controls weather the date of the message is shown*/
	showMessageDate: boolean;

	/**Controls message submission on enter */
	submitOnEnter: boolean;
}

export const DefaultGlobalSettings: I_GlobalSettings = {
	scrollToNewMessage: true,
	showMessageDate: true,
	theme: "light",
	submitOnEnter: true,
};
