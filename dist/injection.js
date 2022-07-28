/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/actionDispatcher.js":
/*!*********************************!*\
  !*** ./src/actionDispatcher.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UninstallDispatch_TempFrameDrawing = exports.InstallDispatch_AtShadowRoot = exports.InstallDispatch_AtBody = exports.ServiceMain = void 0;
var E = __webpack_require__(/*! ./utils/events */ "./src/utils/events.js");
var events_1 = __webpack_require__(/*! ./utils/events */ "./src/utils/events.js");
var funcTools_1 = __webpack_require__(/*! ./utils/funcTools */ "./src/utils/funcTools.js");
var state_1 = __webpack_require__(/*! ./state */ "./src/state.js");
var core_1 = __webpack_require__(/*! ./core */ "./src/core.js");
var constants_1 = __webpack_require__(/*! ./utils/constants */ "./src/utils/constants.js");
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
    // if (TargetIs.tempframeHeaderButtons(e.target) || TargetIs.tempframeFooterButtons(e.target)){
    //     Dispatch(E.EVENT_FRAME_AT_BUTTON)
    // }
    // else{
    //     Dispatch(E.EVENT_FRAME_OUT_BUTTON)
    //
    // }
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

/***/ }),

/***/ "./src/components.js":
/*!***************************!*\
  !*** ./src/components.js ***!
  \***************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TempFrameComponent = void 0;
var classes_1 = __webpack_require__(/*! ./utils/classes */ "./src/utils/classes.js");
var constants_1 = __webpack_require__(/*! ./utils/constants */ "./src/utils/constants.js");
var funcTools_1 = __webpack_require__(/*! ./utils/funcTools */ "./src/utils/funcTools.js");
var Component = /** @class */ (function () {
    function Component() {
        this.component = document.createElement("div");
    }
    return Component;
}());
var TempFrameComponent = /** @class */ (function (_super) {
    __extends(TempFrameComponent, _super);
    function TempFrameComponent() {
        var _this = _super.call(this) || this;
        _this._container = new classes_1.TempFrameContainer();
        _this.UpdateGeometry = function (el) {
            // let r = this.WrapFrameRect(el)
            var r2 = {};
            for (var key in el) {
                if (el[key])
                    r2[key] = "".concat(el[key], "px");
            }
            (0, funcTools_1.setElStyle)(_this.component, r2);
        };
        _this.component.appendChild(_this.container);
        _this.component.classList.add(constants_1.CSSClass.TempFrameComponent, constants_1.CSSClass.transitionAll);
        return _this;
    }
    Object.defineProperty(TempFrameComponent.prototype, "container", {
        get: function () {
            return this._container.element;
        },
        enumerable: false,
        configurable: true
    });
    TempFrameComponent.prototype.WrapFrameRect = function (elRect) {
        var headerHeight = this._container.headerHeight > 0 ? this._container.headerHeight : constants_1.TempFrameHeaderHeight;
        var footerHeight = this._container.footerHeight > 0 ? this._container.footerHeight : constants_1.TempFrameFooterHeight;
        var rect = {
            left: window.scrollX + elRect.left,
            top: window.scrollY + elRect.top - headerHeight,
            width: elRect.width,
            height: elRect.height + headerHeight + footerHeight
        };
        return rect;
    };
    TempFrameComponent.prototype.AtEdge = function (p, edgeSense) {
        if (edgeSense === void 0) { edgeSense = 5; }
        var c1 = [p.x, p.x, p.y, p.y];
        var rect = this.component.getBoundingClientRect();
        var r1 = [rect.left, rect.right, rect.top, rect.bottom];
        var dirChar = ["L", "R", "T", "B"];
        var events = [0, 1, 2, 3].map(function (idx) {
            var _a = [(Math.floor(idx / 2) + 1) * 2 % 4, (Math.floor(idx / 2) + 1) * 2 % 4 + 1], idx2 = _a[0], idx3 = _a[1];
            return [Math.abs(c1[idx] - r1[idx]) <= edgeSense
                    && r1[idx2] - edgeSense <= c1[idx2] && c1[idx2] <= r1[idx3] + edgeSense,
                dirChar[idx]];
        });
        return events.filter(function (value, index) {
            return value[0];
        }).reduce(function (sum, next) { return sum + next[1]; }, "");
    };
    return TempFrameComponent;
}(Component));
exports.TempFrameComponent = TempFrameComponent;
//# sourceMappingURL=components.js.map

/***/ }),

/***/ "./src/core.js":
/*!*********************!*\
  !*** ./src/core.js ***!
  \*********************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CORE = exports._CORE = void 0;
var classes_1 = __webpack_require__(/*! ./utils/classes */ "./src/utils/classes.js");
var services_1 = __webpack_require__(/*! ./services */ "./src/services.js");
var state_1 = __webpack_require__(/*! ./state */ "./src/state.js");
var actionDispatcher_1 = __webpack_require__(/*! ./actionDispatcher */ "./src/actionDispatcher.js");
var styles_sheet_1 = __webpack_require__(/*! ./utils/styles_sheet */ "./src/utils/styles_sheet.js");
var connector_1 = __webpack_require__(/*! ./utils/connector */ "./src/utils/connector.js");
var constants_1 = __webpack_require__(/*! ./utils/constants */ "./src/utils/constants.js");
/**
 * core把所有东西集中在一起
 * events.ts文件产生事件名称,
 * state.ts 文件产生状态名称,
 * actionDispatcher 分发行为事件, 是一切行为的入口,
 * XXXservice管理对应的事件响应, 需要在core中用InstallEvents完成service的事件注册.
 * XXXservice的事件集中写在connector里面, 方便管理
 * XXXcomponent是service对应操作的div集体. 只写一些简单的函数, 不写状态判断之类或事件
 * 以后应该会尝试合并事件与状态, 做到某些事件发射就自动响应一些状态.
 * */
var _CORE = /** @class */ (function (_super) {
    __extends(_CORE, _super);
    function _CORE() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.StateService = new services_1.StateService();
        _this.STATE = state_1.STATE;
        _this.ShadowRootService = new services_1.ShadowRootService();
        _this.ShadowRoot = _this.ShadowRootService.root;
        _this.TempFrameDrawingService = new services_1.TempFrameDrawingService();
        _this.TempFrameService = new services_1.TempFrameService();
        _this.TempFrameComponent = null;
        _this.CardFrameService = new services_1.CardFrameService();
        _this.CurrentCardFrame = null;
        _this.MaskService = new services_1.MaskService();
        _this.ServiceList = [_this.MaskService, _this.StateService,
            _this.TempFrameDrawingService,
            _this.TempFrameService,
            _this.ShadowRootService];
        _this.InstallDisptach = function () {
            (0, actionDispatcher_1.InstallDispatch_AtBody)();
            (0, actionDispatcher_1.InstallDispatch_AtShadowRoot)();
        };
        _this.InstallStyles = function () {
            var styleString = "";
            for (var classkey in styles_sheet_1.styles_sheet.default) {
                styleString += "\n.".concat(classkey, "{").concat(styles_sheet_1.styles_sheet.default[classkey], "}");
            }
            for (var otherKey in styles_sheet_1.styles_sheet.other) {
                styleString += "\n".concat(otherKey, "{").concat(styles_sheet_1.styles_sheet.other[otherKey], "}");
            }
            for (var buttonKey in styles_sheet_1.styles_sheet.buttonIcons) {
                styleString += "\n.icon-".concat(buttonKey, "{").concat(styles_sheet_1.styles_sheet.buttonIcons[buttonKey], "}");
            }
            var styleEl = document.createElement("style");
            styleEl.innerHTML = styleString;
            _this.ShadowRoot.appendChild(styleEl);
            var styleEl2 = document.createElement("style");
            styleEl2.innerHTML = ".".concat(constants_1.CSSClass.ShadowRootHost, "\n        {").concat(styles_sheet_1.styles_sheet.default[constants_1.CSSClass.ShadowRootHost], "}");
            document.head.appendChild(styleEl2);
        };
        _this.InstallEvents = function () {
            (0, connector_1.SetupCoreEventEmitter)();
            (0, connector_1.InstallCoreEventEmitter)(_this.ServiceList);
        };
        return _this;
    }
    return _CORE;
}((0, classes_1.Singleton)()));
exports._CORE = _CORE;
exports.CORE = _CORE.Instance;
//# sourceMappingURL=core.js.map

