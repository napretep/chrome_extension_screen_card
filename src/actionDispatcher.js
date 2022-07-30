"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InstallAction = exports.ActionSet = void 0;
/**
 * 这个文件用来处理用户行为事件的分发
 * */
var E = require("./utils/events");
var events_1 = require("./utils/events");
var funcTools_1 = require("./utils/funcTools");
var state_1 = require("./state");
var core_1 = require("./core");
var frameDrawing = {
    triggered: function (e) {
        if (e.ctrlKey && e.altKey && (e.key === "e" || e.key === "E")) {
            if (state_1.STATE.FRAME_DRAWING.NO(state_1.STATE.FRAME_DRAWING.TRIGGERED))
                (0, funcTools_1.Dispatch)(events_1.EVENT_FRAME_DRAWING_TRIGGERED);
        }
    },
    stop_failed: function (e) {
        if (e.code === "Escape") {
            if (state_1.STATE.FRAME_DRAWING.HAS(state_1.STATE.FRAME_DRAWING.TRIGGERED)) {
                (0, funcTools_1.Dispatch)(events_1.EVENT_FRAME_DRAWING_STOPPED);
                (0, funcTools_1.Dispatch)(events_1.EVENT_FRAME_DRAWING_FAIELD);
            }
        }
    },
    start: function (e) {
        if (e.button == 0 && state_1.STATE.FRAME_DRAWING.HAS(state_1.STATE.FRAME_DRAWING.TRIGGERED)) {
            (0, funcTools_1.Dispatch)(events_1.EVENT_FRAME_DRAWING_SATRTED, e);
        }
    },
    moving: function (e) {
        if (state_1.STATE.MOUSE.LBTN_HOLDING && state_1.STATE.FRAME_DRAWING.HAS(state_1.STATE.FRAME_DRAWING.STARTED)) {
            (0, funcTools_1.Dispatch)(events_1.EVENT_FRAME_DRAWING_MOVING, e);
        }
    },
    stop: function (e) {
        if (state_1.STATE.FRAME_DRAWING.HAS(state_1.STATE.FRAME_DRAWING.STARTED)) {
            (0, funcTools_1.Dispatch)(events_1.EVENT_FRAME_DRAWING_STOPPED, e);
        }
    }
};
var tempframe = {
    move: {
        begin: function (e) {
            var ST = state_1.STATE.TEMPFRAME;
            if (funcTools_1.TargetIs.tempFrameHeaderMoveBar(e.target)
                && ST.NOGROUP(ST.Groups.MOVE)) {
                (0, funcTools_1.Dispatch)(events_1.EVENT_FRAME_MOVE_BEGIN, e);
            }
        },
        ing: function (e) {
            var ST = state_1.STATE.TEMPFRAME;
            if (state_1.STATE.MOUSE.HAS(state_1.STATE.MOUSE.LBTN_HOLDING)
                && ST.ONLYGROUP(ST.Groups.MOVE)) {
                (0, funcTools_1.Dispatch)(events_1.EVENT_FRAME_MOVING, e);
            }
        },
        end: function (e) {
            var ST = state_1.STATE.TEMPFRAME;
            if (ST.ONLYGROUP(ST.Groups.MOVE)) {
                (0, funcTools_1.Dispatch)(events_1.EVENT_FRAME_MOVE_END);
            }
        },
    },
    resize: {
        trigger: function (e) {
            var ST = state_1.STATE.TEMPFRAME;
            if (!ST.HASGROUP(ST.Groups.MOVE) && !ST.SOME(ST.RESIZE_BEGIN, ST.RESIZE_DOING)) {
                (0, funcTools_1.Dispatch)(events_1.EVENT_FRAME_MOUSE_HOVER, e);
            }
        },
        begin: function (e) {
            var ST = state_1.STATE.TEMPFRAME;
            if (ST.ONLYGROUP(ST.Groups.RESIZE)
                && ST.ALL(ST.RESIZE_TRIGGERED)) {
                (0, funcTools_1.Dispatch)(events_1.EVENT_FRAME_RESIZE_BEGIN, e);
            }
        },
        ing: function (e) {
            var ST = state_1.STATE.TEMPFRAME;
            if (ST.ONLYGROUP(ST.Groups.RESIZE) && ST.ALL(ST.RESIZE_BEGIN)) {
                (0, funcTools_1.Dispatch)(events_1.EVENT_FRAME_RESIZING, e);
            }
        },
        end: function (e) {
            var ST = state_1.STATE.TEMPFRAME;
            if (ST.ONLYGROUP(ST.Groups.RESIZE))
                (0, funcTools_1.Dispatch)(events_1.EVENT_FRAME_RESIZE_END);
        }
    },
    click: {
        buttonGroup: function (e) {
            if (!e.target) {
                return;
            }
            if (funcTools_1.TargetIs.tempframeHeaderButtons(e.target) && state_1.STATE.TEMPFRAME.NO()) {
                if ((0, funcTools_1.HasClass)(e.target, "icon-close")) {
                    (0, funcTools_1.Dispatch)(E.EVENT_FRAME_HIDE);
                }
                else if ((0, funcTools_1.HasClass)(e.target, "icon-foldbody")) {
                    (0, funcTools_1.Dispatch)(E.EVENT_FRAME_TOGGLE_FOLDBODY);
                }
                else if ((0, funcTools_1.HasClass)(e.target, "icon-minimize")) {
                    (0, funcTools_1.Dispatch)(E.EVENT_FRAME_TOGGLE_MINIMIZE);
                }
                else if ((0, funcTools_1.HasClass)(e.target, "icon-toolbox")) {
                    (0, funcTools_1.Dispatch)(E.EVENT_FRAME_TOGGLE_TOOLS);
                }
                else if ((0, funcTools_1.HasClass)(e.target, "icon-fixed")) {
                    (0, funcTools_1.Dispatch)(E.EVENT_FRAME_TOGGLE_PINE);
                }
                else if ((0, funcTools_1.HasClass)(e.target, "icon-save")) {
                    (0, funcTools_1.Dispatch)(E.EVENT_FRAME_SAVE_AS);
                }
            }
        }
    },
    dbclick: {
        setTitle: function (e) {
            if (funcTools_1.TargetIs.tempframeHeaderTitle(e.target)) {
                console.log("title");
            }
            else if (funcTools_1.TargetIs.tempFrameHeaderMoveBar(e.target)) {
            }
        }
    }
};
exports.ActionSet = {
    AtBody: {
        keydown: function (e) {
            frameDrawing.triggered(e);
            frameDrawing.stop_failed(e);
        },
        mousedown: function (e) {
            var ST = state_1.STATE.TEMPFRAME;
            if (e.button == 0)
                (0, funcTools_1.Dispatch)(events_1.EVENT_MOUSE_LBTN_PRESSED);
            frameDrawing.start(e);
            if (ST.HAS(ST.SHOW)) {
                tempframe.resize.begin(e);
            }
        },
        mousemove: function (e) {
            frameDrawing.moving(e);
            var ST = state_1.STATE.TEMPFRAME;
            if (ST.HAS(ST.SHOW)) {
                tempframe.move.ing(e);
                tempframe.resize.trigger(e);
                tempframe.resize.ing(e);
            }
        },
        mouseup: function (e) {
            (0, funcTools_1.Dispatch)(events_1.EVENT_MOUSE_LBTN_RELEASED);
            frameDrawing.stop(e);
            var ST = state_1.STATE.TEMPFRAME;
            if (ST.HAS(ST.SHOW)) {
                tempframe.resize.end(e);
                tempframe.move.end(e);
            }
        },
    },
    AtShadowRoot: {
        click: function (e) {
            tempframe.click.buttonGroup(e);
        },
        mousedown: function (e) {
            if (e.button == 0)
                (0, funcTools_1.Dispatch)(events_1.EVENT_MOUSE_LBTN_PRESSED);
            tempframe.move.begin(e);
        },
        dblclick: function (e) {
            tempframe.dbclick.setTitle(e);
        }
    }
};
var InstallAction = function (act) {
    var place = {
        AtBody: window,
        AtShadowRoot: core_1.CORE.ShadowRoot
    };
    Object.keys(act).forEach(function (at) {
        (0, funcTools_1.InstallEvent)(act[at], place[at]);
    });
};
exports.InstallAction = InstallAction;
//# sourceMappingURL=actionDispatcher.js.map