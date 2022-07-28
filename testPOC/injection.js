/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/core.js":
/*!*********************!*\
  !*** ./src/core.js ***!
  \*********************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
chrome.runtime=chrome.runtime?chrome.runtime:{}
chrome.runtime.getURL= chrome.runtime.getURL?chrome.runtime.getURL:(e)=>e
exports.CORE = exports._CORE = void 0;
var services_1 = __webpack_require__(/*! ./services */ "./src/services.js");
var state_1 = __webpack_require__(/*! ./state */ "./src/state.js");
var event_dispatch_1 = __webpack_require__(/*! ./event_dispatch */ "./src/event_dispatch.js");
var styles_sheet_1 = __webpack_require__(/*! ./utils/styles_sheet */ "./src/utils/styles_sheet.js");
var connector_1 = __webpack_require__(/*! ./utils/connector */ "./src/utils/connector.js");
var funcTools_1 = __webpack_require__(/*! ./utils/funcTools */ "./src/utils/funcTools.js");
var _CORE // extends Singleton<_CORE>()
 = /** @class */ (function () {
    function _CORE() {
        this.STATE = state_1.STATE;
        this.ShadowRootService = new services_1.ShadowRootService();
        this.TempFrameDrawingService = new services_1.TempFrameDrawingService();
        this.CardFrameService = new services_1.CardFrameService();
        this.MaskService = new services_1.MaskService();
        this.tempFrame = null;
        this.ShadowRoot = this.ShadowRootService.root;
        this.ServiceList = [this.MaskService, this.TempFrameDrawingService];
        (0, funcTools_1.consolelog)("_CORE 初始化完成");
    }
    _CORE.prototype.InstallDisptach = function () {
        (0, event_dispatch_1.InstallDispatch_TempFrameDrawing)();
    };
    _CORE.prototype.InstallStyles = function () {
        var styleString = "";
        for (var classkey in styles_sheet_1.styles_sheet.default) {
            styleString += "\n.".concat(classkey, "{").concat(styles_sheet_1.styles_sheet.default[classkey], "}");
        }
        for (var otherKey in styles_sheet_1.styles_sheet.other) {
            styleString += "\n.".concat(otherKey, "{").concat(styles_sheet_1.styles_sheet.other[otherKey], "}");
        }
        for (var buttonKey in styles_sheet_1.styles_sheet.buttonIcons) {
            styleString += "\n.".concat(buttonKey, "{").concat(styles_sheet_1.styles_sheet.buttonIcons[buttonKey], "}");
        }
        var styleEl = document.createElement("style");
        styleEl.innerHTML = styleString;
        this.ShadowRoot.appendChild(styleEl);
    };
    _CORE.prototype.InstallEvents = function () {
        (0, funcTools_1.consolelog)("Core InstallEvents");
        (0, connector_1.SetupCoreEventEmitter)();
        (0, connector_1.InstallCoreEventEmitter)(this.ServiceList);
    };
    return _CORE;
}());
exports._CORE = _CORE;
exports.CORE = new _CORE();
//# sourceMappingURL=core.js.map

/***/ }),