/***/ }),

/***/ "./src/services.js":
/*!*************************!*\
  !*** ./src/services.js ***!
  \*************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.StateService = exports.ShadowRootService = exports.CardLibService = exports.CardFrameService = exports.TempFrameService = exports.InfomationService = exports.TempFrameDrawingService = exports.MaskService = void 0;
var funcTools_1 = __webpack_require__(/*! ./utils/funcTools */ "./src/utils/funcTools.js");
var constants_1 = __webpack_require__(/*! ./utils/constants */ "./src/utils/constants.js");
var core_1 = __webpack_require__(/*! ./core */ "./src/core.js");
var state_1 = __webpack_require__(/*! ./state */ "./src/state.js");
var E = __webpack_require__(/*! ./utils/events */ "./src/utils/events.js");
var components_1 = __webpack_require__(/*! ./components */ "./src/components.js");
var events_1 = __webpack_require__(/*! ./utils/events */ "./src/utils/events.js");
var BaseTempFrame = /** @class */ (function () {
    function BaseTempFrame() {
        this.zindex = 99999;
    }
    return BaseTempFrame;
}());
var MaskService = /** @class */ (function () {
    function MaskService() {
        var _this = this;
        this.blockActionMask = document.createElement("div");
        this.registEvents = {};
        this.UpdateMaskGeometry = function () {
            _this.blockActionMask.style.height = "".concat(document.scrollingElement.scrollHeight, "px");
        };
        this.InitMask = function () {
            _this.blockActionMask.style.cssText = "";
            _this.UpdateMaskGeometry();
        };
        this.HideMask = function (e) {
            if (core_1.CORE.ShadowRoot.contains(_this.blockActionMask)) {
                core_1.CORE.ShadowRoot.removeChild(_this.blockActionMask);
            }
        };
        this.ShowMask = function (e) {
            var styles = e.detail;
            _this.InitMask();
            if (!core_1.CORE.ShadowRoot.contains(_this.blockActionMask)) {
                for (var name_1 in styles) {
                    _this.blockActionMask.style[name_1] = styles[name_1];
                }
                core_1.CORE.ShadowRoot.appendChild(_this.blockActionMask);
            }
        };
        this.stop = function () {
            (0, funcTools_1.UninstallEvent)(_this.registEvents);
            core_1.CORE.MaskService = null;
        };
        this.blockActionMask.classList.add(constants_1.CSSClass.blockActionMask);
        this.InitMask();
    }
    return MaskService;
}());
exports.MaskService = MaskService;
var TempFrameDrawingService = /** @class */ (function (_super) {
    __extends(TempFrameDrawingService, _super);
    function TempFrameDrawingService() {
        var _this = _super.call(this) || this;
        _this.selectionFrame = document.createElement("div");
        _this.divForBlockMouse = document.createElement("div");
        _this.mousedownPosition = [0, 0]; //clientX,clientY
        _this.registEvents = {};
        _this.OnDrawingFrameFailed = function () {
            _this.HideElement();
            (0, funcTools_1.Dispatch)(E.EVENT_NO_MASK);
        };
        _this.OnDrawingFrameTriggered = function () {
            (0, funcTools_1.Dispatch)(E.EVENT_NEED_MASK, { zindex: _this.zindex - 3, cursor: "crosshair" });
            (0, funcTools_1.Dispatch)(E.EVENT_INFOMATION, { text: "开始截屏" });
            (0, funcTools_1.Dispatch)(E.EVENT_FRAME_HIDE);
            _this.HideElement();
        };
        _this.OnDrawingFrameStarted = function (e) {
            if (state_1.STATE.FRAME_DRAWING.HAS(state_1.STATE.FRAME_DRAWING.TRIGGERD)) {
                _this.ShowElement();
                _this.mousedownPosition = [e.detail.clientX, e.detail.clientY];
                _this.UpdateBlockMouseDivPosition(e.detail);
                _this.UpdateSelectionDivSize(e.detail);
            }
        };
        _this.OnDrawingFrameMoving = function (e) {
            if (state_1.STATE.FRAME_DRAWING.HAS(state_1.STATE.FRAME_DRAWING.STARTED)) {
                _this.UpdateBlockMouseDivPosition(e.detail);
                _this.UpdateSelectionDivSize(e.detail);
            }
        };
        _this.OnDrawingFrameStopped = function (e) {
            var er = _this.selectionFrame.getBoundingClientRect();
            (0, funcTools_1.Dispatch)(E.EVENT_FRAME_DRAWING_SUCCESS, { width: er.width, height: er.height, top: er.top, left: er.left });
            (0, funcTools_1.Dispatch)(E.EVENT_NO_MASK);
            _this.HideElement();
        };
        _this.HideElement = function () {
            (0, funcTools_1.HideElementInShadowRoot)(_this.selectionFrame);
            (0, funcTools_1.HideElementInShadowRoot)(_this.divForBlockMouse);
        };
        _this.ShowElement = function () {
            (0, funcTools_1.ShowElementInShadowRoot)(_this.selectionFrame);
            (0, funcTools_1.ShowElementInShadowRoot)(_this.divForBlockMouse);
        };
        _this.UpdateBlockMouseDivPosition = function (e) {
            var _a = [window.scrollX, window.scrollY], sX = _a[0], sY = _a[1];
            _this.divForBlockMouse.style.left = (e.clientX - 10 + sX).toString() + "px";
            _this.divForBlockMouse.style.top = (e.clientY - 10 + sY).toString() + "px";
        };
        _this.UpdateSelectionDivSize = function (e) {
            console.assert(e.constructor == MouseEvent, "UpdateSelectionDivSize=(e:MouseEvent)=> 收到一个错误参数");
            var _a = _this.mousedownPosition, x1 = _a[0], y1 = _a[1];
            var _b = [e.clientX, e.clientY], x2 = _b[0], y2 = _b[1];
            var _c = [window.scrollX, window.scrollY], sX = _c[0], sY = _c[1];
            var style = _this.selectionFrame.style;
            style.left = "".concat((Math.min(x1, x2) + sX), "px");
            style.top = "".concat((Math.min(y1, y2) + sY), "px");
            style.width = "".concat(Math.abs(x2 - x1), "px");
            style.height = "".concat(Math.abs(y2 - y1), "px");
            // console.log(x1,x2,sX)
        };
        _this.stop = function () {
            (0, funcTools_1.UninstallEvent)(_this.registEvents);
            core_1.CORE.TempFrameDrawingService = null;
        };
        _this.divForBlockMouse.classList.add(constants_1.CSSClass.divForBlockMouse);
        _this.selectionFrame.classList.add(constants_1.CSSClass.selectionFrameDiv);
        console.log("TempFrameDrawingService 初始化完成");
        return _this;
    }
    return TempFrameDrawingService;
}(BaseTempFrame));
exports.TempFrameDrawingService = TempFrameDrawingService;
var InfomationService = /** @class */ (function () {
    function InfomationService() {
    }
    return InfomationService;
}());
exports.InfomationService = InfomationService;
var TempFrameService = /** @class */ (function () {
    function TempFrameService() {
        var _this = this;
        this.cursorAt = {
            LT: "nw-resize",
            LB: "sw-resize",
            RT: "ne-resize",
            RB: "se-resize",
            L: "w-resize",
            R: 'e-resize',
            T: "n-resize",
            B: "s-resize"
        };
        this.resizeBegin = {
            cursor: { x: null, y: null },
            div: { left: null, top: null, width: null, height: null },
            direction: null
        };
        this.registEvents = {};
        this.state = {
            moving: {
                startmove: { x: null, y: null, left: null, top: null }
            }
        };
        this._TempFrame = null;
        this.OnDrawingSuccess = function (e) {
            console.log(e.detail);
            _this._TempFrame = new components_1.TempFrameComponent();
            _this._TempFrame.UpdateGeometry(_this._TempFrame.WrapFrameRect(e.detail));
            _this.ShowElement();
            (0, funcTools_1.Dispatch)(E.EVENT_FRAME_SHOW);
        };
        this.OnMoveBegin = function (e) {
            if (state_1.STATE.TEMPFRAME.HAS(state_1.STATE.TEMPFRAME.MOVING)) {
                _this.TempFrame.classList.remove(constants_1.CSSClass.transitionAll);
                _this.state.moving.startmove = {
                    x: e.detail.clientX, y: e.detail.clientY,
                    left: _this.TempFrame.getBoundingClientRect().left,
                    top: _this.TempFrame.getBoundingClientRect().top
                };
            }
        };
        this.OnMove = function (e) {
            if (state_1.STATE.TEMPFRAME.HAS(state_1.STATE.TEMPFRAME.MOVING)) {
                var start = _this.state.moving.startmove;
                var rect = {
                    left: e.detail.clientX - (start.x - start.left) + window.scrollX,
                    top: e.detail.clientY - (start.y - start.top) + window.scrollY,
                    width: null,
                    height: null
                };
                _this._TempFrame.UpdateGeometry(rect);
            }
        };
        this.OnMoveEnd = function () {
            _this.TempFrame.classList.add(constants_1.CSSClass.transitionAll);
        };
        this.OnMouseHover = function (e) {
            var ST = state_1.STATE.TEMPFRAME;
            if (ST.ALL(ST.SHOW) && !ST.SOME(ST.RESIZE_DOING, ST.RESIZE_BEGIN)) {
                var edge = _this._TempFrame.AtEdge({ x: e.detail.clientX, y: e.detail.clientY });
                if (edge) {
                    document.body.style.cursor = _this.cursorAt[edge];
                    _this.TempFrame.style.cursor = _this.cursorAt[edge];
                    _this.resizeBegin = {
                        cursor: { x: e.detail.clientX, y: e.detail.clientY },
                        div: { left: _this.TempFrame.getBoundingClientRect().left,
                            top: _this.TempFrame.getBoundingClientRect().top,
                            width: _this.TempFrame.getBoundingClientRect().width,
                            height: _this.TempFrame.getBoundingClientRect().height,
                        },
                        direction: edge
                    };
                    (0, funcTools_1.Dispatch)(events_1.EVENT_FRAME_RESIZE_TRIGGERED);
                }
                else {
                    (0, funcTools_1.Dispatch)(events_1.EVENT_FRAME_RESIZE_END);
                    _this.TempFrame.style.cursor = "";
                    document.body.style.cursor = "";
                }
            }
        };
        this.OnClosed = function () {
        };
        this.OnResizing = function (e) {
            var ST = state_1.STATE.TEMPFRAME;
            if (ST.ALL(ST.RESIZE_TRIGGERED, ST.RESIZE_DOING)) {
                var _a = [window.scrollX, window.scrollY, e.detail.clientX, e.detail.clientY], sx = _a[0], sy = _a[1], ex = _a[2], ey = _a[3];
                var _b = [_this.resizeBegin.cursor, _this.resizeBegin.div, _this.resizeBegin.direction], p = _b[0], r = _b[1], d = _b[2];
                var rect = { left: null, top: null, width: null, height: null };
                rect.height = d.indexOf("B") >= 0 ? (r.height + (ey - p.y)) : r.height;
                rect.width = d.indexOf("R") >= 0 ? (r.width + (ex - p.x)) : r.width;
                rect.height = d.indexOf("T") >= 0 ? (r.height - (ey - p.y)) : rect.height;
                rect.top = d.indexOf("T") >= 0 ? (sy + (ey - p.y) + r.top) : r.top;
                rect.width = d.indexOf("L") >= 0 ? (r.width - (ex - p.x)) : rect.width;
                rect.left = d.indexOf("L") >= 0 ? (sx + (ex - p.x) + r.left) : r.left;
                _this._TempFrame.UpdateGeometry(rect);
            }
        };
        this.OnResizeEnd = function () { };
        this.OnMinimize = function () {
        };
        this.OnFolded = function () {
        };
        this.OnOpenToolBox = function () {
        };
        this.OnSave = function () {
        };
        this.OnHide = function () {
            _this.HideElement();
        };
        this.HideElement = function () {
            (0, funcTools_1.HideElementInShadowRoot)(_this.TempFrame);
        };
        this.ShowElement = function () {
            (0, funcTools_1.ShowElementInShadowRoot)(_this.TempFrame);
        };
    }
    Object.defineProperty(TempFrameService.prototype, "TempFrame", {
        get: function () { var _a, _b; return (_b = (_a = this._TempFrame) === null || _a === void 0 ? void 0 : _a.component) !== null && _b !== void 0 ? _b : null; },
        enumerable: false,
        configurable: true
    });
    return TempFrameService;
}());
exports.TempFrameService = TempFrameService;
var CardFrameService = /** @class */ (function () {
    function CardFrameService() {
    }
    return CardFrameService;
}());
exports.CardFrameService = CardFrameService;
var CardLibService = /** @class */ (function () {
    function CardLibService() {
    }
    return CardLibService;
}());
exports.CardLibService = CardLibService;
var ShadowRootService = /** @class */ (function (_super) {
    __extends(ShadowRootService, _super);
    function ShadowRootService() {
        var _this = _super.call(this) || this;
        _this.registEvents = {};
        _this.host = document.createElement("div");
        _this.root = document.createElement("div");
        _this.SetupHost = function () {
            _this.host.classList.add(constants_1.CSSClass.ShadowRootHost); //root 全屏, 不接受点击操作
            document.body.appendChild(_this.host);
            _this.dom = _this.host.attachShadow({ mode: "open" });
            _this.dom.appendChild(_this.root);
            _this.root.classList.add(constants_1.CSSClass.ShadowRootContainer);
        };
        _this.stop = function () {
        };
        _this.UpdateHostGeometry = function () {
            _this.host.style.height = "".concat(document.scrollingElement.scrollHeight, "px");
        };
        _this.EnableHostPointerEvent = function () {
            _this.host.style.pointerEvents = "all";
        };
        _this.DisableHostPointerEvent = function () {
            _this.host.style.pointerEvents = "none";
        };
        _this.SetupHost();
        return _this;
    }
    return ShadowRootService;
}(BaseTempFrame));
exports.ShadowRootService = ShadowRootService;
var StateService = /** @class */ (function () {
    function StateService() {
        this.registEvents = {};
    }
    return StateService;
}());
exports.StateService = StateService;
//# sourceMappingURL=services.js.map

