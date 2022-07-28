import * as e from "./utils/events"
import {EVENT_FRAME_DRAWING_TRIGGERED} from "./utils/events"
import {InstallEvent} from "./utils/funcTools";

export function test() {
    InstallEvent({
        EVENT_FRAME_DRAWING_TRIGGERED: () => {
            console.log("收到 EVENT_FRAME_DRAWING_TRIGGERED")
        }
    })

    // document.body.addEventListener(EVENT_FRAME_DRAWING_TRIGGERED,()=>{ console.log("收到 EVENT_FRAME_DRAWING_TRIGGERED")})
}