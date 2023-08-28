import { FC } from "react";
import "./app.css";
import { IconCategory, IconSend } from "@tabler/icons-react";


export const App: FC = () => {
	return <>
		<section className="w-full top-0 min-h-[calc(100vh-60px)] bg-slate-50">
			NDKM
		</section>
		<section className="w-full h-[60px] bg-white bottom-0 border-slate-600 border-t-2">
			<div className="w-full h-full flex justify-center items-center p-3 gap-1">
				<IconCategory size={"30px"}/>
				<input type="text" className="w-full h-full outline-none border-none bg-transparent shadow-inner px-3 rounded-2xl" placeholder="Type here.."/>
				<IconSend/>
			</div>
		</section>
	</>
}
