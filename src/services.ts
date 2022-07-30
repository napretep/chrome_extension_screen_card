import {DomEvent, EE, GenEELi, ICSSProp, ICustomElementEvent, ICustomEvent, ICustomMouseEvent, ICustomRectEvent, IEventEmitter, IRect, IService, newEE} from "./utils/interfaces";
import {AppendMaskToBody, consolelog, Dispatch, HideElementInShadowRoot, InstallEvent, RemoveMaskFromBody, ShowElementInShadowRoot, UninstallEvent,} from "./utils/funcTools";
import {CSSClass, TempFrameHeaderHeight} from "./utils/constants";
import {CORE} from "./core";
import {STATE as S} from "./state";
import * as E from "./utils/events"
import {TempFrameComponent} from "./components";
import {EVENT_FRAME_HIDE, EVENT_FRAME_RESIZE_BEGIN, EVENT_FRAME_RESIZE_END, EVENT_FRAME_RESIZE_TRIGGERED, EVENT_FRAME_RESIZING} from "./utils/events";

class BaseTempFrame {
    public zindex = 99999
}

export class MaskService implements IService {
    public blockActionMask = document.createElement("div")
    public registEvents = {}

    public constructor() {
        this.blockActionMask.classList.add(CSSClass.blockActionMask)
        this.InitMask()
    }

    public UpdateMaskGeometry = () => {
        this.blockActionMask.style.height = `${document.scrollingElement.scrollHeight}px`;
    }
    public InitMask = () => {
        this.blockActionMask.style.cssText = ""
        this.UpdateMaskGeometry()
    }
    public HideMask = (e) => {
        if (CORE.ShadowRoot.contains(this.blockActionMask)) {
            CORE.ShadowRoot.removeChild(this.blockActionMask)
        }
    }
    public ShowMask = (e: ICustomEvent) => {
        let styles: Partial<ICSSProp> = e.detail
        this.InitMask()
        if (!CORE.ShadowRoot.contains(this.blockActionMask)) {
            for (let name in styles) {
                this.blockActionMask.style[name] = styles[name]
            }
            CORE.ShadowRoot.appendChild(this.blockActionMask)
        }
    }
    public stop = () => {
        UninstallEvent(this.registEvents)
        CORE.MaskService = null
    }
}

export class TempFrameDrawingService extends BaseTempFrame implements IService {

    public selectionFrame = document.createElement("div")
    public divForBlockMouse = document.createElement("div")
    public mousedownPosition = [0, 0]//clientX,clientY
    public registEvents = {}

    public constructor() {
        super()
        this.divForBlockMouse.classList.add(CSSClass.divForBlockMouse)
        this.selectionFrame.classList.add(CSSClass.selectionFrameDiv)
        console.log("TempFrameDrawingService 初始化完成")
    }

