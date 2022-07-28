import * as E from "./utils/events";
import {
    EVENT_FRAME_DRAWING_TRIGGERED,
    EVENT_FRAME_DRAWING_FAIELD,
    EVENT_FRAME_DRAWING_SATRTED,
    EVENT_FRAME_DRAWING_MOVING,
    EVENT_FRAME_DRAWING_STOPPED, EVENT_FRAME_MOVING, EVENT_FRAME_RESIZE_BEGIN, EVENT_FRAME_RESIZING, EVENT_FRAME_RESIZE_END
} from "./utils/events"
import {EE, IEventEmitter, newEE, EventEmitter, GenEELi, DomEvent} from "./utils/interfaces"
import {consolelog, Dispatch, InstallEvent, shadowEl, TargetIs, UninstallEvent} from "./utils/funcTools"
import {STATE as S} from "./state"
import {CORE} from "./core";
import {CSSClass} from "./utils/constants";
// let S = CORE.STATE
function ActionEmitter_AtBody_keydown(e: KeyboardEvent) {
    if(e.ctrlKey && e.altKey &&( e.key==="e"||e.key==="E")) {
        if(!CORE.STATE.FRAME_DRAWING_TRIGGERED)
            Dispatch(EVENT_FRAME_DRAWING_TRIGGERED)
    }
    if(e.code === "Escape"){
        if(CORE.STATE.FRAME_DRAWING_TRIGGERED) {
            Dispatch(EVENT_FRAME_DRAWING_STOPPED)
            Dispatch(EVENT_FRAME_DRAWING_FAIELD)
        }
    }
}
function ActionEmitter_AtBody_mousedown(e:MouseEvent & DomEvent){
    let ST = S.TEMPFRAME
    if(e.button==0) {
        if (S.FRAME_DRAWING.HAS(S.FRAME_DRAWING.TRIGGERD)) {
            Dispatch(EVENT_FRAME_DRAWING_SATRTED, e)
        }
        else if (ST.ALL(ST.RESIZE_TRIGGERED) && ST.NO(ST.RESIZE_DOING,ST.RESIZE_BEGIN,ST.AT_BUTTON)
            ){
            Dispatch(EVENT_FRAME_RESIZE_BEGIN,e)//发送后, 会有DOING状态, 只会触发一次, 因为DOING状态会持续存在
        }
    }
}
function ActionEmitter_AtBody_mousemove(e:MouseEvent & DomEvent){
    let ST = S.TEMPFRAME
    if(e.button==0) {
        if(S.FRAME_DRAWING.HAS(S.FRAME_DRAWING.STARTED)){
            Dispatch(EVENT_FRAME_DRAWING_MOVING,e)
        }
        else if (ST.HAS(ST.SHOW)&&ST.NO(ST.AT_BUTTON)) {
            if (ST.HAS(ST.MOVING))Dispatch(E.EVENT_FRAME_MOVING, e)
            else if (ST.NO(ST.RESIZE_BEGIN))
            {
                Dispatch(E.EVENT_FRAME_MOUSE_HOVER, e) //如果检测通过,会发射EVENT_FRAME_RESIZE_TRIGGERED
            }
            else if (ST.HAS(ST.RESIZE_BEGIN)){
                Dispatch(EVENT_FRAME_RESIZING,e)
            }

        }
    }
}
function ActionEmitter_AtBody_mouseup(e:MouseEvent & DomEvent){
    if(S.FRAME_DRAWING.HAS(S.FRAME_DRAWING.STARTED)){
        Dispatch(EVENT_FRAME_DRAWING_STOPPED,e)
    }
    else if (S.TEMPFRAME.ALL(S.TEMPFRAME.SHOW,S.TEMPFRAME.MOVING)) {
        Dispatch(E.EVENT_FRAME_MOVE_END)
    }
    else if (S.TEMPFRAME.ALL(S.TEMPFRAME.SHOW,S.TEMPFRAME.RESIZE_DOING)){
        Dispatch(EVENT_FRAME_RESIZE_END)
    }
}

function ActionEmitter_AtShadowRoot_mousedown(e:MouseEvent & DomEvent){

    if(e.button==0){
        if(S.TEMPFRAME.HAS(S.TEMPFRAME.SHOW)){
                //开始移动 TEMPFRAME
            if(e.target.classList.contains(CSSClass.tempFrameHeaderMoveBar)){
                Dispatch(E.EVENT_FRAME_MOVE_BEGIN,e)
            }
            else if(TargetIs.tempframeHeaderButtons(e.target) && e.target.className.indexOf("close")>=0 ){
                Dispatch(E.EVENT_FRAME_HIDE)
            }

        }
    }
}
function ActionEmitter_AtShadowRoot_mousemove(e:MouseEvent & DomEvent) {
    // if (TargetIs.tempframeHeaderButtons(e.target) || TargetIs.tempframeFooterButtons(e.target)){
    //     Dispatch(E.EVENT_FRAME_AT_BUTTON)
    // }
    // else{
    //     Dispatch(E.EVENT_FRAME_OUT_BUTTON)
    //
    // }
}
function ActionEmitter_AtShadowRoot_mouseup(e:MouseEvent & DomEvent){
}
let ActionSet_AtBody:EventEmitter= {
    keydown: ActionEmitter_AtBody_keydown,
    mousedown: ActionEmitter_AtBody_mousedown,
    mousemove: ActionEmitter_AtBody_mousemove,
    mouseup: ActionEmitter_AtBody_mouseup,
}

let ActionSet_AtShadowRoot:EventEmitter={
    mousedown: ActionEmitter_AtShadowRoot_mousedown,
    mousemove: ActionEmitter_AtShadowRoot_mousemove,
    mouseup: ActionEmitter_AtShadowRoot_mouseup,
}


export function ServiceMain(){}

export function InstallDispatch_AtBody(){
    InstallEvent(ActionSet_AtBody)
}
export function InstallDispatch_AtShadowRoot(){
    InstallEvent(ActionSet_AtShadowRoot,CORE.ShadowRoot)
}
export function UninstallDispatch_TempFrameDrawing(){
    UninstallEvent(ActionSet_AtBody)
}
