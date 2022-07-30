/**
 * 组件是可以复用的html+css, 只是缺少交互功能, 交互由service实现
 * */
import {IComponent, IRect, Point2d, Style} from "./utils/interfaces";
import {TempFrameContainer} from "./utils/classes"
import {CSSClass, TempFrameFooterHeight, TempFrameHeaderHeight} from "./utils/constants";
import {setElStyle} from "./utils/funcTools";
import { Component } from './components';

export class Component implements IComponent {
    public component: HTMLElement = document.createElement("div")
    public AdjustRect = (elRect: IRect) => {
        for (let key in elRect) {
            elRect[key] = elRect[key] ? elRect[key] + this.component.getBoundingClientRect()[key] : elRect[key]
        }
        return elRect
    }
    public UpdateGeometry = (elRect: IRect) => {
        let r2: Style = {}
        if (this.IsAbsolutePosition) {
            elRect.left ? elRect.left += window.scrollX : null
            elRect.top ? elRect.top += window.scrollY : null
        }

        for (let key in elRect) {
            if (elRect[key]) r2[key] = `${elRect[key]}px`
        }
        setElStyle(this.component, r2)
    }
    public get IsAbsolutePosition() {
        let p = window.getComputedStyle(this.component).position
        return p ? p == "absolute" : true
    }
}

export class TempFrameComponent extends Component {
    public _container: TempFrameContainer = new TempFrameContainer()
    public get container() {
        return this._container.element
    }

    public constructor() {
        super();
        this.component.appendChild(this.container)
        this.component.classList.add(CSSClass.TempFrameComponent, CSSClass.transitionAll)
    }

    public AdjustRect = (elRect: IRect) => {
        for (let key in elRect) {
            elRect[key] = elRect[key] ? elRect[key] + this.component.getBoundingClientRect()[key] : elRect[key]
        }
        return elRect
    }
    public UpdateGeometry = (elRect: IRect) => {
        let r2: Style = {}
        if (this.IsAbsolutePosition) {
            elRect.left ? elRect.left += window.scrollX : null
            elRect.top ? elRect.top += window.scrollY : null
        }

        for (let key in elRect) {
            if (elRect[key]) r2[key] = `${elRect[key]}px`
        }
        setElStyle(this.component, r2)
    }

    public get IsAbsolutePosition() {
        let p = window.getComputedStyle(this.component).position
        return p ? p == "absolute" : true
    }

    public WrapFrameRect(elRect: IRect) {

        let headerHeight = this._container.headerHeight > 0 ? this._container.headerHeight : TempFrameHeaderHeight
        let footerHeight = this._container.footerHeight > 0 ? this._container.footerHeight : TempFrameFooterHeight
        let rect: IRect = {
            left: elRect.left,
            top: elRect.top - headerHeight,
            width: elRect.width,
            height: elRect.height + headerHeight + footerHeight
        }
        return rect
    }

    public AtEdge(p: Point2d, edgeSense = 5): string | undefined | null {
        let c1 = [p.x, p.x, p.y, p.y]
        let rect = this.component.getBoundingClientRect()
        let r1 = [rect.left, rect.right, rect.top, rect.bottom]
        let dirChar = ["L", "R", "T", "B"]
        let events = [0, 1, 2, 3].map((idx) => {
            let [idx2, idx3] = [(Math.floor(idx / 2) + 1) * 2 % 4, (Math.floor(idx / 2) + 1) * 2 % 4 + 1]
            return [Math.abs(c1[idx] - r1[idx]) <= edgeSense
            && r1[idx2] - edgeSense <= c1[idx2] && c1[idx2] <= r1[idx3] + edgeSense,
                dirChar[idx]]
        })
        return events.filter((value, index) => {
            return value[0]
        }).reduce((sum, next) => {
            return sum + next[1]
        }, "")
    }

    public HideFooter = () => {
        if (this._container.footerHeight > 0) {
            this.UpdateGeometry(this.AdjustRect({top: null, left: null, width: null, height: -TempFrameHeaderHeight}))
            this._container.footerHeight = 0
        }
    }

    public ShowFooter = () => {
        if (this._container.footerHeight == 0) {
            this._container.footerHeight = TempFrameHeaderHeight
            this.UpdateGeometry(this.AdjustRect({top: null, left: null, width: null, height: TempFrameHeaderHeight}))
        }
    }

    public Pine=()=>{
        if (this.IsAbsolutePosition) this.component.style.position="fixed"
        else this.component.style.position="absolute"
    }
}


export class MinimizedFrameComponent extends Component{
    public _MinimizedContainer:HTMLElement
    public RecorverToFrame:()=>Component
    public LoadFrame:(c:Component)=>void
    
}