/***/ "./src/event_dispatch.js":
/*!*******************************!*\
  !*** ./src/event_dispatch.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UninstallDispatch_TempFrameDrawing = exports.InstallDispatch_TempFrameDrawing = exports.InstallDispatch_UpdateGeometry = exports.ServiceMain = void 0;
var events_1 = __webpack_require__(/*! ./utils/events */ "./src/utils/events.js");
var funcTools_1 = __webpack_require__(/*! ./utils/funcTools */ "./src/utils/funcTools.js");
var state_1 = __webpack_require__(/*! ./state */ "./src/state.js");
var core_1 = __webpack_require__(/*! ./core */ "./src/core.js");
function EventEmitter_DrawingFrameKeyBoardTriggered(e) {
    if (e.ctrlKey && e.altKey && e.key === "e") {
        (0, funcTools_1.Dispatch)(events_1.EVENT_FRAME_DRAWING_TRIGGERED);
    }
    if (e.code === "Escape") {
        (0, funcTools_1.Dispatch)(events_1.EVENT_FRAME_DRAWING_FAIELD);
    }
}
function EventEmitter_DrawingFrameStarted(e) {
    if (state_1.STATE.FRAME_DRAWING_TRIGGERED) {
        (0, funcTools_1.Dispatch)(events_1.EVENT_FRAME_DRAWING_SATRTED, { detail: e });
    }
}
function EventEmitter_DrawingFrameMoving(e) {
    if (state_1.STATE.FRAME_DRAWING_SATRTED) {
        (0, funcTools_1.Dispatch)(events_1.EVENT_FRAME_DRAWING_MOVING, { detail: e });
    }
}
function EventEmitter_DrawingFrameStopped(e) {
    if (state_1.STATE.FRAME_DRAWING_SATRTED) {
        (0, funcTools_1.Dispatch)(events_1.EVENT_FRAME_DRAWING_STOPPED, { detail: e });
    }
}
function EventEmitter_UpdateGeometry() {
    core_1.CORE.ShadowRootService.UpdateHostGeometry();
}
var EventSet_TempFrameDrawing = {
    keydown: EventEmitter_DrawingFrameKeyBoardTriggered,
    mousedown: EventEmitter_DrawingFrameStarted,
    mousemove: EventEmitter_DrawingFrameMoving,
    mouseup: EventEmitter_DrawingFrameStopped,
    // scroll:EventEmitter_UpdateGeometry,
};
function ServiceMain() { }
exports.ServiceMain = ServiceMain;
function InstallDispatch_UpdateGeometry() {
    var observer = new MutationObserver(EventEmitter_UpdateGeometry);
    observer.observe(document.body, {});
}
exports.InstallDispatch_UpdateGeometry = InstallDispatch_UpdateGeometry;
function InstallDispatch_TempFrameDrawing() {
    (0, funcTools_1.InstallEvent)(EventSet_TempFrameDrawing);
}
exports.InstallDispatch_TempFrameDrawing = InstallDispatch_TempFrameDrawing;
function UninstallDispatch_TempFrameDrawing() {
    (0, funcTools_1.UninstallEvent)(EventSet_TempFrameDrawing);
}
exports.UninstallDispatch_TempFrameDrawing = UninstallDispatch_TempFrameDrawing;
//# sourceMappingURL=event_dispatch.js.map

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
exports.ShadowRootService = exports.CardLibService = exports.CardFrameService = exports.InfomationService = exports.TempFrameDrawingService = exports.MaskService = void 0;
var funcTools_1 = __webpack_require__(/*! ./utils/funcTools */ "./src/utils/funcTools.js");
var constants_1 = __webpack_require__(/*! ./utils/constants */ "./src/utils/constants.js");
var core_1 = __webpack_require__(/*! ./core */ "./src/core.js");
var E = __webpack_require__(/*! ./utils/events */ "./src/utils/events.js");
var BaseTempFrame = /** @class */ (function () {
    function BaseTempFrame() {
        this.zindex = 99999;
    }
    return BaseTempFrame;
}());
var MaskService = /** @class */ (function () {
    function MaskService() {
        this.registEvents = {};
    }
    MaskService.prototype.HideMask = function (e) {
        (0, funcTools_1.RemoveMaskFromBody)();
    };
    MaskService.prototype.ShowMask = function (e) {
        (0, funcTools_1.AppendMaskToBody)(e.detail.zindex, e.detail.style);
    };
    MaskService.prototype.stop = function () {
        (0, funcTools_1.UninstallEvent)(this.registEvents);
        core_1.CORE.MaskService = null;
    };
    return MaskService;
}());
exports.MaskService = MaskService;
var TempFrameDrawingService = /** @class */ (function (_super) {
    __extends(TempFrameDrawingService, _super);
    function TempFrameDrawingService() {
        var _this = _super.call(this) || this;
        _this.selectionFrame = document.createElement("div");
        _this.mousedownPosition = [0, 0]; //clientX,clientY
        _this.divForBlockMouse = document.createElement("div");
        _this.registEvents = {};
        _this.ShowSelectionFrame = function () {
            if (!core_1.CORE.ShadowRoot.contains(_this.selectionFrame))
                core_1.CORE.ShadowRoot.appendChild(_this.selectionFrame);
        };
        _this.HideSelectionFrame = function () {
            if (core_1.CORE.ShadowRoot.contains(_this.selectionFrame)) {
                core_1.CORE.ShadowRoot.removeChild(_this.selectionFrame);
            }
        };
        _this.divForBlockMouse = document.createElement("div");
        _this.selectionFrame = document.createElement("div");
        _this.divForBlockMouse.style.zIndex = _this.zindex.toString();
        _this.divForBlockMouse.classList.add(constants_1.CSSClass.divForBlockMouse);
        _this.selectionFrame.classList.add(constants_1.CSSClass.selectionFrameDiv);
        console.log("TempFrameDrawingService 初始化完成");
        return _this;
    }
    // public UpdateBlockMouseDivPosition=(e:MouseEvent)=>{
    //     let [sX,sY]=[window.scrollX,window.scrollY]
    //     this.divForBlockMouse.style.left = (e.clientX-10+sX).toString()+"px";
    //     this.divForBlockMouse.style.top = (e.clientY-10+sY).toString()+"px";
    // }
    // public UpdateSelectionDivSize=(e:MouseEvent)=>{
    //     let [x1,y1] = this.mousedownPosition
    //     let [x2,y2]= [e.clientX, e.clientY]
    //     let [sX,sY]=[window.scrollX,window.scrollY]
    //     let style = this.selectionFrame.style
    //     style.left= `${(Math.min(x1,x2)+sX).toString()}px;`
    //     style.top= `${(Math.min(y1,y2)+sY).toString()}px;`
    //     style.width=`${Math.abs(x2-x1).toString()}px;`
    //     style.height= `${Math.abs(y2-y1).toString()}px;`
    //
    // }
    TempFrameDrawingService.prototype.OnDrawingFrameFailed = function () {
        this.HideSelectionFrame();
    };
    TempFrameDrawingService.prototype.OnDrawingFrameTriggered = function () {
        if (core_1.CORE.TempFrame) {
            core_1.CORE.TempFrame.RemoveFromDom();
            core_1.CORE.tempFrame = null;
        }
        core_1.CORE.STATE.FRAME_DRAWING_TRIGGERED = true;
        (0, funcTools_1.Dispatch)(E.EVENT_NEED_MASK, { zindex: this.zindex - 3, cursor: "crosshair" });
        (0, funcTools_1.Dispatch)(E.EVENT_INFOMATION, { text: "开始截屏" });
        (0, funcTools_1.consolelog)(E.EVENT_NEED_MASK);
    };
    TempFrameDrawingService.prototype.OnDrawingFrameStarted = function (e) {
        console.log(this.selectionFrame);
        console.log(this.divForBlockMouse);
        if (core_1.CORE.STATE.FRAME_DRAWING_TRIGGERED) {
            core_1.CORE.STATE.FRAME_DRAWING_SATRTED = true;
            // this.ShowSelectionFrame()
            (0, funcTools_1.ShowElementInShadowRoot)(this.selectionFrame);
            this.mousedownPosition = [e.detail.clientX, e.detail.clientY];
            // this.UpdateBlockMouseDivPosition(e.detail)
            (0, funcTools_1.UpdateElementAtMousePos)(this.divForBlockMouse, { x: this.mousedownPosition[0] - 10,
                y: this.mousedownPosition[1] - 10, });
            (0, funcTools_1.UpdateElementSizeBaseOld)(this.selectionFrame, { x: e.detail.clientX, y: e.detail.clientY }, { x: this.mousedownPosition[0], y: this.mousedownPosition[1] });
            // this.UpdateSelectionDivSize(e.detail)
        }
    };
    TempFrameDrawingService.prototype.OnDrawingFrameMoving = function (e) {
        if (core_1.CORE.STATE.FRAME_DRAWING_SATRTED) {
            core_1.CORE.STATE.FRAME_DRAWING_MOVING = true;
            (0, funcTools_1.UpdateElementAtMousePos)(this.divForBlockMouse, { x: this.mousedownPosition[0] - 10,
                y: this.mousedownPosition[1] - 10, });
            // this.UpdateSelectionDivSize(e.detail)
            (0, funcTools_1.UpdateElementSizeBaseOld)(this.selectionFrame, { x: e.detail.clientX, y: e.detail.clientY }, { x: this.mousedownPosition[0], y: this.mousedownPosition[1] });
        }
    };
    TempFrameDrawingService.prototype.OnDrawingFrameStopped = function (e) {
        core_1.CORE.STATE.FRAME_DRAWING_STOPPED = true;
        (0, funcTools_1.Dispatch)(E.EVENT_FRAME_DRAWING_SUCCESS, this.selectionFrame);
        (0, funcTools_1.Dispatch)(E.EVENT_NO_MASK);
    };
    TempFrameDrawingService.prototype.stop = function () {
        (0, funcTools_1.UninstallEvent)(this.registEvents);
        core_1.CORE.TempFrameDrawingService = null;
    };
    return TempFrameDrawingService;
}(BaseTempFrame));
exports.TempFrameDrawingService = TempFrameDrawingService;
var InfomationService = /** @class */ (function () {
    function InfomationService() {
    }
    return InfomationService;
}());
exports.InfomationService = InfomationService;
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
        _this.SetupHost();
        return _this;
    }
    ShadowRootService.prototype.SetupHost = function () {
        this.host.classList.add(constants_1.CSSClass.ShadowRootHost); //root 全屏, 不接受点击操作
        this.host.style.cssText = "\n        position: absolute;\n        left: 0;\n        top:0;\n        pointer-events: none;\n        background:white;\n        opacity:0.5;\n        width:100%;\n        height:".concat(document.scrollingElement.scrollHeight, "px;\n        z-index:").concat(this.zindex - 10, ";\n        ");
        this.root = this.host.attachShadow({ mode: "open" });
        document.body.appendChild(this.host);
    };
    ShadowRootService.prototype.stop = function () {
    };
    ShadowRootService.prototype.UpdateHostGeometry = function () {
        this.host.style.height = "".concat(document.scrollingElement.scrollHeight, "px");
    };
    return ShadowRootService;
}(BaseTempFrame));
exports.ShadowRootService = ShadowRootService;
//# sourceMappingURL=services.js.map