    public OnDrawingFrameFailed = () => {
        this.HideElement()
        Dispatch(E.EVENT_NO_MASK)
    }
    public OnDrawingFrameTriggered = () => {
        Dispatch(E.EVENT_NEED_MASK, {zindex: this.zindex - 3, cursor: "crosshair"})
        Dispatch(E.EVENT_INFOMATION, {text: "开始截屏"})
        Dispatch(E.EVENT_FRAME_HIDE)
        this.HideElement()
    }
    public OnDrawingFrameStarted = (e: { detail: MouseEvent & DomEvent }) => {
        if (S.FRAME_DRAWING.HAS(S.FRAME_DRAWING.TRIGGERED)) {
            this.ShowElement()
            this.mousedownPosition = [e.detail.clientX, e.detail.clientY]
            this.UpdateBlockMouseDivPosition(e.detail)
            this.UpdateSelectionDivSize(e.detail)
        }
    }
    public OnDrawingFrameMoving = (e: ICustomMouseEvent) => {
        if (S.FRAME_DRAWING.HAS(S.FRAME_DRAWING.STARTED)) {
            this.UpdateBlockMouseDivPosition(e.detail)
            this.UpdateSelectionDivSize(e.detail)
        }
    }
    public OnDrawingFrameStopped = (e: ICustomMouseEvent) => {
        let er = this.selectionFrame.getBoundingClientRect()
        Dispatch(E.EVENT_FRAME_DRAWING_SUCCESS, {width: er.width, height: er.height, top: er.top, left: er.left})
        Dispatch(E.EVENT_NO_MASK)
        this.HideElement()
    }
    public HideElement = () => {
        HideElementInShadowRoot(this.selectionFrame)
        HideElementInShadowRoot(this.divForBlockMouse)
    }
    public ShowElement = () => {
        ShowElementInShadowRoot(this.selectionFrame)
        ShowElementInShadowRoot(this.divForBlockMouse)
    }
    public UpdateBlockMouseDivPosition = (e: MouseEvent) => {
        let [sX, sY] = [window.scrollX, window.scrollY]
        this.divForBlockMouse.style.left = (e.clientX + sX).toString() + "px";
        this.divForBlockMouse.style.top = (e.clientY + sY).toString() + "px";
    }
    public UpdateSelectionDivSize = (e: MouseEvent) => {
        console.assert(e.constructor == MouseEvent,
            "UpdateSelectionDivSize=(e:MouseEvent)=> 收到一个错误参数")
        let [x1, y1] = this.mousedownPosition
        let [x2, y2] = [e.clientX, e.clientY]
        let [sX, sY] = [window.scrollX, window.scrollY]
        let style = this.selectionFrame.style
        style.left = `${(Math.min(x1, x2) + sX)}px`
        style.top = `${(Math.min(y1, y2) + sY)}px`
        style.width = `${Math.abs(x2 - x1)}px`
        style.height = `${Math.abs(y2 - y1)}px`
        // console.log(x1,x2,sX)
    }

    public stop = () => {
        UninstallEvent(this.registEvents)
        CORE.TempFrameDrawingService = null
    }
}

export class InfomationService {

}

export class TempFrameService implements IService {
    public cursorAt = {
        LT: "nw-resize",
        LB: "sw-resize",
        RT: "ne-resize",
        RB: "se-resize",
        L: "w-resize",
        R: 'e-resize',
        T: "n-resize",
        B: "s-resize"
    }
    public resizeBegin = {
        cursor: {x: null, y: null},
        div: {left: null, top: null, width: null, height: null},
        direction: null
    }
    public registEvents = {}
    public state = {
        moving: {
            startmove: {x: null, y: null, left: null, top: null}
        }
    }
    public _TempFrame: TempFrameComponent = null
    public get TempFrame() {
        return this._TempFrame?.component ?? null
    }

    public constructor() {

    }

    public OnDrawingSuccess = (e: ICustomRectEvent) => {
        console.log(e.detail)
        this._TempFrame = new TempFrameComponent()
        this._TempFrame.UpdateGeometry(this._TempFrame.WrapFrameRect(e.detail))
        this.ShowElement()
        Dispatch(E.EVENT_FRAME_SHOW)
    }
    public OnMoveBegin = (e: { detail: MouseEvent & DomEvent }) => {
        this.TempFrame.classList.remove(CSSClass.transitionAll)
        this.state.moving.startmove = {
            x: e.detail.clientX, y: e.detail.clientY,
            left: this.TempFrame.getBoundingClientRect().left,
            top: this.TempFrame.getBoundingClientRect().top
        }
        console.log(`OnMoveBegin=`, this.state.moving.startmove)
    }
    public OnMove = (e: { detail: MouseEvent & DomEvent }) => {
        // this.TempFrame.classList.remove(CSSClass.transitionAll)
        let start = this.state.moving.startmove
        let rect: IRect = {
            left: start.left+(e.detail.clientX-start.x),
            top: start.top+(e.detail.clientY - start.y),
            width: null,
            height: null
        }
        console.log(`onmove  `,rect)
        this._TempFrame.UpdateGeometry(rect)
    }
    public OnMoveEnd = () => {
        this.TempFrame.classList.add(CSSClass.transitionAll)
    }
    public OnMouseHover = (e: { detail: MouseEvent & DomEvent }) => {

        let edge = this._TempFrame.AtEdge({x: e.detail.clientX, y: e.detail.clientY})

        if (edge) {
            document.body.style.cursor = this.cursorAt[edge]
            this.TempFrame.style.cursor = this.cursorAt[edge]
            this.resizeBegin = {
                cursor: {x: e.detail.clientX, y: e.detail.clientY},
                div: {
                    left: this.TempFrame.getBoundingClientRect().left,
                    top: this.TempFrame.getBoundingClientRect().top,
                    width: this.TempFrame.getBoundingClientRect().width,
                    height: this.TempFrame.getBoundingClientRect().height,
                },
                direction: edge
            }
            Dispatch(EVENT_FRAME_RESIZE_TRIGGERED)
        } else {
            Dispatch(EVENT_FRAME_RESIZE_END)
            this.InitStyle()
        }

    }
    public OnClosed = () => {

    }

