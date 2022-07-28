"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UninstallDispatch_TempFrameDrawing = exports.InstallDispatch_AtShadowRoot = exports.InstallDispatch_AtBody = exports.ServiceMain = void 0;
var E = require("./utils/events");
var events_1 = require("./utils/events");
var funcTools_1 = require("./utils/funcTools");
var state_1 = require("./state");
var core_1 = require("./core");
var constants_1 = require("./utils/constants");
// let S = CORE.STATE
function ActionEmitter_AtBody_keydown(e) {
    if (e.ctrlKey && e.altKey && (e.key === "e" || e.key === "E")) {
        if (!core_1.CORE.STATE.FRAME_DRAWING_TRIGGERED)
            (0, funcTools_1.Dispatch)(events_1.EVENT_FRAME_DRAWING_TRIGGERED);
    }
    if (e.code === "Escape") {
        if (core_1.CORE.STATE.FRAME_DRAWING_TRIGGERED) {
            (0, funcTools_1.Dispatch)(events_1.EVENT_FRAME_DRAWING_STOPPED);
            (0, funcTools_1.Dispatch)(events_1.EVENT_FRAME_DRAWING_FAIELD);
        }
    }
}
function ActionEmitter_AtBody_mousedown(e) {
    var ST = state_1.STATE.TEMPFRAME;
    if (e.button == 0) {
        if (state_1.STATE.FRAME_DRAWING.HAS(state_1.STATE.FRAME_DRAWING.TRIGGERD)) {
            (0, funcTools_1.Dispatch)(events_1.EVENT_FRAME_DRAWING_SATRTED, e);
        }
        else if (ST.ALL(ST.RESIZE_TRIGGERED) && ST.NO(ST.RESIZE_DOING, ST.RESIZE_BEGIN, ST.AT_BUTTON)) {
            (0, funcTools_1.Dispatch)(events_1.EVENT_FRAME_RESIZE_BEGIN, e); //发送后, 会有DOING状态, 只会触发一次, 因为DOING状态会持续存在
        }
    }
}
function ActionEmitter_AtBody_mousemove(e) {
    var ST = state_1.STATE.TEMPFRAME;
    if (e.button == 0) {
        if (state_1.STATE.FRAME_DRAWING.HAS(state_1.STATE.FRAME_DRAWING.STARTED)) {
            (0, funcTools_1.Dispatch)(events_1.EVENT_FRAME_DRAWING_MOVING, e);
        }
        else if (ST.HAS(ST.SHOW) && ST.NO(ST.AT_BUTTON)) {
            if (ST.HAS(ST.MOVING))
                (0, funcTools_1.Dispatch)(E.EVENT_FRAME_MOVING, e);
            else if (ST.NO(ST.RESIZE_BEGIN)) {
                (0, funcTools_1.Dispatch)(E.EVENT_FRAME_MOUSE_HOVER, e); //如果检测通过,会发射EVENT_FRAME_RESIZE_TRIGGERED
            }
            else if (ST.HAS(ST.RESIZE_BEGIN)) {
                (0, funcTools_1.Dispatch)(events_1.EVENT_FRAME_RESIZING, e);
            }
        }
    }
}
function ActionEmitter_AtBody_mouseup(e) {
    if (state_1.STATE.FRAME_DRAWING.HAS(state_1.STATE.FRAME_DRAWING.STARTED)) {
        (0, funcTools_1.Dispatch)(events_1.EVENT_FRAME_DRAWING_STOPPED, e);
    }
    else if (state_1.STATE.TEMPFRAME.ALL(state_1.STATE.TEMPFRAME.SHOW, state_1.STATE.TEMPFRAME.MOVING)) {
        (0, funcTools_1.Dispatch)(E.EVENT_FRAME_MOVE_END);
    }
    else if (state_1.STATE.TEMPFRAME.ALL(state_1.STATE.TEMPFRAME.SHOW, state_1.STATE.TEMPFRAME.RESIZE_DOING)) {
        (0, funcTools_1.Dispatch)(events_1.EVENT_FRAME_RESIZE_END);
    }
}
function ActionEmitter_AtShadowRoot_mousedown(e) {
    if (e.button == 0) {
        if (state_1.STATE.TEMPFRAME.HAS(state_1.STATE.TEMPFRAME.SHOW)) {
            //开始移动 TEMPFRAME
            if (e.target.classList.contains(constants_1.CSSClass.tempFrameHeaderMoveBar)) {
                (0, funcTools_1.Dispatch)(E.EVENT_FRAME_MOVE_BEGIN, e);
            }
            else if (funcTools_1.TargetIs.tempframeHeaderButtons(e.target) && e.target.className.indexOf("close") >= 0) {
                (0, funcTools_1.Dispatch)(E.EVENT_FRAME_HIDE);
            }
        }
    }
}
function ActionEmitter_AtShadowRoot_mousemove(e) {
    if (funcTools_1.TargetIs.tempframeHeaderButtons(e.target) || funcTools_1.TargetIs.tempframeFooterButtons(e.target)) {
        (0, funcTools_1.Dispatch)(E.EVENT_FRAME_AT_BUTTON);
    }
    else {
        (0, funcTools_1.Dispatch)(E.EVENT_FRAME_OUT_BUTTON);
    }
}
function ActionEmitter_AtShadowRoot_mouseup(e) {
}
var ActionSet_AtBody = {
    keydown: ActionEmitter_AtBody_keydown,
    mousedown: ActionEmitter_AtBody_mousedown,
    mousemove: ActionEmitter_AtBody_mousemove,
    mouseup: ActionEmitter_AtBody_mouseup,
};
var ActionSet_AtShadowRoot = {
    mousedown: ActionEmitter_AtShadowRoot_mousedown,
    mousemove: ActionEmitter_AtShadowRoot_mousemove,
    mouseup: ActionEmitter_AtShadowRoot_mouseup,
};
function ServiceMain() { }
exports.ServiceMain = ServiceMain;
function InstallDispatch_AtBody() {
    (0, funcTools_1.InstallEvent)(ActionSet_AtBody);
}
exports.InstallDispatch_AtBody = InstallDispatch_AtBody;
function InstallDispatch_AtShadowRoot() {
    (0, funcTools_1.InstallEvent)(ActionSet_AtShadowRoot, core_1.CORE.ShadowRoot);
}
exports.InstallDispatch_AtShadowRoot = InstallDispatch_AtShadowRoot;
function UninstallDispatch_TempFrameDrawing() {
    (0, funcTools_1.UninstallEvent)(ActionSet_AtBody);
}
exports.UninstallDispatch_TempFrameDrawing = UninstallDispatch_TempFrameDrawing;
//# sourceMappingURL=actionDispatcher.js.map