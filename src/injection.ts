import {CORE} from "./core";
import {InstallCoreEventEmitter, SetupCoreEventEmitter} from "./utils/connector";
import {test} from "./test";
import {Dispatch} from "./utils/funcTools";
console.log("injection 文件已经加载")

CORE.InstallStyles()
CORE.InstallDisptach()
CORE.InstallEvents()
chrome.runtime.onMessage.addListener((message, sender, sendResponse)=>{
        console.log(sender.tab ?
                "from a content script:" + sender.tab.url :
                "from the extension");

        if(message.EVENT=="EVENT_FRAME_DRAWING_TRIGGERED" &&CORE.STATE.FRAME_DRAWING.IsBasicState()){
            Dispatch(message.EVENT)
        }
})