    public OnResizing = (e: { detail: MouseEvent & DomEvent }) => {

        let [ex, ey] = [e.detail.clientX, e.detail.clientY]
        let [p, r, d] = [this.resizeBegin.cursor, this.resizeBegin.div, this.resizeBegin.direction]

        let rect: IRect = {left: null, top: null, width: null, height: null}
        rect.height = d.indexOf("B") >= 0 ? (r.height + (ey - p.y)) : r.height
        rect.width = d.indexOf("R") >= 0 ? (r.width + (ex - p.x)) : r.width

        rect.height = d.indexOf("T") >= 0 ? (r.height - (ey - p.y)) : rect.height
        rect.top = d.indexOf("T") >= 0 ? ((ey - p.y) + r.top) : r.top

        rect.width = d.indexOf("L") >= 0 ? (r.width - (ex - p.x)) : rect.width
        rect.left = d.indexOf("L") >= 0 ? ((ex - p.x) + r.left) : r.left

        this._TempFrame.UpdateGeometry(rect)

    }

    public OnResizeEnd = () => {
    }
    public OnMinimize = () => {

    }
    public OnFoldBody = (e: HTMLElement) => {
        if (S.TEMPFRAME.HAS(S.TEMPFRAME.BTN_FOLDBODY)) {
            this._TempFrame.UpdateGeometry({left: null, top: null, width: null, height: TempFrameHeaderHeight})
        }
    }
    public OnOpenToolBox = () => {

    }
    public OnPine = () => {
    }
    public OnSave = () => {

    }

    public OnHide = () => {
        this.HideElement()
    }
    public HideElement = () => {
        HideElementInShadowRoot(this.TempFrame)
    }
    public ShowElement = () => {
        ShowElementInShadowRoot(this.TempFrame)
    }
    public InitStyle = () => {
        this.TempFrame.style.cursor = ""
        document.body.style.cursor = ""

    }
}

export class CardFrameService {
}

export class CardLibService {

}

export class ShadowRootService extends BaseTempFrame implements IService {
    public registEvents = {}
    public host = document.createElement("div")
    public dom: ShadowRoot
    public root: HTMLElement = document.createElement("div")

    public constructor() {
        super()
        this.SetupHost()

    }

    public SetupHost = () => {
        this.host.classList.add(CSSClass.ShadowRootHost) //root 全屏, 不接受点击操作
        document.body.appendChild(this.host)
        this.dom = this.host.attachShadow({mode: "open"})
        this.dom.appendChild(this.root)
        this.root.classList.add(CSSClass.ShadowRootContainer)
    }

    public stop = () => {

    }
    public UpdateHostGeometry = () => {
        this.host.style.height = `${document.scrollingElement.scrollHeight}px`
    }
    public EnableHostPointerEvent = () => {
        this.host.style.pointerEvents = "all"
    }
    public DisableHostPointerEvent = () => {
        this.host.style.pointerEvents = "none"
    }
    public EnableRootContainerFullScreen = () => {
        this.root.classList.add(CSSClass.fullScreen)
        consolelog("EnableRootContainerFullScreen")
    }
    public DisableRootContainerFullScreen = () => {
        this.root.classList.remove(CSSClass.fullScreen)
        consolelog("DisableRootContainerFullScreen")
    }
}


export class StateService implements IService {
    public registEvents = {}
}