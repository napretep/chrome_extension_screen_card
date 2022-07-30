/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/actionDispatcher.js":
/*!*********************************!*\
  !*** ./src/actionDispatcher.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.InstallAction = exports.ActionSet = void 0;
/**
 * 这个文件用来处理用户行为事件的分发
 * */
var E = __webpack_require__(/*! ./utils/events */ "./src/utils/events.js");
var events_1 = __webpack_require__(/*! ./utils/events */ "./src/utils/events.js");
var funcTools_1 = __webpack_require__(/*! ./utils/funcTools */ "./src/utils/funcTools.js");
var state_1 = __webpack_require__(/*! ./state */ "./src/state.js");
var core_1 = __webpack_require__(/*! ./core */ "./src/core.js");
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
        _this.AdjustRect = function (elRect) {
            for (var key in elRect) {
                elRect[key] = elRect[key] ? elRect[key] + _this.component.getBoundingClientRect()[key] : elRect[key];
            }
            return elRect;
        };
        _this.UpdateGeometry = function (elRect) {
            var r2 = {};
            if (_this.IsAbsolutePosition) {
                elRect.left ? elRect.left += window.scrollX : null;
                elRect.top ? elRect.top += window.scrollY : null;
            }
            for (var key in elRect) {
                if (elRect[key])
                    r2[key] = "".concat(elRect[key], "px");
            }
            (0, funcTools_1.setElStyle)(_this.component, r2);
        };
        _this.HideFooter = function () {
            if (_this._container.footerHeight > 0) {
                _this.UpdateGeometry(_this.AdjustRect({ top: null, left: null, width: null, height: -constants_1.TempFrameHeaderHeight }));
                _this._container.footerHeight = 0;
            }
        };
        _this.ShowFooter = function () {
            if (_this._container.footerHeight == 0) {
                _this._container.footerHeight = constants_1.TempFrameHeaderHeight;
                _this.UpdateGeometry(_this.AdjustRect({ top: null, left: null, width: null, height: constants_1.TempFrameHeaderHeight }));
            }
        };
        _this.Pine = function () {
            if (_this.IsAbsolutePosition)
                _this.component.style.position = "fixed";
            else
                _this.component.style.position = "absolute";
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
    Object.defineProperty(TempFrameComponent.prototype, "IsAbsolutePosition", {
        get: function () {
            var p = window.getComputedStyle(this.component).position;
            return p ? p == "absolute" : true;
        },
        enumerable: false,
        configurable: true
    });
    TempFrameComponent.prototype.WrapFrameRect = function (elRect) {
        var headerHeight = this._container.headerHeight > 0 ? this._container.headerHeight : constants_1.TempFrameHeaderHeight;
        var footerHeight = this._container.footerHeight > 0 ? this._container.footerHeight : constants_1.TempFrameFooterHeight;
        var rect = {
            left: elRect.left,
            top: elRect.top - headerHeight,
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
        }).reduce(function (sum, next) {
            return sum + next[1];
        }, "");
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
            (0, actionDispatcher_1.InstallAction)(actionDispatcher_1.ActionSet);
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
            if (state_1.STATE.FRAME_DRAWING.HAS(state_1.STATE.FRAME_DRAWING.TRIGGERED)) {
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
            _this.divForBlockMouse.style.left = (e.clientX + sX).toString() + "px";
            _this.divForBlockMouse.style.top = (e.clientY + sY).toString() + "px";
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
        this.bodyheight = null;
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
            _this.TempFrame.classList.remove(constants_1.CSSClass.transitionAll);
            _this.state.moving.startmove = {
                x: e.detail.clientX, y: e.detail.clientY,
                left: _this.TempFrame.getBoundingClientRect().left,
                top: _this.TempFrame.getBoundingClientRect().top
            };
            console.log("OnMoveBegin=", _this.state.moving.startmove);
        };
        this.OnMove = function (e) {
            // this.TempFrame.classList.remove(CSSClass.transitionAll)
            var start = _this.state.moving.startmove;
            var rect = {
                left: start.left + (e.detail.clientX - start.x),
                top: start.top + (e.detail.clientY - start.y),
                width: null,
                height: null
            };
            console.log("onmove  ", rect);
            _this._TempFrame.UpdateGeometry(rect);
        };
        this.OnMoveEnd = function () {
            _this.TempFrame.classList.add(constants_1.CSSClass.transitionAll);
        };
        this.OnMouseHover = function (e) {
            var edge = _this._TempFrame.AtEdge({ x: e.detail.clientX, y: e.detail.clientY });
            if (edge) {
                document.body.style.cursor = _this.cursorAt[edge];
                _this.TempFrame.style.cursor = _this.cursorAt[edge];
                _this.resizeBegin = {
                    cursor: { x: e.detail.clientX, y: e.detail.clientY },
                    div: {
                        left: _this.TempFrame.getBoundingClientRect().left,
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
                _this.InitStyle();
            }
        };
        this.OnClosed = function () {
        };
        this.OnResizing = function (e) {
            var _a = [e.detail.clientX, e.detail.clientY], ex = _a[0], ey = _a[1];
            var _b = [_this.resizeBegin.cursor, _this.resizeBegin.div, _this.resizeBegin.direction], p = _b[0], r = _b[1], d = _b[2];
            var rect = { left: null, top: null, width: null, height: null };
            rect.height = d.indexOf("B") >= 0 ? (r.height + (ey - p.y)) : r.height;
            rect.width = d.indexOf("R") >= 0 ? (r.width + (ex - p.x)) : r.width;
            rect.height = d.indexOf("T") >= 0 ? (r.height - (ey - p.y)) : rect.height;
            rect.top = d.indexOf("T") >= 0 ? ((ey - p.y) + r.top) : r.top;
            rect.width = d.indexOf("L") >= 0 ? (r.width - (ex - p.x)) : rect.width;
            rect.left = d.indexOf("L") >= 0 ? ((ex - p.x) + r.left) : r.left;
            _this._TempFrame.UpdateGeometry(rect);
        };
        this.OnResizeEnd = function () {
        };
        this.OnMinimize = function () {
        };
        this.OnFoldBody = function (e) {
            var rect;
            if (state_1.STATE.TEMPFRAME.HAS(state_1.STATE.TEMPFRAME.BTN_FOLDBODY)) {
                _this.bodyheight = _this.TempFrame.getBoundingClientRect().height;
                rect = { left: null, top: null, width: null, height: constants_1.TempFrameHeaderHeight };
            }
            else {
                rect = { left: null, top: null, width: null, height: _this.bodyheight };
                _this.bodyheight = null;
            }
            _this._TempFrame.UpdateGeometry(rect);
        };
        this.OnOpenToolBox = function () {
            var ST = state_1.STATE.TEMPFRAME;
            if (ST.HAS(ST.BTN_TOOLS)) {
                _this._TempFrame.HideFooter();
            }
            else {
                _this._TempFrame.ShowFooter();
            }
        };
        this.OnPine = function () {
            var btn = _this._TempFrame._container._header.buttonGroup[constants_1.CSSClass.tempFrameHeaderButtons.fixed];
            if (state_1.STATE.TEMPFRAME.HAS(state_1.STATE.TEMPFRAME.BTN_PINE)) {
                btn.style.backgroundColor = constants_1.BTN_Red;
                _this._TempFrame.Pine();
            }
            else {
                btn.style.backgroundColor = "";
                _this._TempFrame.Pine();
            }
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
        this.InitStyle = function () {
            _this.TempFrame.style.cursor = "";
            document.body.style.cursor = "";
        };
    }
    Object.defineProperty(TempFrameService.prototype, "TempFrame", {
        get: function () {
            var _a, _b;
            return (_b = (_a = this._TempFrame) === null || _a === void 0 ? void 0 : _a.component) !== null && _b !== void 0 ? _b : null;
        },
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
        _this.EnableRootContainerFullScreen = function () {
            _this.root.classList.add(constants_1.CSSClass.fullScreen);
            (0, funcTools_1.consolelog)("EnableRootContainerFullScreen");
        };
        _this.DisableRootContainerFullScreen = function () {
            _this.root.classList.remove(constants_1.CSSClass.fullScreen);
            (0, funcTools_1.consolelog)("DisableRootContainerFullScreen");
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
// import {ConflictFlag, IService, IState,} from "./utils/interfaces";
var classes_1 = __webpack_require__(/*! ./utils/classes */ "./src/utils/classes.js");
/**
 * {STATE}是状态, 用集合存储各类flag, 从而显示出不同的状态.
 * {Group}是flag的分类, flag一般写成 xxx_xxx_xxx的形式, `_` 分割的首个xxx就是flag的分类
 *
 * */
var StateItem = /** @class */ (function () {
    function StateItem() {
        var _this = this;
        this.STATE = new Set();
        this.EMPTY = 0;
        //满足
        this.HAS = function (B) {
            return _this.STATE.has(B);
        };
        //全部不满手
        this.NO = function () {
            var B = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                B[_i] = arguments[_i];
            }
            return !_this.SOME.apply(_this, B);
        };
        //部分条件满足
        this.SOME = function () {
            var B = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                B[_i] = arguments[_i];
            }
            return B.some(function (value) { return _this.HAS(value); });
        };
        //全部条件满足
        this.ALL = function () {
            var B = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                B[_i] = arguments[_i];
            }
            return B.reduce(function (sum, value) { return sum && _this.HAS(value); }, true);
        };
        //当且仅当
        this.IFF = function () {
            var B = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                B[_i] = arguments[_i];
            }
            return _this.toArray().sort().toString() === B.sort().toString();
        };
        this.ADD = function () {
            var B = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                B[_i] = arguments[_i];
            }
            B.forEach(function (value) {
                var group = value.split("_")[0];
                _this.RemoveConflict(group);
                _this.STATE.add(value);
            });
            console.log(_this.constructor.name + " " +
                B.toString() + ">>>added>>>" + _this.toString());
        };
        this.SWITCH = function () {
            var B = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                B[_i] = arguments[_i];
            }
            B.forEach(function (val) {
                !_this.HAS(val) ? _this.ADD(val) : _this.DEL(val);
            });
        };
        this.DEL = function () {
            var B = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                B[_i] = arguments[_i];
            }
            B.forEach(function (value) { return _this.STATE.delete(value); });
            console.log(_this.constructor.name + " " + B.toString() + ">>>deleted>>>" + _this.toString());
        };
        this.CLEAR = function () {
            _this.DEL.apply(_this, _this.toArray());
        };
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
        this.IsBasicState = function () {
            return _this.IFF.apply(_this, _this.BasicFlag);
        };
        this.SetBasicState = function () {
            _this.SETONLY.apply(_this, _this.BasicFlag);
        };
        this.InitWith = function () {
            var B = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                B[_i] = arguments[_i];
            }
            _this.SetBasicState();
            _this.ADD.apply(_this, B);
        };
        /**
         * NOGROUP 即状态中 没有 B类flag,
         * 如果 B为null, 则状态中全部类型flag都无
         * */
        this.NOGROUP = function (B) {
            if (B === void 0) { B = null; }
            if (B)
                return !_this.toArray().some(function (s) {
                    s.startsWith(B);
                });
            else {
                return !Object.keys(_this.Groups).some(function (s) {
                    return _this.HASGROUP(s);
                });
            }
        };
        /**
         *     ONLYGROUP的意思是 在GroupNames中 B类flag是当前状态唯一存在的
         * */
        this.ONLYGROUP = function (B) {
            return Object.keys(_this.Groups).reduce(function (result, next) {
                if (B === next)
                    return result && _this.HASGROUP(B);
                return result && !_this.HASGROUP(next);
            }, true);
        };
        /**
         * HASGROUP 就是检测当前状态中是否存在B类flag
         * */
        this.HASGROUP = function (B) {
            return _this.toArray().some(function (s) {
                return s.startsWith(B);
            });
        };
        /**
         * 获取状态中, 与groupname 冲突的集
         * */
        this.getConlictSet = function (groupname) {
            return _this.ConflictFlag.reduce(function (result, next) {
                return next.has(groupname) ? next : result;
            }, new Set());
        };
        /**
         * 移除状态中所有 groupname类的flag
         * */
        this.RemoveGroup = function (groupname) {
            _this.STATE.forEach(function (s_flag) {
                return s_flag.startsWith(groupname) ?
                    _this.DEL(s_flag)
                    : null;
            });
        };
        /**
         * 移除状态中所有与给定group相斥的group,
         * */
        this.RemoveConflict = function (groupname) {
            _this.getConlictSet(groupname).forEach(function (name) {
                if (name === groupname)
                    return;
                else {
                    _this.STATE.forEach(function (s_flag) {
                        return s_flag.startsWith(name) ?
                            _this.DEL(s_flag)
                            : null;
                    });
                }
            });
        };
    }
    StateItem.prototype.toString = function () {
        return this.toArray().toString();
    };
    return StateItem;
}());
var FRAME_DRAWING = /** @class */ (function (_super) {
    __extends(FRAME_DRAWING, _super);
    function FRAME_DRAWING() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.TRIGGERED = "TRIGGERD";
        _this.STARTED = "STARTED";
        _this.MOVING = "MOVING";
        _this.Groups = {};
        _this.BasicFlag = [];
        _this.ConflictFlag = [];
        return _this;
    }
    return FRAME_DRAWING;
}(StateItem));
var TEMPFRAME = /** @class */ (function (_super) {
    __extends(TEMPFRAME, _super);
    function TEMPFRAME() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.SHOW = "SHOW";
        _this.MOVE_BEGIN = "MOVE_BEGIN";
        _this.MOVE_DOING = "MOVE_DOING";
        _this.RESIZE_TRIGGERED = "RESIZE_TRIGGERED";
        _this.RESIZE_BEGIN = "RESIZE_BEGIN";
        _this.RESIZE_DOING = "RESIZE_DOING";
        _this.BTN_FOLDBODY = "BTN_FOLDBODY";
        _this.BTN_MINIMIZE = "BTN_MINIMIZE";
        _this.BTN_TOOLS = "BTN_TOOLS";
        _this.BTN_PINE = "BTN_PINE";
        _this.ClearResize = function () {
            _this.DEL(_this.RESIZE_TRIGGERED, _this.RESIZE_DOING, _this.RESIZE_BEGIN);
        };
        _this.ClearMove = function () {
            _this.DEL(_this.MOVE_DOING);
        };
        _this.AT_BUTTON = "AT_BUTTON";
        _this.BasicFlag = [_this.SHOW];
        _this.Groups = {
            RESIZE: "RESIZE", MOVE: "MOVE"
        };
        _this.ConflictFlag = [new Set([_this.Groups.RESIZE, _this.Groups.MOVE])];
        return _this;
    }
    return TEMPFRAME;
}(StateItem));
var MOUSE = /** @class */ (function (_super) {
    __extends(MOUSE, _super);
    function MOUSE() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.BasicFlag = [];
        _this.ConflictFlag = [];
        _this.Groups = {};
        _this.LBTN_HOLDING = "LBTN_HOLDING";
        _this.LBTN_RELEASED = "LBTN_RELEASED";
        _this.RBTN_HOLDING = "RBTN_HOLDING";
        _this.RBTN_RELEASED = "RBTN_RELEASED";
        return _this;
    }
    return MOUSE;
}(StateItem));
var _STATE = /** @class */ (function (_super) {
    __extends(_STATE, _super);
    function _STATE() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /*
        * 单例模式
        * */
        _this.MOUSE = new MOUSE();
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
exports.TempFrameContainer = exports.Singleton = void 0;
var constants_1 = __webpack_require__(/*! ./constants */ "./src/utils/constants.js");
var funcTools_1 = __webpack_require__(/*! ./funcTools */ "./src/utils/funcTools.js");
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
        _this.buttonGroup = {};
        _this.children = {
            left: document.createElement("div"),
            center: document.createElement("div"),
            right: document.createElement("div"),
            moveBar: document.createElement("div"),
        };
        // public buttonDir = [`${assetsDir}/save.png`]
        _this.leftButtonGroup = ["save", "fixed", "toolbox"];
        _this.rightButtonGroup = ["foldbody", "minimize", "close"];
        _this.InitAll = function () {
            _this.InitSelf();
            _this.InitMoveBar();
            _this.InitButton(_this.children.left, _this.leftButtonGroup);
            _this.InitCenter();
            _this.InitButton(_this.children.right, _this.rightButtonGroup);
        };
        _this.InitSelf = function () {
            funcTools_1.AppendChildren.apply(void 0, __spreadArray([_this.element], Object.values(_this.children), false));
        };
        _this.InitCenter = function () {
            _this.children.center.classList.add(constants_1.CSSClass.tempFrameHeaderButtons.title);
        };
        _this.InitButton = function (el, LR) {
            LR.map(function (btnName) {
                var div = document.createElement("div");
                div.classList.add("icon" + "-" + btnName);
                div.style.backgroundImage = chrome.runtime.getURL("assets/".concat(btnName, ".png"));
                console.log(chrome.runtime.getURL("assets/".concat(btnName, ".png")));
                div.classList.add(constants_1.CSSClass.button);
                el.appendChild(div);
                _this.buttonGroup[btnName] = div;
            });
            el.classList.add(constants_1.CSSClass.tempFrameHeaderSide);
        };
        _this.InitMoveBar = function () {
            _this.children.moveBar.classList.add(constants_1.CSSClass.tempFrameHeaderMoveBar, constants_1.CSSClass.transitionAll);
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
        set: function (value) {
            this.footer.style.height = "".concat(value, "px");
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
        EVENT_FRAME_DRAWING_TRIGGERED: function () {
            state_1.STATE.FRAME_DRAWING.ADD(state_1.STATE.FRAME_DRAWING.TRIGGERED);
        },
        EVENT_FRAME_DRAWING_SATRTED: function () {
            state_1.STATE.FRAME_DRAWING.ADD(state_1.STATE.FRAME_DRAWING.STARTED);
        },
        EVENT_FRAME_DRAWING_MOVING: function () {
            state_1.STATE.FRAME_DRAWING.ADD(state_1.STATE.FRAME_DRAWING.MOVING);
        },
        EVENT_FRAME_DRAWING_STOPPED: function () {
            state_1.STATE.FRAME_DRAWING.CLEAR();
        },
        EVENT_FRAME_SHOW: function () {
            state_1.STATE.TEMPFRAME.SetBasicState();
        },
        EVENT_FRAME_HIDE: function () {
            state_1.STATE.TEMPFRAME.CLEAR();
        },
        EVENT_FRAME_MOVE_BEGIN: function () {
            state_1.STATE.TEMPFRAME.ADD(state_1.STATE.TEMPFRAME.MOVE_BEGIN);
        },
        EVENT_FRAME_MOVING: function () {
            state_1.STATE.TEMPFRAME.ADD(state_1.STATE.TEMPFRAME.MOVE_DOING);
        },
        EVENT_FRAME_MOVE_END: function () {
            state_1.STATE.TEMPFRAME.RemoveGroup("MOVE");
        },
        EVENT_FRAME_RESIZE_TRIGGERED: function () {
            state_1.STATE.TEMPFRAME.ADD(state_1.STATE.TEMPFRAME.RESIZE_TRIGGERED);
        },
        EVENT_FRAME_RESIZE_BEGIN: function () {
            state_1.STATE.TEMPFRAME.ADD(state_1.STATE.TEMPFRAME.RESIZE_BEGIN);
        },
        EVENT_FRAME_RESIZING: function () {
            state_1.STATE.TEMPFRAME.ADD(state_1.STATE.TEMPFRAME.RESIZE_DOING);
        },
        EVENT_FRAME_RESIZE_END: function () {
            state_1.STATE.TEMPFRAME.RemoveGroup("RESIZE");
        },
        EVENT_FRAME_AT_BUTTON: function () {
            state_1.STATE.TEMPFRAME.ADD(state_1.STATE.TEMPFRAME.AT_BUTTON);
        },
        EVENT_FRAME_OUT_BUTTON: function () {
            state_1.STATE.TEMPFRAME.DEL(state_1.STATE.TEMPFRAME.AT_BUTTON);
        },
        EVENT_MOUSE_LBTN_PRESSED: function () {
            state_1.STATE.MOUSE.ADD(state_1.STATE.MOUSE.LBTN_HOLDING);
        },
        EVENT_MOUSE_LBTN_RELEASED: function () {
            state_1.STATE.MOUSE.DEL(state_1.STATE.MOUSE.LBTN_HOLDING);
        },
        EVENT_FRAME_TOGGLE_FOLDBODY: function () {
            state_1.STATE.TEMPFRAME.SWITCH(state_1.STATE.TEMPFRAME.BTN_FOLDBODY);
        },
        EVENT_FRAME_TOGGLE_MINIMIZE: function () {
            state_1.STATE.TEMPFRAME.SWITCH(state_1.STATE.TEMPFRAME.BTN_MINIMIZE);
        },
        EVENT_FRAME_TOGGLE_TOOLS: function () {
            state_1.STATE.TEMPFRAME.SWITCH(state_1.STATE.TEMPFRAME.BTN_TOOLS);
        },
        EVENT_FRAME_TOGGLE_PINE: function () {
            state_1.STATE.TEMPFRAME.SWITCH(state_1.STATE.TEMPFRAME.BTN_PINE);
        },
    };
    root.registEvents = {
        EVENT_FRAME_DRAWING_TRIGGERED: root.EnableHostPointerEvent,
        EVENT_FRAME_DRAWING_STOPPED: root.DisableHostPointerEvent,
        EVENT_FRAME_RESIZE_TRIGGERED: root.EnableRootContainerFullScreen,
        EVENT_FRAME_MOVE_BEGIN: root.EnableRootContainerFullScreen,
        EVENT_FRAME_MOVE_END: root.DisableRootContainerFullScreen,
        EVENT_FRAME_RESIZE_END: root.DisableRootContainerFullScreen,
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
        EVENT_FRAME_MOUSE_HOVER: tempframe.OnMouseHover,
        EVENT_FRAME_RESIZING: tempframe.OnResizing,
        EVENT_FRAME_RESIZE_END: tempframe.OnResizeEnd,
        EVENT_FRAME_SAVE_AS: tempframe.OnSave,
        EVENT_FRAME_TOGGLE_FOLDBODY: tempframe.OnFoldBody,
        EVENT_FRAME_TOGGLE_MINIMIZE: tempframe.OnMinimize,
        EVENT_FRAME_TOGGLE_TOOLS: tempframe.OnOpenToolBox,
        EVENT_FRAME_TOGGLE_PINE: tempframe.OnPine,
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
exports.ISDEBUG = exports.assetsDir = exports.extensionId = exports.BTN_Red = exports.TempFrameHeaderHeight = exports.TempFrameFooterHeight = exports.CSSClass = exports.extensionBaseName = void 0;
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
    focus: "focus",
    fullScreen: "fullScreen",
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
    tempFrameHeaderSide: "tempFrameHeaderSide",
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
exports.BTN_Red = "#ff3333";
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
exports.EVENT_FRAME_SET_TITLE = exports.EVENT_FRAME_SAVE_AS = exports.EVENT_FRAME_TOGGLE_PINE = exports.EVENT_FRAME_TOGGLE_TOOLS = exports.EVENT_FRAME_TOGGLE_MINIMIZE = exports.EVENT_FRAME_TOGGLE_FOLDBODY = exports.EVENT_MOUSE_LBTN_RELEASED = exports.EVENT_MOUSE_LBTN_PRESSED = exports.EVENT_FRAME_OUT_BUTTON = exports.EVENT_FRAME_AT_BUTTON = exports.EVENT_FRAME_RESIZE_END = exports.EVENT_FRAME_RESIZING = exports.EVENT_FRAME_RESIZE_BEGIN = exports.EVENT_FRAME_RESIZE_TRIGGERED = exports.EVENT_FRAME_MOUSE_HOVER = exports.EVENT_FRAME_MOVE_END = exports.EVENT_FRAME_MOVING = exports.EVENT_FRAME_MOVE_BEGIN = exports.EVENT_FRAME_SHOW = exports.EVENT_FRAME_HIDE = exports.EVENT_INFOMATION = exports.EVENT_FRAME_DRAWING_FAIELD = exports.EVENT_FRAME_DRAWING_SUCCESS = exports.EVENT_FRAME_DRAWING_STOPPED = exports.EVENT_FRAME_DRAWING_MOVING = exports.EVENT_FRAME_DRAWING_SATRTED = exports.EVENT_FRAME_DRAWING_TRIGGERED = exports.EVENT_NO_MASK = exports.EVENT_NEED_MASK = exports.EVENT_TEMPFRAME_REMOVED = exports.EVENT_TEMPFRAME_APPENDED = void 0;
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
exports.EVENT_MOUSE_LBTN_PRESSED = "EVENT_MOUSE_LBTN_PRESSED";
exports.EVENT_MOUSE_LBTN_RELEASED = "EVENT_MOUSE_LBTN_RELEASED";
exports.EVENT_FRAME_TOGGLE_FOLDBODY = "EVENT_FRAME_TOGGLE_FOLDBODY";
exports.EVENT_FRAME_TOGGLE_MINIMIZE = "EVENT_FRAME_TOGGLE_MINIMIZE";
exports.EVENT_FRAME_TOGGLE_TOOLS = "EVENT_FRAME_TOGGLE_TOOLS";
exports.EVENT_FRAME_TOGGLE_PINE = "EVENT_FRAME_TOGGLE_PINE";
exports.EVENT_FRAME_SAVE_AS = "EVENT_FRAME_SAVE_AS";
exports.EVENT_FRAME_SET_TITLE = "EVENT_FRAME_SET_TITLE";
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
exports.RemoveChildren = exports.AppendChildren = exports.HasClass = exports.TargetIs = exports.shadowEl = exports.BHas = exports.setElStyle = exports.HideElementInShadowRoot = exports.ShowElementInShadowRoot = exports.consolelog = exports.Dispatch = exports.UninstallEvent = exports.InstallEvent = exports.MakeIconClass = exports.RemoveMaskFromBody = exports.AppendMaskToBody = exports.CursorAtEdge = exports.SwitchFixedToAbsolute = exports.SwitchAbsoluteToFixed = exports.SetElemetCenter = void 0;
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
    if (place === void 0) { place = window; }
    Object.keys(e).map(function (key) {
        place.addEventListener(key, function (x) {
            e[key.toString()](x);
        });
        if (!EventInstalledAt[key])
            EventInstalledAt[key] = new Set();
        EventInstalledAt[key].add(place);
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
    var filter = ["event"]; //["mouseup","mousemove",...Object.values(EVENTS)]
    if (constants_1.ISDEBUG) {
        if (filter.some(function (e) { return a.search(e) != -1; }))
            return;
        console.log((new Date()).toLocaleString() + "---" + a);
    }
}
exports.consolelog = consolelog;
function ShowElementInShadowRoot() {
    var elements = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        elements[_i] = arguments[_i];
    }
    exports.AppendChildren.apply(void 0, __spreadArray([core_1.CORE.ShadowRoot], elements, false));
}
exports.ShowElementInShadowRoot = ShowElementInShadowRoot;
function HideElementInShadowRoot() {
    var elements = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        elements[_i] = arguments[_i];
    }
    exports.RemoveChildren.apply(void 0, __spreadArray([core_1.CORE.ShadowRoot], elements, false));
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
    tempframeHeader: function (target) {
        return shadowEl("." + constants_1.CSSClass.tempFrameHeader) === target;
    },
    tempFrameHeaderMoveBar: function (target) {
        return target.classList.contains(constants_1.CSSClass.tempFrameHeaderMoveBar);
    },
    tempframeHeaderButtons: function (target) {
        var _a;
        return exports.TargetIs.tempframeHeader(((_a = target === null || target === void 0 ? void 0 : target.parentElement) === null || _a === void 0 ? void 0 : _a.parentElement) || null) && target.classList.contains(constants_1.CSSClass.button);
    },
    tempframeHeaderTitle: function (target) {
        return exports.TargetIs.tempframeHeader(target.parentElement) && target.classList.contains(constants_1.CSSClass.tempFrameHeaderButtons.title);
    },
    tempFrameFooter: function (target) {
        return shadowEl("." + constants_1.CSSClass.tempFrameFooter) == target;
    },
    tempframeFooterButtons: function (target) {
        return exports.TargetIs.tempFrameFooter(target.parentElement) && target.classList.contains(constants_1.CSSClass.button);
    },
};
var HasClass = function (e, s) {
    return e.className.indexOf(s) >= 0;
};
exports.HasClass = HasClass;
var AppendChildren = function (parent) {
    var children = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        children[_i - 1] = arguments[_i];
    }
    children.map(function (el) {
        if (!parent.contains(el))
            parent.appendChild(el);
    });
};
exports.AppendChildren = AppendChildren;
var RemoveChildren = function (parent) {
    var children = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        children[_i - 1] = arguments[_i];
    }
    children.map(function (el) {
        if (parent.contains(el))
            parent.removeChild(el);
    });
};
exports.RemoveChildren = RemoveChildren;
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
exports.styles_sheet.default[constants_1.CSSClass.button] = "\nbackground-size:100% 100%;\nbackground-repeat:no-repeat;\ntransition:all 200ms;\nwidth:20px;\nheight:20px;\n";
exports.styles_sheet.other[".".concat(constants_1.CSSClass.tempFrameHeaderSide, " > div,.").concat(constants_1.CSSClass.tempFrameFooter, " > div")] = "\nborder-radius: 4px;\npadding:3px;\n";
exports.styles_sheet.other[".".concat(constants_1.CSSClass.tempFrameHeaderSide, " > div:hover,.").concat(constants_1.CSSClass.tempFrameFooter, " > div:hover")] = "\nbox-shadow: 4px 4px 4px #494949;\n";
exports.styles_sheet.other[".".concat(constants_1.CSSClass.tempFrameHeaderSide, " > div:active, .").concat(constants_1.CSSClass.tempFrameFooter, " > div:active")] = "\nbackground-color: ".concat(constants_1.BTN_Red, ";\n");
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
//一个小方框
exports.styles_sheet.default[constants_1.CSSClass.divForBlockMouse] = "\nposition: absolute;\ntransform:translate(-50%,-50%);\nwidth: 20px;\nheight: 20px;\nborder:1px dotted;\ncursor:crosshair;\n";
exports.styles_sheet.default[constants_1.CSSClass.tempFrameHeaderMoveBar] = "\nposition: absolute;\nleft:50%;\ntop:3px;\nwidth:30%;\nmax-width:150px;\nheight:100%;\nmax-height:20px;\nbackground-color:white;\nopacity: 0.5;\nborder-radius:3px;\nbox-shadow: 1px 1px 1px;\ncursor:all-scroll;\ntransform:translate(-50%,0);\n";
exports.styles_sheet.default[constants_1.CSSClass.tempFrameContainer] = "\nwidth:100%;\nheight:100%;\ndisplay:grid;\ngrid-template-columns: 100%;\ngrid-template-rows: min-content auto min-content; \n";
exports.styles_sheet.default[constants_1.CSSClass.TempFrameComponent] = "\nposition:absolute;\nborder-radius: 4px;\nbox-shadow: 1px 1px 10px #000000b0;\noverflow:hidden;\nmin-height:".concat(constants_1.TempFrameHeaderHeight, "px;\n");
exports.styles_sheet.default[constants_1.CSSClass.tempFrameHeader] = "\ndisplay:grid;\nheight:".concat(constants_1.TempFrameHeaderHeight, "px;\nalign-items:center;\njustify-content: space-between;\ngrid-template-rows:").concat(constants_1.TempFrameHeaderHeight, "px;\ngrid-template-columns: min-content max-content min-content;\nbackground-image:linear-gradient(#a6e3f5,#81bae0);\n");
exports.styles_sheet.default[constants_1.CSSClass.tempFrameFooter] = "\nbackground-image:linear-gradient(#a6e3f5,#81bae0);\ndisplay:grid;\njustify-content: center;\nalign-items: center;\ngrid-gap: 2px;\ngrid-template-columns: repeat(auto-fit,30px);\nheight:".concat(constants_1.TempFrameFooterHeight, "px;\ngrid-template-rows:").concat(constants_1.TempFrameFooterHeight, "px;\n");
exports.styles_sheet.default[constants_1.CSSClass.ShadowRootContainer] = "\npointer-events:all;\n";
exports.styles_sheet.default[constants_1.CSSClass.transitionAll] = "\ntransition:all 100ms;\n";
exports.styles_sheet.default[constants_1.CSSClass.fullScreen] = "\nposition:absolute;\nwidth:100%;\nheight:100%;\nleft:0px;\ntop:0px;\n";
exports.styles_sheet.default[constants_1.CSSClass.tempFrameHeaderSide] = "\ndisplay: grid;\ngrid-template-rows:30px;\ngrid-template-columns: repeat(3,".concat(constants_1.TempFrameFooterHeight, "px);\nalign-items: center;\nheight:").concat(constants_1.TempFrameFooterHeight, "px;\ngrid-gap: 2px;\n");
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
var funcTools_1 = __webpack_require__(/*! ./utils/funcTools */ "./src/utils/funcTools.js");
console.log("injection 文件已经加载");
core_1.CORE.InstallStyles();
core_1.CORE.InstallDisptach();
core_1.CORE.InstallEvents();
chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    console.log(sender.tab ?
        "from a content script:" + sender.tab.url :
        "from the extension");
    if (message.EVENT == "EVENT_FRAME_DRAWING_TRIGGERED" && core_1.CORE.STATE.FRAME_DRAWING.IsBasicState()) {
        (0, funcTools_1.Dispatch)(message.EVENT);
    }
});
//# sourceMappingURL=injection.js.map
})();

/******/ })()
;
//# sourceMappingURL=injection.js.map