/***/ }),

/***/ "./src/state.js":
/*!**********************!*\
  !*** ./src/state.js ***!
  \**********************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.STATE = void 0;
var classes_1 = __webpack_require__(/*! ./utils/classes */ "./src/utils/classes.js");
var StateItem = /** @class */ (function () {
    function StateItem() {
        var _this = this;
        this.STATE = new Set();
        this.EMPTY = 0;
        this.HAS = function (B) {
            return _this.STATE.has(B);
        };
        this.NO = function () {
            var B = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                B[_i] = arguments[_i];
            }
            return !_this.SOME.apply(_this, B);
        };
        this.SOME = function () {
            var B = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                B[_i] = arguments[_i];
            }
            return B.some(function (value) { return _this.HAS(value); });
        };
        this.ALL = function () {
            var B = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                B[_i] = arguments[_i];
            }
            return B.reduce(function (sum, value) { return sum && _this.HAS(value); }, true);
        };
        this.ADD = function () {
            var B = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                B[_i] = arguments[_i];
            }
            B.forEach(function (value) { return _this.STATE.add(value); });
            _this.toArray();
            // consolelog(this.toString())
        };
        this.DEL = function () {
            var B = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                B[_i] = arguments[_i];
            }
            B.forEach(function (value) { return _this.STATE.delete(value); });
            _this.toArray();
            // consolelog(this.toString())
        };
        this.CLEAR = function () {
            _this.DEL.apply(_this, _this.toArray());
        };
        // public IFF=(...B:string[])=>{
        // //IF and Only if
        //
        // }
        this.SETONLY = function () {
            var B = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                B[_i] = arguments[_i];
            }
            _this.CLEAR();
            _this.ADD.apply(_this, B);
        };
        this.toArray = function () {
            return Array.from(_this.STATE.values());
        };
        this.AtBasicState = function () {
            return _this.toArray() == _this.BasicState;
        };
    }
    StateItem.prototype.toString = function () {
        return this.toArray().reduce(function (sum, next) { return next + "," + sum; }, "");
    };
    return StateItem;
}());
var FRAME_DRAWING = /** @class */ (function (_super) {
    __extends(FRAME_DRAWING, _super);
    function FRAME_DRAWING() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.TRIGGERD = "TRIGGERD";
        _this.STARTED = "STARTED";
        _this.MOVING = "MOVING";
        _this.BasicState = [];
        return _this;
    }
    return FRAME_DRAWING;
}(StateItem));
var TEMPFRAME = /** @class */ (function (_super) {
    __extends(TEMPFRAME, _super);
    function TEMPFRAME() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.SHOW = "SHOW";
        _this.MOVING = "MOVING";
        _this.RESIZE_TRIGGERED = "RESIZE_TRIGGERED";
        _this.RESIZE_BEGIN = "RESIZE_BEGIN";
        _this.RESIZE_DOING = "RESIZE_DOING";
        _this.ClearResize = function () {
            _this.DEL(_this.RESIZE_TRIGGERED, _this.RESIZE_DOING, _this.RESIZE_BEGIN);
        };
        _this.AT_BUTTON = "AT_BUTTON";
        _this.BasicState = [_this.SHOW];
        return _this;
    }
    return TEMPFRAME;
}(StateItem));
var _STATE = /** @class */ (function (_super) {
    __extends(_STATE, _super);
    function _STATE() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /*
        * 单例模式
        * */
        _this.FRAME_DRAWING = new FRAME_DRAWING();
        _this.TEMPFRAME = new TEMPFRAME();
        _this.FRAME_DRAWING_TRIGGERED = false;
        _this.FRAME_DRAWING_SATRTED = false;
        _this.FRAME_DRAWING_MOVING = false;
        _this.FRAME_DRAWING_STOPPED = true;
        _this.TEMPFRAME_SHOW = false;
        _this.TEMPFRAME_CAN_MOVE = false;
        _this.TEMPFRAME_CAN_RESIZE = false;
        return _this;
    }
    return _STATE;
}((0, classes_1.Singleton)()));
exports.STATE = _STATE.Instance;
//# sourceMappingURL=state.js.map

