/**
 * 这个文件用来处理用户行为事件的分发
 * */
import * as E from "./utils/events";
import {
    EVENT_FRAME_DRAWING_TRIGGERED,
    EVENT_FRAME_DRAWING_FAIELD,
    EVENT_FRAME_DRAWING_SATRTED,
    EVENT_FRAME_DRAWING_MOVING,
    EVENT_FRAME_DRAWING_STOPPED,
    EVENT_FRAME_MOVING,
    EVENT_FRAME_RESIZE_BEGIN,
    EVENT_FRAME_RESIZING,
    EVENT_FRAME_RESIZE_END,
    EVENT_MOUSE_LBTN_PRESSED,
    EVENT_MOUSE_LBTN_RELEASED,
    EVENT_FRAME_TOGGLE_FOLDBODY,
    EVENT_FRAME_TOGGLE_MINIMIZE, EVENT_FRAME_TOGGLE_TOOLS, EVENT_FRAME_TOGGLE_PINE, EVENT_FRAME_SAVE_AS, EVENT_FRAME_MOVE_BEGIN, EVENT_FRAME_MOVE_END
} from "./utils/events"
import {EE, IEventEmitter, newEE, EventEmitter, GenEELi, DomEvent, UserAction} from "./utils/interfaces"
import {consolelog, Dispatch, HasClass, InstallEvent, shadowEl, TargetIs, UninstallEvent} from "./utils/funcTools"
import {STATE as S} from "./state"
import {CORE} from "./core";
import {CSSClass} from "./utils/constants";
import * as Console from "console";

