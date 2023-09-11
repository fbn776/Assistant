import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { App } from './UI/App'
import { ArgumentsData, E_ArgumentTypes } from './commands/utils/arguments'
import { CommandRegistry } from './commands/Registry'
import Documentation from './commands/documentation/Documentation'

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<App />
	</React.StrictMode>,
)

let r = new CommandRegistry();

r.register({
	name: ["hello", 'hi'],
	arguments: new ArgumentsData(2, E_ArgumentTypes.number),
	exec: (a: number, b: number) => {
		return a + b;
	},
	metadata: new Documentation("hha"),
});

r.register({
	name: ["hello", "hi"],
	arguments: new ArgumentsData(2, E_ArgumentTypes.number),
	exec: (a: number, b: number) => {
		return a + b;
	},
	metadata: new Documentation("hha"),
});