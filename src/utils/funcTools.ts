import {assetsDir, CSSClass, extensionBaseName, ISDEBUG} from "./constants";
import {IEventEmitter, ICSSProp, EventEmitter, Point2d, Style, InstalledEvent} from "./interfaces";
import {CORE}from "../core"
import * as EVENTS from "./events"
import * as Events from "events";
export function SetElemetCenter(element: HTMLElement,x:number,y:number)
{

}

export function SwitchAbsoluteToFixed(element: HTMLElement){

}

export function SwitchFixedToAbsolute(element: HTMLElement){

}
export function CursorAtEdge(element: HTMLElement,event:MouseEvent){
    let top = element.getBoundingClientRect().top

}

export function AppendMaskToBody(zindex:number,styles:Partial<ICSSProp>={}){
    consolelog("AppendMaskToBody 调用")
    if(!CORE.ShadowRoot.querySelector("."+CSSClass.blockActionMask)) {
        consolelog("AppendMaskToBody !CORE.ShadowRoot.querySelector(\".\"+CSSClass.blockActionMask)) 调用")
        let blockActionMask = document.createElement("div");
        blockActionMask.style.height=`${document.scrollingElement.scrollHeight}px`;
        blockActionMask.classList.add(CSSClass.blockActionMask)
        blockActionMask.style.zIndex=`${zindex}`;
        for(let name in styles){
            blockActionMask.style[name]=styles[name]
        }
        CORE.ShadowRoot.appendChild(blockActionMask)
    }
}

export function RemoveMaskFromBody(){
    if(CORE.ShadowRoot.querySelector(`.${extensionBaseName}-masklayer`))
        CORE.ShadowRoot.removeChild(document.querySelector(`.${extensionBaseName}-masklayer`))
}

export function MakeIconClass(IconNameList):{}{

    let buttongroup = {}
        for(let  keyname in IconNameList){
        let iconpath = chrome.runtime.getURL(`${assetsDir}/${keyname}.png`)
            buttongroup[keyname]=`background-image:url(${iconpath})`
         }
            return buttongroup
}

let EventInstalledAt:InstalledEvent={}
/**
 * 根据地址注册事件, 并且会记录所在位置, 方便后续的卸载与分发事件
 * */
export function InstallEvent(e:EventEmitter,place:HTMLElement=document.body){

    Object.keys(e).map(
        (key)=>{
         place.addEventListener(key,(x)=>{
                 e[key](x)
                 consolelog(`from event = ${key}, emitter=${e[key]}`)

            }
         )
            if(!EventInstalledAt[key])EventInstalledAt[key]=new Set()
            EventInstalledAt[key].add(place)
            consolelog(`installed event ${key}, emitter = ${e[key]}`)
     }
    )
}
export function UninstallEvent(e:EventEmitter){
    Object.keys(e).map((key)=>{
        EventInstalledAt[key].forEach((place:HTMLElement)=>{
            place.removeEventListener(key,e[key])
        })
    })
}


/**
 * 事件分发会自动根据事件在何处注册进行分发.
 * */
export function Dispatch(eventName:string,detail=null,place:HTMLElement=null){
    consolelog(`dispatch event: ${eventName}`)
    if(EventInstalledAt[eventName] && EventInstalledAt[eventName].size>0){
        EventInstalledAt[eventName].forEach((place:HTMLElement)=>{
            place.dispatchEvent(new CustomEvent(eventName,{detail:detail}))
        })
    }
    else{
        console.error(eventName+" 该事件没有在任何元素上注册!")
    }

}

export function consolelog(a:string){
    let filter =["mouseup","mousemove",...Object.values(EVENTS)]

    if (ISDEBUG ) {
        if (filter.some((e)=>a.search(e)!=-1)) return
        console.log(a)
    }
}


export function ShowElementInShadowRoot(element:HTMLElement){
    if(!CORE.ShadowRoot.contains(element)) CORE.ShadowRoot.appendChild(element)
}
export function HideElementInShadowRoot(element:HTMLElement){
    if(CORE.ShadowRoot.contains(element)) CORE.ShadowRoot.removeChild(element)
}

export function setElStyle(element:HTMLElement,style:Style){
    let elStyle = element.style
    for(let key in style) {
        elStyle[key] = style[key]
    }
}
/**
 * 位比较
 * */
export function BHas(A:number,B:number):boolean{
    return (A&B) === B
}

export function shadowEl(selector:string){
    return CORE.ShadowRoot.querySelector(selector)
}

export const TargetIs= {
    tempframe:null,
    tempframeComponent:null,
    tempframeContainer:null,
    tempframeHeader:(target:HTMLElement)=>{ return shadowEl("."+CSSClass.tempFrameHeader)==target },
    tempframeHeaderButtons:(target:HTMLElement)=>{
        return TargetIs.tempframeHeader(target.parentElement)&&target.classList.contains(CSSClass.button)
    },
    tempFrameFooter: (target:HTMLElement)=>{ return shadowEl("."+CSSClass.tempFrameFooter)==target },
    tempframeFooterButtons:(target:HTMLElement)=>{
        return TargetIs.tempFrameFooter(target.parentElement)&&target.classList.contains(CSSClass.button)
    },
}