/***/ }),

/***/ "./src/test.js":
/*!*********************!*\
  !*** ./src/test.js ***!
  \*********************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.test = void 0;
var funcTools_1 = __webpack_require__(/*! ./utils/funcTools */ "./src/utils/funcTools.js");
function test() {
    (0, funcTools_1.InstallEvent)({
        EVENT_FRAME_DRAWING_TRIGGERED: function () {
            console.log("收到 EVENT_FRAME_DRAWING_TRIGGERED");
        }
    });
    // document.body.addEventListener(EVENT_FRAME_DRAWING_TRIGGERED,()=>{ console.log("收到 EVENT_FRAME_DRAWING_TRIGGERED")})
}
exports.test = test;
//# sourceMappingURL=test.js.map

/***/ }),

/***/ "./src/utils/classes.js":
/*!******************************!*\
  !*** ./src/utils/classes.js ***!
  \******************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TempFrameContainer = exports.Singleton = void 0;
var constants_1 = __webpack_require__(/*! ./constants */ "./src/utils/constants.js");
function Singleton() {
    var Singleton = /** @class */ (function () {
        function Singleton() {
        }
        Object.defineProperty(Singleton, "Instance", {
            get: function () {
                if (Singleton._Instance == null) {
                    Singleton._Instance = new this();
                }
                return Singleton._Instance;
            },
            enumerable: false,
            configurable: true
        });
        Singleton._Instance = null;
        return Singleton;
    }());
    return Singleton;
}
exports.Singleton = Singleton;
var BaseTempFrame = /** @class */ (function () {
    function BaseTempFrame() {
        this.zindex = 99999;
    }
    return BaseTempFrame;
}());
var TempFrameBaseElement = /** @class */ (function () {
    function TempFrameBaseElement(classname) {
        var _this = this;
        this.height = 20;
        this.backgroundColor = "background-image:linear-gradient(#34adff,#0083e2)";
        this.element = document.createElement("div");
        this.SetCSSText = function (cssText) {
            _this.element.style.cssText = cssText;
        };
        this.element.classList.add(classname);
    }
    return TempFrameBaseElement;
}());
var TempFrameHeader = /** @class */ (function (_super) {
    __extends(TempFrameHeader, _super);
    function TempFrameHeader() {
        var _this = _super.call(this, constants_1.CSSClass.tempFrameHeader) || this;
        _this.height = 24;
        _this.moveBar = document.createElement("div");
        // public buttonDir = [`${assetsDir}/save.png`]
        _this.buttonGroup = ["save", "fixed", "toolbox", "title", "foldbody", "minimize", "close"];
        _this.InitAll = function () {
            _this.InitSelf();
            _this.InitButtonGroup();
            _this.InitMoveBar();
        };
        _this.InitSelf = function () {
            var btnlen = _this.buttonGroup.length - 1;
            _this.element.style.gridTemplateColumns = "repeat(".concat(Math.floor(btnlen / 2), ", ").concat(_this.height, "px)  auto repeat(").concat(Math.ceil(btnlen / 2), ", ").concat(_this.height, "px)");
        };
        _this.InitButtonGroup = function () {
            _this.buttonGroup.map(function (buttonname) {
                var div = document.createElement("div");
                div.classList.add("icon" + "-" + buttonname);
                // div.style.border = "1px dotted"
                if (buttonname != "title") {
                    div.style.backgroundImage = chrome.runtime.getURL("assets/".concat(buttonname, ".png"));
                    console.log(chrome.runtime.getURL("assets/".concat(buttonname, ".png")));
                    div.classList.add(constants_1.CSSClass.button);
                }
                else {
                    div.textContent = "请输入标题";
                    div.style.color = "white";
                    div.classList.add(constants_1.CSSClass.transitionAll);
                }
                _this.element.appendChild(div);
            });
        };
        _this.InitMoveBar = function () {
            _this.moveBar.classList.add(constants_1.CSSClass.tempFrameHeaderMoveBar, constants_1.CSSClass.transitionAll);
            _this.element.appendChild(_this.moveBar);
        };
        _this.InitAll();
        return _this;
    }
    return TempFrameHeader;
}(TempFrameBaseElement));
var TempFrameFooter = /** @class */ (function (_super) {
    __extends(TempFrameFooter, _super);
    function TempFrameFooter() {
        var _this = _super.call(this, constants_1.CSSClass.tempFrameFooter) || this;
        // public buttonGroup=[""]
        _this.buttonGroup = {}; //key为buttonname,value是对应的HTMLElement
        // this.element.style.backgroundColor = "#34adff"
        var tffb = constants_1.CSSClass.tempFrameFooterButtons;
        for (var name_1 in constants_1.CSSClass.tempFrameFooterButtons) {
            var div = document.createElement("div");
            div.classList.add("icon-" + name_1, constants_1.CSSClass.button);
            _this.buttonGroup[name_1] = div;
            _this.element.appendChild(div);
        }
        return _this;
    }
    return TempFrameFooter;
}(TempFrameBaseElement));
var TempFrameBody = /** @class */ (function (_super) {
    __extends(TempFrameBody, _super);
    function TempFrameBody() {
        var _this = _super.call(this, constants_1.CSSClass.tempFrameBody) || this;
        _this.frame = document.createElement('div');
        _this.element.appendChild(_this.frame);
        _this.frame.classList.add(constants_1.CSSClass.tempFrame);
        return _this;
    }
    return TempFrameBody;
}(TempFrameBaseElement));
var TempFrameContainer = /** @class */ (function (_super) {
    __extends(TempFrameContainer, _super);
    function TempFrameContainer() {
        var _this = _super.call(this, constants_1.CSSClass.tempFrameContainer) || this;
        _this._header = new TempFrameHeader();
        _this._body = new TempFrameBody();
        _this._footer = new TempFrameFooter();
        _this.UpdateFrame = function (value) {
        };
        ([_this.header, _this.body, _this.footer]).map(function (e) {
            _this.element.appendChild(e);
        });
        return _this;
    }
    Object.defineProperty(TempFrameContainer.prototype, "header", {
        get: function () {
            return this._header.element;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TempFrameContainer.prototype, "body", {
        get: function () {
            return this._body.element;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TempFrameContainer.prototype, "footer", {
        get: function () {
            return this._footer.element;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TempFrameContainer.prototype, "headerHeight", {
        get: function () {
            return this.header.getBoundingClientRect().height;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TempFrameContainer.prototype, "footerHeight", {
        get: function () {
            return this.footer.getBoundingClientRect().height;
        },
        enumerable: false,
        configurable: true
    });
    return TempFrameContainer;
}(TempFrameBaseElement));
exports.TempFrameContainer = TempFrameContainer;
//# sourceMappingURL=classes.js.map

/***/ }),

/***/ "./src/utils/connector.js":
/*!********************************!*\
  !*** ./src/utils/connector.js ***!
  \********************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.InstallCoreEventEmitter = exports.SetupCoreEventEmitter = exports.StopService = void 0;
var core_1 = __webpack_require__(/*! ../core */ "./src/core.js");
var state_1 = __webpack_require__(/*! ../state */ "./src/state.js");
var funcTools_1 = __webpack_require__(/*! ./funcTools */ "./src/utils/funcTools.js");
var StopService = function (srv) {
    (0, funcTools_1.UninstallEvent)(srv.registEvents);
};
exports.StopService = StopService;
var SetupCoreEventEmitter = function () {
    (0, funcTools_1.consolelog)("SetupCoreEventEmitter");
    var _a = [core_1.CORE.StateService, core_1.CORE.MaskService, core_1.CORE.ShadowRootService,
        core_1.CORE.TempFrameDrawingService, core_1.CORE.TempFrameService], state = _a[0], mask = _a[1], root = _a[2], draw = _a[3], tempframe = _a[4];
    state.registEvents = {
        EVENT_FRAME_DRAWING_TRIGGERED: function () { state_1.STATE.FRAME_DRAWING.ADD(state_1.STATE.FRAME_DRAWING.TRIGGERD); },
        EVENT_FRAME_DRAWING_SATRTED: function () { state_1.STATE.FRAME_DRAWING.ADD(state_1.STATE.FRAME_DRAWING.STARTED); },
        EVENT_FRAME_DRAWING_MOVING: function () { state_1.STATE.FRAME_DRAWING.ADD(state_1.STATE.FRAME_DRAWING.MOVING); },
        EVENT_FRAME_DRAWING_STOPPED: function () { state_1.STATE.FRAME_DRAWING.CLEAR(); },
        EVENT_FRAME_SHOW: function () { state_1.STATE.TEMPFRAME.ADD(state_1.STATE.TEMPFRAME.SHOW); },
        EVENT_FRAME_HIDE: function () { state_1.STATE.TEMPFRAME.CLEAR(); },
        EVENT_FRAME_MOVE_BEGIN: function () {
            state_1.STATE.TEMPFRAME.ADD(state_1.STATE.TEMPFRAME.MOVING);
            state_1.STATE.TEMPFRAME.ClearResize();
        },
        EVENT_FRAME_MOVE_END: function () { state_1.STATE.TEMPFRAME.DEL(state_1.STATE.TEMPFRAME.MOVING); },
        EVENT_FRAME_RESIZE_TRIGGERED: function () {
            state_1.STATE.TEMPFRAME.ADD(state_1.STATE.TEMPFRAME.RESIZE_TRIGGERED);
            state_1.STATE.TEMPFRAME.DEL(state_1.STATE.TEMPFRAME.MOVING);
        },
        EVENT_FRAME_RESIZE_BEGIN: function () { state_1.STATE.TEMPFRAME.ADD(state_1.STATE.TEMPFRAME.RESIZE_BEGIN); },
        EVENT_FRAME_RESIZING: function () { state_1.STATE.TEMPFRAME.ADD(state_1.STATE.TEMPFRAME.RESIZE_DOING); },
        EVENT_FRAME_RESIZE_END: function () {
            state_1.STATE.TEMPFRAME
                .DEL(state_1.STATE.TEMPFRAME.RESIZE_DOING, state_1.STATE.TEMPFRAME.RESIZE_TRIGGERED, state_1.STATE.TEMPFRAME.RESIZE_BEGIN);
        },
        EVENT_FRAME_AT_BUTTON: function () { state_1.STATE.TEMPFRAME.ADD(state_1.STATE.TEMPFRAME.AT_BUTTON); },
        EVENT_FRAME_OUT_BUTTON: function () { state_1.STATE.TEMPFRAME.DEL(state_1.STATE.TEMPFRAME.AT_BUTTON); }
    };
    root.registEvents = {
        EVENT_FRAME_DRAWING_TRIGGERED: root.EnableHostPointerEvent,
        EVENT_FRAME_DRAWING_STOPPED: root.DisableHostPointerEvent
    };
    mask.registEvents = {
        EVENT_NO_MASK: mask.HideMask,
        EVENT_NEED_MASK: mask.ShowMask
    };
    draw.registEvents = {
        EVENT_FRAME_DRAWING_TRIGGERED: draw.OnDrawingFrameTriggered,
        EVENT_FRAME_DRAWING_SATRTED: draw.OnDrawingFrameStarted,
        EVENT_FRAME_DRAWING_MOVING: draw.OnDrawingFrameMoving,
        EVENT_FRAME_DRAWING_STOPPED: draw.OnDrawingFrameStopped,
        EVENT_FRAME_DRAWING_FAIELD: draw.OnDrawingFrameFailed,
    };
    tempframe.registEvents = {
        EVENT_FRAME_DRAWING_SUCCESS: tempframe.OnDrawingSuccess,
        EVENT_FRAME_HIDE: tempframe.OnHide,
        EVENT_FRAME_MOVE_BEGIN: tempframe.OnMoveBegin,
        EVENT_FRAME_MOVING: tempframe.OnMove,
        EVENT_FRAME_MOVE_END: tempframe.OnMoveEnd,
        // mouse hover -> state triggered(初始条件具备)
        // mousedown -> state begin
        // mousemove -> state resizing
        // mouseup -> state end
        EVENT_FRAME_MOUSE_HOVER: tempframe.OnMouseHover,
        // EVENT_FRAME_RESIZE_BEGIN:tempframe.OnResizeBegin,//mousedown到这里 begin修改状态为begin
        EVENT_FRAME_RESIZING: tempframe.OnResizing,
        EVENT_FRAME_RESIZE_END: tempframe.OnResizeEnd,
    };
};
exports.SetupCoreEventEmitter = SetupCoreEventEmitter;
var InstallCoreEventEmitter = function (E) {
    E.map(function (e) {
        (0, funcTools_1.InstallEvent)(e.registEvents);
    });
};
exports.InstallCoreEventEmitter = InstallCoreEventEmitter;
//# sourceMappingURL=connector.js.map

/***/ }),

/***/ "./src/utils/constants.js":
/*!********************************!*\
  !*** ./src/utils/constants.js ***!
  \********************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ISDEBUG = exports.assetsDir = exports.extensionId = exports.TempFrameHeaderHeight = exports.TempFrameFooterHeight = exports.CSSClass = exports.extensionBaseName = void 0;
exports.extensionBaseName = "screen-card";
function setClassName(list) {
    var emptydict = {};
    list.map(function (e) {
        emptydict[e] = "".concat(e);
    });
    return emptydict;
}
exports.CSSClass = {
    // noselect:`${extensionBaseName}-noselect`,
    // beGray:`${extensionBaseName}-begray`,
    crossCursor: "crossCursor",
    transitionAll: "transitionAll",
    button: "button",
    ShadowRootContainer: "ShadowRootContainer",
    TempFrameComponent: "TempFrameComponent",
    tempFrameContainer: "tempFrameContainer",
    tempFrameHeader: "tempFrameHeader",
    tempFrameHeaderButtons: {
        fixed: "fixed",
        save: "save",
        foldbody: "foldbody",
        minimize: "minimize",
        close: "close",
        title: "title",
        toolbox: "toolbox",
    },
    tempFrameHeaderMoveBar: "tempFrameHeaderMoveBar",
    tempFrameBody: "tempFrameBody",
    tempFrame: "TempFrame",
    tempFrameFooter: "tempFrameFooter",
    tempFrameFooterButtons: {},
    ShadowRootHost: "".concat(exports.extensionBaseName, "-host"),
    selectionFrameDiv: "selectionFrameDiv",
    blockActionMask: "blockActionMask",
    divForBlockMouse: "divForBlockMouse",
};
exports.CSSClass.tempFrameFooterButtons = setClassName(["screenCapture", "function", "filter", "annotGraph", "annotText", "annotFree", "zoomInOut", "drag", "linkCard", "tags", "share", "shutdown"]);
exports.TempFrameFooterHeight = 30;
exports.TempFrameHeaderHeight = 30;
exports.extensionId = "fhngaecmpobhnbjhglakokmnbghmnllk";
exports.assetsDir = "/assets";
exports.ISDEBUG = true;
//# sourceMappingURL=constants.js.map

/***/ }),

/***/ "./src/utils/events.js":
/*!*****************************!*\
  !*** ./src/utils/events.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.EVENT_FRAME_OUT_BUTTON = exports.EVENT_FRAME_AT_BUTTON = exports.EVENT_FRAME_RESIZE_END = exports.EVENT_FRAME_RESIZING = exports.EVENT_FRAME_RESIZE_BEGIN = exports.EVENT_FRAME_RESIZE_TRIGGERED = exports.EVENT_FRAME_MOUSE_HOVER = exports.EVENT_FRAME_MOVE_END = exports.EVENT_FRAME_MOVING = exports.EVENT_FRAME_MOVE_BEGIN = exports.EVENT_FRAME_SHOW = exports.EVENT_FRAME_HIDE = exports.EVENT_INFOMATION = exports.EVENT_FRAME_DRAWING_FAIELD = exports.EVENT_FRAME_DRAWING_SUCCESS = exports.EVENT_FRAME_DRAWING_STOPPED = exports.EVENT_FRAME_DRAWING_MOVING = exports.EVENT_FRAME_DRAWING_SATRTED = exports.EVENT_FRAME_DRAWING_TRIGGERED = exports.EVENT_NO_MASK = exports.EVENT_NEED_MASK = exports.EVENT_TEMPFRAME_REMOVED = exports.EVENT_TEMPFRAME_APPENDED = void 0;
exports.EVENT_TEMPFRAME_APPENDED = "EVENT_TEMPFRAME_APPENDED";
exports.EVENT_TEMPFRAME_REMOVED = "EVENT_TEMPFRAME_REMOVED";
exports.EVENT_NEED_MASK = "EVENT_NEED_MASK";
exports.EVENT_NO_MASK = "EVENT_NO_MASK";
exports.EVENT_FRAME_DRAWING_TRIGGERED = "EVENT_FRAME_DRAWING_TRIGGERED";
exports.EVENT_FRAME_DRAWING_SATRTED = "EVENT_FRAME_DRAWING_SATRTED";
exports.EVENT_FRAME_DRAWING_MOVING = "EVENT_FRAME_DRAWING_MOVING";
exports.EVENT_FRAME_DRAWING_STOPPED = "EVENT_FRAME_DRAWING_STOPPED";
exports.EVENT_FRAME_DRAWING_SUCCESS = "EVENT_FRAME_DRAWING_SUCCESS";
exports.EVENT_FRAME_DRAWING_FAIELD = "EVENT_FRAME_DRAWING_FAIELD";
exports.EVENT_INFOMATION = "EVENT_INFOMATION";
exports.EVENT_FRAME_HIDE = "EVENT_FRAME_HIDE";
exports.EVENT_FRAME_SHOW = "EVENT_FRAME_SHOW";
exports.EVENT_FRAME_MOVE_BEGIN = "EVENT_FRAME_MOVE_BEGIN";
exports.EVENT_FRAME_MOVING = "EVENT_FRAME_MOVING";
exports.EVENT_FRAME_MOVE_END = "EVENT_FRAME_MOVE_END";
exports.EVENT_FRAME_MOUSE_HOVER = "EVENT_FRAME_MOUSE_HOVER";
exports.EVENT_FRAME_RESIZE_TRIGGERED = "EVENT_FRAME_RESIZE_TRIGGERED";
exports.EVENT_FRAME_RESIZE_BEGIN = "EVENT_FRAME_RESIZE_BEGIN";
exports.EVENT_FRAME_RESIZING = "EVENT_FRAME_RESIZING";
exports.EVENT_FRAME_RESIZE_END = "EVENT_FRAME_RESIZE_END";
exports.EVENT_FRAME_AT_BUTTON = "EVENT_FRAME_AT_BUTTON";
exports.EVENT_FRAME_OUT_BUTTON = "EVENT_FRAME_OUT_BUTTON";
// export  const EVENTS = {
//     SELECTION_START: 'SELECTION_START',
//     SELECTION_SUCCESS:"SELECTION_SUCCESS",
//     TEMPFRAME_APPENDED:"TEMPFRAME_APPENDED",
//     TEMPFRAME_REMOVED:"TEMPFRAME_REMOVED",
//     NEED_MASK:"NEED_MASK",
//     NO_MASK:"NO_MASK",
//     FRAME_DRAWING_TRIGGERED:"frameDrawingTriggered",
//     FRAME_DRAWING_SATRTED:"frameDrawingSatrted",
//     FRAME_DRAWING_MOVING:"frameDrawingMoving",
//     FRAME_DRAWING_STOPPED:"frameDrawingStopped",
//     FRAME_DRAWING_SUCCESS:"FRAME_DRAWING_SUCCESS",
//     FRAME_DRAWING_FAIELD:"FRAME_DRAWING_FAIELD",
//     INFOMATION:"COMMON_SHOW_INFO",
// }
//# sourceMappingURL=events.js.map

/***/ }),

