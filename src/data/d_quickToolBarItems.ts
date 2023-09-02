interface QuickToolBarItem {
	name: string;
	onClick?: () => void;
	icons?: JSX.Element[];
}


export const QuickToolBarItems: Array<QuickToolBarItem> = [
	{
		name: "/",
	},
	{
		name: "#",
	},
	{
		name: "@",
	},
	{
		name: "'",
	},
	{
		name: '"',
	},
	{
		name: "!",
	},
	{
		name: "?",
	},
	{
		name: "*",
	},
	{
		name: "&",
	},
	{
		name: "|",
	},
	{
		name: ">",
	},
	{
		name: "<",
	},
	{
		name: "\\",
	},
];
