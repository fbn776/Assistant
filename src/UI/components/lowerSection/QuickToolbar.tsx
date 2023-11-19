import {QuickToolBarItems} from "../../../data/d_quickToolBarItems.tsx";
import {FC, memo, useRef} from "react";
import {GlobalController} from "../../../controllers/c_Controller.ts";

type prop = {
    globalController: GlobalController;
}
const QuickToolbar: FC<prop> = ({globalController}) => {
    return (
        <div className="no-scrollbar flex flex-grow overflow-x-scroll overflow-y-hidden h-full bg-opacity-70 dark:bg-opacity-70 bg-l-prim-cont-variant dark:bg-d-prim-cont-variant text-l-prim-cont-txt dark:text-d-prim-cont-txt">
            {QuickToolBarItems.map((item, index) => {
                let elm = useRef<HTMLDivElement>(null);
                return (
                    <div
                        key={index}
                        className="select-none font-semibold cursor-pointer aspect-square flex justify-center items-center quick-toolbar-items primary-color-on-hover hover:scale-125"
                        ref={elm}
                        onClick={() => {
                            item.onClick(
                                globalController,
                                item.displayItem as string,
                                elm
                            );
                        }}
                    >
                        {item.displayItem}
                    </div>
                );
            })}
        </div>
    )
}

export default memo(QuickToolbar);