/***/ "./src/utils/funcTools.js":
/*!********************************!*\
  !*** ./src/utils/funcTools.js ***!
  \********************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TargetIs = exports.shadowEl = exports.BHas = exports.setElStyle = exports.HideElementInShadowRoot = exports.ShowElementInShadowRoot = exports.consolelog = exports.Dispatch = exports.UninstallEvent = exports.InstallEvent = exports.MakeIconClass = exports.RemoveMaskFromBody = exports.AppendMaskToBody = exports.CursorAtEdge = exports.SwitchFixedToAbsolute = exports.SwitchAbsoluteToFixed = exports.SetElemetCenter = void 0;
var constants_1 = __webpack_require__(/*! ./constants */ "./src/utils/constants.js");
var core_1 = __webpack_require__(/*! ../core */ "./src/core.js");
var EVENTS = __webpack_require__(/*! ./events */ "./src/utils/events.js");
function SetElemetCenter(element, x, y) {
}
exports.SetElemetCenter = SetElemetCenter;
function SwitchAbsoluteToFixed(element) {
}
exports.SwitchAbsoluteToFixed = SwitchAbsoluteToFixed;
function SwitchFixedToAbsolute(element) {
}
exports.SwitchFixedToAbsolute = SwitchFixedToAbsolute;
function CursorAtEdge(element, event) {
    var top = element.getBoundingClientRect().top;
}
exports.CursorAtEdge = CursorAtEdge;
function AppendMaskToBody(zindex, styles) {
    if (styles === void 0) { styles = {}; }
    consolelog("AppendMaskToBody 调用");
    if (!core_1.CORE.ShadowRoot.querySelector("." + constants_1.CSSClass.blockActionMask)) {
        consolelog("AppendMaskToBody !CORE.ShadowRoot.querySelector(\".\"+CSSClass.blockActionMask)) 调用");
        var blockActionMask = document.createElement("div");
        blockActionMask.style.height = "".concat(document.scrollingElement.scrollHeight, "px");
        blockActionMask.classList.add(constants_1.CSSClass.blockActionMask);
        blockActionMask.style.zIndex = "".concat(zindex);
        for (var name_1 in styles) {
            blockActionMask.style[name_1] = styles[name_1];
        }
        core_1.CORE.ShadowRoot.appendChild(blockActionMask);
    }
}
exports.AppendMaskToBody = AppendMaskToBody;
function RemoveMaskFromBody() {
    if (core_1.CORE.ShadowRoot.querySelector(".".concat(constants_1.extensionBaseName, "-masklayer")))
        core_1.CORE.ShadowRoot.removeChild(document.querySelector(".".concat(constants_1.extensionBaseName, "-masklayer")));
}
exports.RemoveMaskFromBody = RemoveMaskFromBody;
function MakeIconClass(IconNameList) {
    var buttongroup = {};
    for (var keyname in IconNameList) {
        var iconpath = chrome.runtime.getURL("".concat(constants_1.assetsDir, "/").concat(keyname, ".png"));
        buttongroup[keyname] = "background-image:url(".concat(iconpath, ")");
    }
    return buttongroup;
}
exports.MakeIconClass = MakeIconClass;
var EventInstalledAt = {};
/**
 * 根据地址注册事件, 并且会记录所在位置, 方便后续的卸载与分发事件
 * */
