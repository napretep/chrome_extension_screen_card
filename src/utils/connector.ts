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
    EVENT_INFOMATION,
    EVENT_FRAME_MOVE_BEGIN,
    EVENT_FRAME_MOVE_END,
    EVENT_FRAME_HIDE,
    EVENT_FRAME_RESIZE_TRIGGERED,
    EVENT_FRAME_RESIZING,
    EVENT_FRAME_AT_BUTTON,
    EVENT_FRAME_OUT_BUTTON,
    EVENT_MOUSE_LBTN_RELEASED,
    EVENT_MOUSE_LBTN_PRESSED,
    EVENT_FRAME_TOGGLE_FOLDBODY, EVENT_FRAME_TOGGLE_TOOLS, EVENT_FRAME_TOGGLE_PINE, EVENT_FRAME_SAVE_AS, EVENT_FRAME_MOVING,
} from "./events"
import {CORE} from "../core";
import {STATE as S} from "../state"
import {EventEmitter, GenEELi, IService} from "./interfaces";
import {consolelog, InstallEvent, UninstallEvent} from "./funcTools";

export const StopService = (srv: IService) => {
    UninstallEvent(srv.registEvents)
}

export const SetupCoreEventEmitter = () => {
    consolelog("SetupCoreEventEmitter")
    let [state, mask, root, draw, tempframe] =
        [CORE.StateService, CORE.MaskService, CORE.ShadowRootService,
            CORE.TempFrameDrawingService, CORE.TempFrameService]

    state.registEvents = {
        EVENT_FRAME_DRAWING_TRIGGERED: () => {
            S.FRAME_DRAWING.ADD(S.FRAME_DRAWING.TRIGGERED)
        },
        EVENT_FRAME_DRAWING_SATRTED: () => {
            S.FRAME_DRAWING.ADD(S.FRAME_DRAWING.STARTED)
        },
        EVENT_FRAME_DRAWING_MOVING: () => {
            S.FRAME_DRAWING.ADD(S.FRAME_DRAWING.MOVING)
        },
        EVENT_FRAME_DRAWING_STOPPED: () => {
            S.FRAME_DRAWING.CLEAR()
        },
        EVENT_FRAME_SHOW: () => {
            S.TEMPFRAME.SetBasicState()
        },
        EVENT_FRAME_HIDE: () => {
            S.TEMPFRAME.CLEAR()
        },

        EVENT_FRAME_MOVE_BEGIN: () => {
            S.TEMPFRAME.ADD(S.TEMPFRAME.MOVE_BEGIN)
        },
        EVENT_FRAME_MOVING: () => {
            S.TEMPFRAME.ADD(S.TEMPFRAME.MOVE_DOING)
        },
        EVENT_FRAME_MOVE_END: () => {
            S.TEMPFRAME.RemoveGroup("MOVE")
        },

        EVENT_FRAME_RESIZE_TRIGGERED: () => {
            S.TEMPFRAME.ADD(S.TEMPFRAME.RESIZE_TRIGGERED)
        },
        EVENT_FRAME_RESIZE_BEGIN: () => {
            S.TEMPFRAME.ADD(S.TEMPFRAME.RESIZE_BEGIN)
        },
        EVENT_FRAME_RESIZING: () => {
            S.TEMPFRAME.ADD(S.TEMPFRAME.RESIZE_DOING)
        },
        EVENT_FRAME_RESIZE_END: () => {
            S.TEMPFRAME.RemoveGroup("RESIZE")
        },

        EVENT_FRAME_AT_BUTTON: () => {
            S.TEMPFRAME.ADD(S.TEMPFRAME.AT_BUTTON)
        },
        EVENT_FRAME_OUT_BUTTON: () => {
            S.TEMPFRAME.DEL(S.TEMPFRAME.AT_BUTTON)
        },

        EVENT_MOUSE_LBTN_PRESSED: () => {
            S.MOUSE.ADD(S.MOUSE.LBTN_HOLDING)
        },
        EVENT_MOUSE_LBTN_RELEASED: () => {
            S.MOUSE.DEL(S.MOUSE.LBTN_HOLDING)
        },
        EVENT_FRAME_TOGGLE_FOLDBODY: () => {
            S.TEMPFRAME.SWITCH(S.TEMPFRAME.BTN_FOLDBODY)
        },
        EVENT_FRAME_TOGGLE_MINIMIZE: () => {
            S.TEMPFRAME.SWITCH(S.TEMPFRAME.BTN_MINIMIZE)
        },
        EVENT_FRAME_TOGGLE_TOOLS: () => {
            S.TEMPFRAME.SWITCH(S.TEMPFRAME.BTN_TOOLS)
        },
        EVENT_FRAME_TOGGLE_PINE: () => {
            S.TEMPFRAME.SWITCH(S.TEMPFRAME.BTN_PINE)
        },
    }
    root.registEvents = {
        EVENT_FRAME_DRAWING_TRIGGERED: root.EnableHostPointerEvent,
        EVENT_FRAME_DRAWING_STOPPED: root.DisableHostPointerEvent,
        EVENT_FRAME_RESIZE_TRIGGERED: root.EnableRootContainerFullScreen,
        EVENT_FRAME_MOVE_BEGIN: root.EnableRootContainerFullScreen,
        EVENT_FRAME_MOVE_END: root.DisableRootContainerFullScreen,
        EVENT_FRAME_RESIZE_END: root.DisableRootContainerFullScreen,
    }
    mask.registEvents = {
        EVENT_NO_MASK: mask.HideMask,
        EVENT_NEED_MASK: mask.ShowMask
    }
    draw.registEvents = {
        EVENT_FRAME_DRAWING_TRIGGERED: draw.OnDrawingFrameTriggered,
        EVENT_FRAME_DRAWING_SATRTED: draw.OnDrawingFrameStarted,
        EVENT_FRAME_DRAWING_MOVING: draw.OnDrawingFrameMoving,
        EVENT_FRAME_DRAWING_STOPPED: draw.OnDrawingFrameStopped,
        EVENT_FRAME_DRAWING_FAIELD: draw.OnDrawingFrameFailed,
    }
    tempframe.registEvents = {
        EVENT_FRAME_DRAWING_SUCCESS: tempframe.OnDrawingSuccess,
        EVENT_FRAME_HIDE: tempframe.OnHide,

        EVENT_FRAME_MOVE_BEGIN: tempframe.OnMoveBegin,
        EVENT_FRAME_MOVING: tempframe.OnMove,
        EVENT_FRAME_MOVE_END: tempframe.OnMoveEnd,

        EVENT_FRAME_MOUSE_HOVER: tempframe.OnMouseHover,
        EVENT_FRAME_RESIZING: tempframe.OnResizing,
        EVENT_FRAME_RESIZE_END: tempframe.OnResizeEnd,

        EVENT_FRAME_SAVE_AS: tempframe.OnSave,
        EVENT_FRAME_TOGGLE_FOLDBODY: tempframe.OnFoldBody,
        EVENT_FRAME_TOGGLE_MINIMIZE: tempframe.OnMinimize,
        EVENT_FRAME_TOGGLE_TOOLS: tempframe.OnOpenToolBox,
        EVENT_FRAME_TOGGLE_PINE: tempframe.OnPine,
    }
}

export const InstallCoreEventEmitter = (E: IService[]) => {

    E.map((e) => {
        InstallEvent(e.registEvents)
    })
}