/***/ }),

/***/ "./src/state.js":
/*!**********************!*\
  !*** ./src/state.js ***!
  \**********************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.STATE = void 0;
var _STATE = /** @class */ (function () {
    function _STATE() {
        this.FRAME_DRAWING_TRIGGERED = false;
        this.FRAME_DRAWING_SATRTED = false;
        this.FRAME_DRAWING_MOVING = false;
        this._FRAME_DRAWING_STOPPED = false;
    }
    Object.defineProperty(_STATE.prototype, "FRAME_DRAWING_STOPPED", {
        get: function () {
            return this._FRAME_DRAWING_STOPPED;
        },
        set: function (b) {
            this._FRAME_DRAWING_STOPPED = b;
            this.FRAME_DRAWING_TRIGGERED = !b;
            this.FRAME_DRAWING_SATRTED = !b;
            this.FRAME_DRAWING_MOVING = !b;
        },
        enumerable: false,
        configurable: true
    });
    _STATE.getInstance = function () {
        if (!_STATE.instance) {
            _STATE.instance = new _STATE();
        }
        return _STATE.instance;
    };
    /*
    * 单例模式
    * */
    _STATE.instance = null;
    return _STATE;
}());
exports.STATE = _STATE.getInstance();
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

/***/ "./src/utils/connector.js":
/*!********************************!*\
  !*** ./src/utils/connector.js ***!
  \********************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.InstallCoreEventEmitter = exports.SetupCoreEventEmitter = exports.StopService = void 0;
var core_1 = __webpack_require__(/*! ../core */ "./src/core.js");
var funcTools_1 = __webpack_require__(/*! ./funcTools */ "./src/utils/funcTools.js");
function StopService(srv) {
    (0, funcTools_1.UninstallEvent)(srv.registEvents);
}
exports.StopService = StopService;
function SetupCoreEventEmitter() {
    (0, funcTools_1.consolelog)("SetupCoreEventEmitter");
    core_1.CORE.MaskService.registEvents = {
        EVENT_NO_MASK: core_1.CORE.MaskService.HideMask,
        EVENT_NEED_MASK: core_1.CORE.MaskService.ShowMask
    };
    core_1.CORE.TempFrameDrawingService.registEvents = {
        EVENT_FRAME_DRAWING_TRIGGERED: core_1.CORE.TempFrameDrawingService.OnDrawingFrameTriggered,
        EVENT_FRAME_DRAWING_SATRTED: core_1.CORE.TempFrameDrawingService.OnDrawingFrameStarted,
        EVENT_FRAME_DRAWING_MOVING: core_1.CORE.TempFrameDrawingService.OnDrawingFrameMoving,
        EVENT_FRAME_DRAWING_STOPPED: core_1.CORE.TempFrameDrawingService.OnDrawingFrameStopped,
        EVENT_FRAME_DRAWING_FAIELD: core_1.CORE.TempFrameDrawingService.OnDrawingFrameFailed,
    };
}
exports.SetupCoreEventEmitter = SetupCoreEventEmitter;
function InstallCoreEventEmitter(E) {
    E.map(function (e) {
        (0, funcTools_1.InstallEvent)(e.registEvents);
    });
}
exports.InstallCoreEventEmitter = InstallCoreEventEmitter;
//# sourceMappingURL=connector.js.map