function InstallEvent(e, place) {
    if (place === void 0) { place = document.body; }
    Object.keys(e).map(function (key) {
        place.addEventListener(key, function (x) {
            e[key](x);
            consolelog("from event = ".concat(key, ", emitter=").concat(e[key]));
        });
        if (!EventInstalledAt[key])
            EventInstalledAt[key] = new Set();
        EventInstalledAt[key].add(place);
        consolelog("installed event ".concat(key, ", emitter = ").concat(e[key]));
    });
}
exports.InstallEvent = InstallEvent;
function UninstallEvent(e) {
    Object.keys(e).map(function (key) {
        EventInstalledAt[key].forEach(function (place) {
            place.removeEventListener(key, e[key]);
        });
    });
}
exports.UninstallEvent = UninstallEvent;
/**
 * 事件分发会自动根据事件在何处注册进行分发.
 * */
function Dispatch(eventName, detail, place) {
    if (detail === void 0) { detail = null; }
    if (place === void 0) { place = null; }
    consolelog("dispatch event: ".concat(eventName));
    if (EventInstalledAt[eventName] && EventInstalledAt[eventName].size > 0) {
        EventInstalledAt[eventName].forEach(function (place) {
            place.dispatchEvent(new CustomEvent(eventName, { detail: detail }));
        });
    }
    else {
        console.error(eventName + " 该事件没有在任何元素上注册!");
    }
}
exports.Dispatch = Dispatch;
function consolelog(a) {
    var filter = __spreadArray(["mouseup", "mousemove"], Object.values(EVENTS), true);
    if (constants_1.ISDEBUG) {
        if (filter.some(function (e) { return a.search(e) != -1; }))
            return;
        console.log(a);
    }
}
exports.consolelog = consolelog;
function ShowElementInShadowRoot(element) {
    if (!core_1.CORE.ShadowRoot.contains(element))
        core_1.CORE.ShadowRoot.appendChild(element);
}
exports.ShowElementInShadowRoot = ShowElementInShadowRoot;
function HideElementInShadowRoot(element) {
    if (core_1.CORE.ShadowRoot.contains(element))
        core_1.CORE.ShadowRoot.removeChild(element);
}
exports.HideElementInShadowRoot = HideElementInShadowRoot;
function setElStyle(element, style) {
    var elStyle = element.style;
    for (var key in style) {
        elStyle[key] = style[key];
    }
}
exports.setElStyle = setElStyle;
/**
 * 位比较
 * */
