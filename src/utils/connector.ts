import {
    EVENT_TEMPFRAME_APPENDED,
    EVENT_TEMPFRAME_REMOVED,
    EVENT_NEED_MASK,
    EVENT_NO_MASK,
    EVENT_FRAME_DRAWING_TRIGGERED,
    EVENT_FRAME_DRAWING_SATRTED,
    EVENT_FRAME_DRAWING_MOVING,
    EVENT_FRAME_DRAWING_STOPPED,
    EVENT_FRAME_DRAWING_SUCCESS,
    EVENT_FRAME_DRAWING_FAIELD,
    EVENT_INFOMATION, EVENT_FRAME_MOVE_BEGIN, EVENT_FRAME_MOVE_END, EVENT_FRAME_HIDE, EVENT_FRAME_RESIZE_TRIGGERED, EVENT_FRAME_RESIZING, EVENT_FRAME_AT_BUTTON, EVENT_FRAME_OUT_BUTTON,
} from "./events"
import {CORE} from "../core";
import {STATE as S} from "../state"
import {EventEmitter, GenEELi, IService} from "./interfaces";
import {consolelog, InstallEvent, UninstallEvent} from "./funcTools";

export const StopService=(srv:IService)=>{
    UninstallEvent(srv.registEvents)
}

export  const SetupCoreEventEmitter=()=>{
    consolelog("SetupCoreEventEmitter")
    let [state,mask,root,draw,tempframe] =
        [CORE.StateService,CORE.MaskService,CORE.ShadowRootService ,
            CORE.TempFrameDrawingService,CORE.TempFrameService]

    state.registEvents={
        EVENT_FRAME_DRAWING_TRIGGERED:()=>{S.FRAME_DRAWING.ADD(S.FRAME_DRAWING.TRIGGERD)},
        EVENT_FRAME_DRAWING_SATRTED:()=>{S.FRAME_DRAWING.ADD(S.FRAME_DRAWING.STARTED)},
        EVENT_FRAME_DRAWING_MOVING:()=>{S.FRAME_DRAWING.ADD(S.FRAME_DRAWING.MOVING)},
        EVENT_FRAME_DRAWING_STOPPED:()=>{S.FRAME_DRAWING.CLEAR()},
        EVENT_FRAME_SHOW:()=>{S.TEMPFRAME.ADD(S.TEMPFRAME.SHOW)},
        EVENT_FRAME_HIDE:()=>{S.TEMPFRAME.CLEAR()},
        EVENT_FRAME_MOVE_BEGIN:()=>{
            S.TEMPFRAME.ADD(S.TEMPFRAME.MOVING)
            S.TEMPFRAME.ClearResize()
        },
        EVENT_FRAME_MOVE_END:()=>{S.TEMPFRAME.DEL(S.TEMPFRAME.MOVING)},
        EVENT_FRAME_RESIZE_TRIGGERED:()=>{
            S.TEMPFRAME.ADD(S.TEMPFRAME.RESIZE_TRIGGERED)
            S.TEMPFRAME.DEL(S.TEMPFRAME.MOVING)
        },
        EVENT_FRAME_RESIZE_BEGIN:()=>{S.TEMPFRAME.ADD(S.TEMPFRAME.RESIZE_BEGIN)},
        EVENT_FRAME_RESIZING:()=>{S.TEMPFRAME.ADD(S.TEMPFRAME.RESIZE_DOING)},
        EVENT_FRAME_RESIZE_END:()=>{S.TEMPFRAME
            .DEL(S.TEMPFRAME.RESIZE_DOING,S.TEMPFRAME.RESIZE_TRIGGERED, S.TEMPFRAME.RESIZE_BEGIN)},
        EVENT_FRAME_AT_BUTTON:()=>{S.TEMPFRAME.ADD(S.TEMPFRAME.AT_BUTTON)},
        EVENT_FRAME_OUT_BUTTON:()=>{S.TEMPFRAME.DEL(S.TEMPFRAME.AT_BUTTON)}
    }
    root.registEvents={
        EVENT_FRAME_DRAWING_TRIGGERED:root.EnableHostPointerEvent,
        EVENT_FRAME_DRAWING_STOPPED:root.DisableHostPointerEvent
    }
    mask.registEvents={
        EVENT_NO_MASK:mask.HideMask,
        EVENT_NEED_MASK:mask.ShowMask
    }
    draw.registEvents={
        EVENT_FRAME_DRAWING_TRIGGERED:draw.OnDrawingFrameTriggered,
        EVENT_FRAME_DRAWING_SATRTED:draw.OnDrawingFrameStarted,
        EVENT_FRAME_DRAWING_MOVING:draw.OnDrawingFrameMoving,
        EVENT_FRAME_DRAWING_STOPPED:draw.OnDrawingFrameStopped,
        EVENT_FRAME_DRAWING_FAIELD:draw.OnDrawingFrameFailed,
    }
    tempframe.registEvents={
        EVENT_FRAME_DRAWING_SUCCESS:tempframe.OnDrawingSuccess,
        EVENT_FRAME_HIDE:tempframe.OnHide,


        EVENT_FRAME_MOVE_BEGIN:tempframe.OnMoveBegin,
        EVENT_FRAME_MOVING:tempframe.OnMove,
        EVENT_FRAME_MOVE_END:tempframe.OnMoveEnd,

        // mouse hover -> state triggered(初始条件具备)
        // mousedown -> state begin
        // mousemove -> state resizing
        // mouseup -> state end
        EVENT_FRAME_MOUSE_HOVER:tempframe.OnMouseHover,
        // EVENT_FRAME_RESIZE_BEGIN:tempframe.OnResizeBegin,//mousedown到这里 begin修改状态为begin
        EVENT_FRAME_RESIZING:tempframe.OnResizing,//mousemove到这里 在triggered, begin, doing 状态齐全下, 接受moving数据
        EVENT_FRAME_RESIZE_END:tempframe.OnResizeEnd,
    }
}

export const InstallCoreEventEmitter=(E:IService[])=>{

    E.map((e)=>{
        InstallEvent(e.registEvents)})
}