/***/ }),

/***/ "./src/utils/constants.js":
/*!********************************!*\
  !*** ./src/utils/constants.js ***!
  \********************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ISDEBUG = exports.assetsDir = exports.extensionId = exports.CSSClass = exports.extensionBaseName = void 0;
exports.extensionBaseName = "screen-card";
function setClassName(list) {
    var emptydict = {};
    list.map(function (e) {
        emptydict[e] = "".concat(exports.extensionBaseName, "-").concat(e);
    });
    return emptydict;
}
exports.CSSClass = {
    // noselect:`${extensionBaseName}-noselect`,
    // beGray:`${extensionBaseName}-begray`,
    crossCursor: "".concat(exports.extensionBaseName, "-crossCursor"),
    button: "".concat(exports.extensionBaseName, "-button"),
    tempFrameHeaderButtons: {
        fixed: "".concat(exports.extensionBaseName, "-fixed"),
        save: "".concat(exports.extensionBaseName, "-save"),
        foldbody: "".concat(exports.extensionBaseName, "-foldbody"),
        minimize: "".concat(exports.extensionBaseName, "-minimize"),
        close: "".concat(exports.extensionBaseName, "-close"),
        title: "".concat(exports.extensionBaseName, "-title"),
        toolbox: "".concat(exports.extensionBaseName, "-toolbox"),
    },
    tempFrameFooterButtons: {},
    tempFrameHeader: "".concat(exports.extensionBaseName, "-tempframe-header"),
    tempFrameFooter: "".concat(exports.extensionBaseName, "-tempframe-footer"),
    ShadowRootHost: "".concat(exports.extensionBaseName, "-host"),
    selectionFrameDiv: "selectionFrameDiv",
    blockActionMask: "blockActionMask",
    divForBlockMouse: "divForBlockMouse"
};
exports.CSSClass.tempFrameFooterButtons = setClassName(["screenCapture", "function", "filter", "annotGraph", "annotText", "annotFree", "zoomInOut", "drag", "linkCard", "tags", "share", "shutdown"]);
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
exports.EVENT_INFOMATION = exports.EVENT_FRAME_DRAWING_FAIELD = exports.EVENT_FRAME_DRAWING_SUCCESS = exports.EVENT_FRAME_DRAWING_STOPPED = exports.EVENT_FRAME_DRAWING_MOVING = exports.EVENT_FRAME_DRAWING_SATRTED = exports.EVENT_FRAME_DRAWING_TRIGGERED = exports.EVENT_NO_MASK = exports.EVENT_NEED_MASK = exports.EVENT_TEMPFRAME_REMOVED = exports.EVENT_TEMPFRAME_APPENDED = void 0;
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
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UpdateElementAtMousePos = exports.UpdateElementSizeBaseOld = exports.HideElementInShadowRoot = exports.ShowElementInShadowRoot = exports.consolelog = exports.Dispatch = exports.UninstallEvent = exports.InstallEvent = exports.MakeIconClass = exports.RemoveMaskFromBody = exports.AppendMaskToBody = exports.CursorAtEdge = exports.SwitchFixedToAbsolute = exports.SwitchAbsoluteToFixed = exports.SetElemetCenter = void 0;
var constants_1 = __webpack_require__(/*! ./constants */ "./src/utils/constants.js");
var core_1 = __webpack_require__(/*! ../core */ "./src/core.js");
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
    console.log("AppendMaskToBody 调用");
    if (!core_1.CORE.ShadowRoot.querySelector("." + constants_1.CSSClass.blockActionMask)) {
        console.log("AppendMaskToBody !CORE.ShadowRoot.querySelector(\".\"+CSSClass.blockActionMask)) 调用");
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
function InstallEvent(e) {
    for (var _i = 0, _a = Object.keys(e); _i < _a.length; _i++) {
        var key = _a[_i];
        document.body.addEventListener(key, e[key]);
        consolelog("installed event ".concat(key, ", emitter = ").concat(e[key]));
    }
    // Object.keys(e).map((key)=>{
    //     document.body.addEventListener(key,e[key])
    //     consolelog(`installed event ${key}, emitter = ${e[key].name}`)
    // })
}
exports.InstallEvent = InstallEvent;
function UninstallEvent(service) {
    Object.keys(service).map(function (key) {
        document.body.removeEventListener(key, service[key]);
    });
}
exports.UninstallEvent = UninstallEvent;
function Dispatch(eventName, details) {
    if (details === void 0) { details = null; }
    consolelog("dispatch event: ".concat(eventName));
    document.body.dispatchEvent(new CustomEvent(eventName, { detail: details }));
}
exports.Dispatch = Dispatch;
function consolelog(a) {
    if (constants_1.ISDEBUG)
        console.log(a);
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
/**
 *
 * */
function UpdateElementSizeBaseOld(el, newPos, oldPos) {
    var _a = [window.scrollX, window.scrollY], sX = _a[0], sY = _a[1];
    var _b = [oldPos.x, oldPos.y], x1 = _b[0], y1 = _b[1];
    var _c = [newPos.x, newPos.y], x2 = _c[0], y2 = _c[1];
    var style = el.style;
    style.left = "".concat((Math.min(x1, x2) + sX).toString(), "px;");
    style.top = "".concat((Math.min(y1, y2) + sY).toString(), "px;");
    style.width = "".concat(Math.abs(x2 - x1).toString(), "px;");
    style.height = "".concat(Math.abs(y2 - y1).toString(), "px;");
}
exports.UpdateElementSizeBaseOld = UpdateElementSizeBaseOld;
function UpdateElementAtMousePos(el, posi) {
    var _a = [window.scrollX, window.scrollY], sX = _a[0], sY = _a[1];
    el.style.left = (posi.x + sX).toString() + "px";
    el.style.top = (posi.y + sY).toString() + "px";
}
exports.UpdateElementAtMousePos = UpdateElementAtMousePos;
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
exports.styles_sheet.default[constants_1.CSSClass.ShadowRootHost] = "\nposition:absolute;\nwidth:100%;\ntop:0;\nleft:0;\npointer-events:none;\n";
exports.styles_sheet.default[constants_1.CSSClass.crossCursor] = "cursor: crosshair;";
exports.styles_sheet.default[constants_1.CSSClass.button] = "\nbackground-size:100% 100%;\nbackground-repeat:no-repeat;\n";
exports.styles_sheet.other[".".concat(constants_1.CSSClass.tempFrameHeader, " > div,.").concat(constants_1.CSSClass.tempFrameFooter, " > div")] = "\ntransition:all 200ms;\nborder-radius: 4px;\npadding:3px;\n";
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
exports.styles_sheet.default[constants_1.CSSClass.blockActionMask] = "\nposition: absolute;\nleft: 0;\ntop: 0;\nwidth: 100%;\nbackground-color:white;\nopacity: 0.5;\n ";
exports.styles_sheet.default[constants_1.CSSClass.divForBlockMouse] = "\nposition: absolute;\nwidth: 20px;\nheight: 20px;\nborder:1px dotted;\n";
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