let frameDrawing = {
    triggered: (e: KeyboardEvent) => {

        if (e.ctrlKey && e.altKey && (e.key === "e" || e.key === "E")) {
            if (S.FRAME_DRAWING.NO(S.FRAME_DRAWING.TRIGGERED))
                Dispatch(EVENT_FRAME_DRAWING_TRIGGERED)
        }
    },
    stop_failed: (e) => {
        if (e.code === "Escape") {
            if (S.FRAME_DRAWING.HAS(S.FRAME_DRAWING.TRIGGERED)) {
                Dispatch(EVENT_FRAME_DRAWING_STOPPED)
                Dispatch(EVENT_FRAME_DRAWING_FAIELD)
            }
        }
    },
    start: (e: MouseEvent & DomEvent) => {
        if (e.button == 0 && S.FRAME_DRAWING.HAS(S.FRAME_DRAWING.TRIGGERED)) {
            Dispatch(EVENT_FRAME_DRAWING_SATRTED, e)
        }
    },
    moving: (e: MouseEvent & DomEvent) => {
        if (S.MOUSE.LBTN_HOLDING && S.FRAME_DRAWING.HAS(S.FRAME_DRAWING.STARTED)) {
            Dispatch(EVENT_FRAME_DRAWING_MOVING, e)
        }
    },
    stop: (e: MouseEvent & DomEvent) => {
        if (S.FRAME_DRAWING.HAS(S.FRAME_DRAWING.STARTED)) {
            Dispatch(EVENT_FRAME_DRAWING_STOPPED, e)
        }
    }
}
let tempframe = {

    move: {// frame move
        begin: (e: MouseEvent & DomEvent) => {//mouse down
            let ST=S.TEMPFRAME
            if (TargetIs.tempFrameHeaderMoveBar(e.target)
                &&ST.NOGROUP(ST.Groups.MOVE)
            ) {
                Dispatch(EVENT_FRAME_MOVE_BEGIN, e)
            }
        },
        ing: (e: MouseEvent & DomEvent) => {//mouse move
            let ST = S.TEMPFRAME
            if (S.MOUSE.HAS(S.MOUSE.LBTN_HOLDING)
                &&ST.ONLYGROUP(ST.Groups.MOVE)) {
                Dispatch(EVENT_FRAME_MOVING, e)
            }
        },
        end: (e: MouseEvent & DomEvent) => {
            let ST = S.TEMPFRAME
            if (ST.ONLYGROUP(ST.Groups.MOVE)) {
                Dispatch(EVENT_FRAME_MOVE_END)
            }
        },
    },
    resize: {
        trigger: (e: MouseEvent & DomEvent) => {

        },
        begin: (e: MouseEvent & DomEvent) => {

        },
        ing: (e: MouseEvent & DomEvent) => {

        },
        end: (e: MouseEvent & DomEvent) => {

        }
    },
    click: {
        buttonGroup: (e: MouseEvent & DomEvent) => {
            if (!e.target) {
                return
            }
            if (TargetIs.tempframeHeaderButtons(e.target) && S.TEMPFRAME.NO()) {
                if (HasClass(e.target, "icon-close")) {
                    Dispatch(E.EVENT_FRAME_HIDE)
                } else if (HasClass(e.target, "icon-foldbody")) {
                    Dispatch(E.EVENT_FRAME_TOGGLE_FOLDBODY)
                } else if (HasClass(e.target, "icon-minimize")) {
                    Dispatch(E.EVENT_FRAME_TOGGLE_MINIMIZE)
                } else if (HasClass(e.target, "icon-toolbox")) {
                    Dispatch(E.EVENT_FRAME_TOGGLE_TOOLS)
                } else if (HasClass(e.target, "icon-fixed")) {
                    Dispatch(E.EVENT_FRAME_TOGGLE_PINE)
                } else if (HasClass(e.target, "icon-save")) {
                    Dispatch(E.EVENT_FRAME_SAVE_AS)
                }
            }

        }
    }
    ,
    dbclick: {
        setTitle: (e: MouseEvent & DomEvent) => {
            if (TargetIs.tempframeHeaderTitle(e.target)) {
                console.log("title")
            } else if (TargetIs.tempFrameHeaderMoveBar(e.target)) {

            }
        }
    }
}
export let ActionSet: UserAction = {
    AtBody: {
        keydown: (e: KeyboardEvent) => {
            frameDrawing.triggered(e)
            frameDrawing.stop_failed(e)
        },
        mousedown: (e: MouseEvent & DomEvent) => {
            let ST=S.TEMPFRAME
            if (e.button == 0) Dispatch(EVENT_MOUSE_LBTN_PRESSED)
            frameDrawing.start(e)
            if(ST.HAS(ST.SHOW)) {
                tempframe.resize.begin(e)
            }
        },
        mousemove: (e: MouseEvent & DomEvent) => {
            frameDrawing.moving(e)
            let ST=S.TEMPFRAME
            if(ST.HAS(ST.SHOW)){
                tempframe.move.ing(e)
                tempframe.resize.trigger(e)
                tempframe.resize.ing(e)
            }
        },
        mouseup: (e: MouseEvent & DomEvent) => {
            Dispatch(EVENT_MOUSE_LBTN_RELEASED)
            frameDrawing.stop(e)
            let ST=S.TEMPFRAME
            if(ST.HAS(ST.SHOW)){
                tempframe.resize.end(e)
                tempframe.move.end(e)
            }
        },
    },
    AtShadowRoot: {
        click: (e: MouseEvent & DomEvent) => {
            tempframe.click.buttonGroup(e)
        },
        mousedown: (e: MouseEvent & DomEvent) => {
            if (e.button == 0) Dispatch(EVENT_MOUSE_LBTN_PRESSED)
            tempframe.move.begin(e)
        },
        dblclick: (e: MouseEvent & DomEvent) => {
            tempframe.dbclick.setTitle(e)
        }
    }
}


export let InstallAction = (act: UserAction) => {
    let place = {
        AtBody: window,
        AtShadowRoot: CORE.ShadowRoot
    }
    Object.keys(act).forEach((at) => {
        InstallEvent(act[at], place[at])
    })
}