function BHas(A, B) {
    return (A & B) === B;
}
exports.BHas = BHas;
function shadowEl(selector) {
    return core_1.CORE.ShadowRoot.querySelector(selector);
}
exports.shadowEl = shadowEl;
exports.TargetIs = {
    tempframe: null,
    tempframeComponent: null,
    tempframeContainer: null,
    tempframeHeader: function (target) { return shadowEl("." + constants_1.CSSClass.tempFrameHeader) == target; },
    tempframeHeaderButtons: function (target) {
        return exports.TargetIs.tempframeHeader(target.parentElement) && target.classList.contains(constants_1.CSSClass.button);
    },
    tempFrameFooter: function (target) { return shadowEl("." + constants_1.CSSClass.tempFrameFooter) == target; },
    tempframeFooterButtons: function (target) {
        return exports.TargetIs.tempFrameFooter(target.parentElement) && target.classList.contains(constants_1.CSSClass.button);
    },
};
//# sourceMappingURL=funcTools.js.map

/***/ }),

/***/ "./src/utils/styles_sheet.js":
/*!***********************************!*\
  !*** ./src/utils/styles_sheet.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.styles_sheet = void 0;
var constants_1 = __webpack_require__(/*! ./constants */ "./src/utils/constants.js");
var funcTools_1 = __webpack_require__(/*! ./funcTools */ "./src/utils/funcTools.js");
exports.styles_sheet = {
    default: {},
    other: {},
    buttonIcons: {}, //key是class
};
exports.styles_sheet.default[constants_1.CSSClass.ShadowRootHost] = "\nposition: absolute;\nleft: 0;\ntop:0;\npointer-events: none;\nuser-select: none;\nwidth:100%;\nheight:".concat(document.scrollingElement.scrollHeight, "px;\nz-index:99999;\n");
exports.styles_sheet.default[constants_1.CSSClass.crossCursor] = "cursor: crosshair;";
exports.styles_sheet.default[constants_1.CSSClass.button] = "\nbackground-size:100% 100%;\nbackground-repeat:no-repeat;\ntransition:all 200ms;\n";
exports.styles_sheet.other[".".concat(constants_1.CSSClass.tempFrameHeader, " > div,.").concat(constants_1.CSSClass.tempFrameFooter, " > div")] = "\nborder-radius: 4px;\npadding:3px;\n";
exports.styles_sheet.other[".".concat(constants_1.CSSClass.tempFrameHeader, " > div:hover,.").concat(constants_1.CSSClass.tempFrameFooter, " > div:hover")] = "\nbox-shadow: 4px 4px 4px #494949;\n";
exports.styles_sheet.other[".".concat(constants_1.CSSClass.tempFrameHeader, " > div:active, .").concat(constants_1.CSSClass.tempFrameFooter, " > div:active")] = "\nbackground-color: #ff3333;\n";
for (var keyname in constants_1.CSSClass.tempFrameHeaderButtons) {
    var iconpath = chrome.runtime.getURL("".concat(constants_1.assetsDir, "/").concat(keyname, ".png"));
    if (keyname == "title") {
        exports.styles_sheet.buttonIcons[keyname] = " \n            color:white;\n            text-align:center;\n            ";
    }
    else {
        exports.styles_sheet.buttonIcons[keyname] = "background-image:url(".concat(iconpath, ")");
    }
}
exports.styles_sheet.buttonIcons = Object.assign({}, exports.styles_sheet.buttonIcons, (0, funcTools_1.MakeIconClass)(constants_1.CSSClass.tempFrameFooterButtons));
exports.styles_sheet.default[constants_1.CSSClass.selectionFrameDiv] = "\nposition: absolute;\nborder:1px dotted;\ndisplay:block;\n";
exports.styles_sheet.default[constants_1.CSSClass.blockActionMask] = "\nposition: absolute;\nleft: 0;\ntop: 0;\nwidth: 100%;\nbackground-color:red;\nopacity: 0.8;\n ";
exports.styles_sheet.default[constants_1.CSSClass.divForBlockMouse] = "\nposition: absolute;\nleft:50%;\ntop:3px;\ntransform:translate(-50%,0)\nwidth: 20px;\nheight: 20px;\nborder:1px dotted;\ncursor:crosshair;\n";
exports.styles_sheet.default[constants_1.CSSClass.tempFrameHeaderMoveBar] = "\n        position: absolute;\n        left:50%;\n        top:3px;\n        width:30%;\n        max-width:150px;\n        height:50%;\n        max-height:20px;\n        background-color:white;\n        opacity: 0.5;\n        border-radius:3px;\n        box-shadow: 1px 1px 1px;\n        cursor:all-scroll;\n        transform:translate(-50%,0);\n";
exports.styles_sheet.default[constants_1.CSSClass.tempFrameContainer] = "\nwidth:100%;\nheight:100%;\ndisplay:grid;\ngrid-template-columns: 100%;\ngrid-template-rows: min-content auto min-content; \n";
exports.styles_sheet.default[constants_1.CSSClass.TempFrameComponent] = "\nposition:absolute;\nborder-radius: 4px;\nbox-shadow: 1px 1px 10px #000000b0;\noverflow:hidden;\n";
exports.styles_sheet.default[constants_1.CSSClass.tempFrameHeader] = "\ndisplay:grid;\nheight:".concat(constants_1.TempFrameHeaderHeight, "px;\ngrid-template-rows:").concat(constants_1.TempFrameHeaderHeight, "px;\nbackground-image:linear-gradient(#a6e3f5,#81bae0);\n");
exports.styles_sheet.default[constants_1.CSSClass.tempFrameFooter] = "\nbackground-image:linear-gradient(#a6e3f5,#81bae0);\ndisplay:grid;\njustify-content: center;\ngrid-gap: 2px;\ngrid-template-columns: repeat(auto-fit,30px);\nheight:".concat(constants_1.TempFrameFooterHeight, "px;\ngrid-template-rows:").concat(constants_1.TempFrameFooterHeight, "px;\n");
exports.styles_sheet.default[constants_1.CSSClass.ShadowRootContainer] = "\npointer-events:all;\n";
exports.styles_sheet.default[constants_1.CSSClass.transitionAll] = "\ntransition:all 100ms;\n";
//# sourceMappingURL=styles_sheet.js.map

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
var exports = __webpack_exports__;
/*!**************************!*\
  !*** ./src/injection.js ***!
  \**************************/

Object.defineProperty(exports, "__esModule", ({ value: true }));
var core_1 = __webpack_require__(/*! ./core */ "./src/core.js");
var test_1 = __webpack_require__(/*! ./test */ "./src/test.js");
console.log("injection 文件已经加载");
window.onload = function () {
    core_1.CORE.InstallStyles();
    core_1.CORE.InstallDisptach();
    core_1.CORE.InstallEvents();
    (0, test_1.test)();
    // CORE.ShadowRootService
};
//# sourceMappingURL=injection.js.map
})();

/******/ })()
;
//# sourceMappingURL=injection.js.map