import {assetsDir, CSSClass, extensionBaseName, ISDEBUG} from "./constants";
import {IEventEmitter, ICSSProp, EventEmitter, Point2d, Style, InstalledEvent, ExtendEventName, IAddEventListner} from "./interfaces";
import {CORE} from "../core"

export function SetElemetCenter(element: HTMLElement, x: number, y: number) {

}

export function SwitchAbsoluteToFixed(element: HTMLElement) {

}

export function SwitchFixedToAbsolute(element: HTMLElement) {

}

export function CursorAtEdge(element: HTMLElement, event: MouseEvent) {
    let top = element.getBoundingClientRect().top

}

export function MakeIconClass(IconNameList): {} {

    let buttongroup = {}
    for (let keyname in IconNameList) {
        let iconpath = chrome.runtime.getURL(`${assetsDir}/${keyname}.png`)
        buttongroup[keyname] = `background-image:url(${iconpath})`
    }
    return buttongroup
}

let EventInstalledAt: InstalledEvent = {}

/**
 * 根据地址注册事件, 并且会记录所在位置, 方便后续的卸载与分发事件
 * */
export function InstallEvent(e: EventEmitter, place: { addEventListener: IAddEventListner } = window) {

    Object.keys(e).map(
        (key: keyof ExtendEventName) => {
            place.addEventListener(key, (x) => {
                    e[key.toString()](x)
                }
            )
            if (!EventInstalledAt[key]) EventInstalledAt[key] = new Set()
            EventInstalledAt[key].add(place)
        }
    )
}

export function UninstallEvent(e: EventEmitter) {
    Object.keys(e).map((key) => {
        EventInstalledAt[key].forEach((place: HTMLElement) => {
            place.removeEventListener(key, e[key])
        })
    })
}


/**
 * 事件分发会自动根据事件在何处注册进行分发.
 * */
export function Dispatch(eventName: string, detail = null, place: HTMLElement = null) {
    consolelog(`dispatch event: ${eventName}`)
    if (EventInstalledAt[eventName] && EventInstalledAt[eventName].size > 0) {
        EventInstalledAt[eventName].forEach((place: HTMLElement) => {
            place.dispatchEvent(new CustomEvent(eventName, {detail: detail}))
        })
    } else {
        console.error(eventName + " 该事件没有在任何元素上注册!")
    }

}

export function consolelog(a: string) {
    let filter = ["event"]//["mouseup","mousemove",...Object.values(EVENTS)]

    if (ISDEBUG) {
        if (filter.some((e) => a.search(e) != -1)) return

        console.log((new Date()).toLocaleString() + "---" + a)
    }
}


export function ShowElementInShadowRoot(...elements: HTMLElement[]) {
    AppendChildren(CORE.ShadowRoot, ...elements)
}

export function HideElementInShadowRoot(...elements: HTMLElement[]) {
    RemoveChildren(CORE.ShadowRoot, ...elements)
}

export function setElStyle(element: HTMLElement, style: Style) {
    let elStyle = element.style
    for (let key in style) {
        elStyle[key] = style[key]
    }
}

/**
 * 位比较
 * */
export function BHas(A: number, B: number): boolean {
    return (A & B) === B
}

export function shadowEl(selector: string) {
    return CORE.ShadowRoot.querySelector(selector)
}

export const TargetIs = {
    tempframe: null,
    tempframeComponent: null,
    tempframeContainer: null,
    tempframeHeader: (target: HTMLElement) => {
        return shadowEl("." + CSSClass.tempFrameHeader) === target
    },
    tempFrameHeaderMoveBar: (target: HTMLElement) => {
        return target.classList.contains(CSSClass.tempFrameHeaderMoveBar)
    },
    tempframeHeaderButtons: (target: HTMLElement) => {
        return TargetIs.tempframeHeader(target?.parentElement?.parentElement||null) && target.classList.contains(CSSClass.button)
    },
    tempframeHeaderTitle: (target: HTMLElement) => {
        return TargetIs.tempframeHeader(target.parentElement) && target.classList.contains(CSSClass.tempFrameHeaderButtons.title)
    },
    tempFrameFooter: (target: HTMLElement) => {
        return shadowEl("." + CSSClass.tempFrameFooter) == target
    },
    tempframeFooterButtons: (target: HTMLElement) => {
        return TargetIs.tempFrameFooter(target.parentElement) && target.classList.contains(CSSClass.button)
    },
}

export const HasClass = (e: HTMLElement, s: string) => {
    return e.className.indexOf(s) >= 0
}

export const AppendChildren = (parent: Element, ...children: HTMLElement[]) => {
    children.map((el) => {
        if (!parent.contains(el)) parent.appendChild(el)
    })
}

export const RemoveChildren = (parent: Element, ...children: HTMLElement[]) => {
    children.map((el) => {
        if (parent.contains(el)) parent.removeChild(el)
    })
}