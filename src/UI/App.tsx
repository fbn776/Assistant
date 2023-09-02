import { FC, useEffect } from "react";
import "./app.css";
import { UpperSection } from "./sections/UpperSection";
import { LowerSection } from "./sections/LowerSection";


//! DARK MODE; Remove this when done
document.body.classList.toggle("dark");

export const App: FC = () => {
	return (
		<>
			<UpperSection />
			<LowerSection />
		</>
	);
};
