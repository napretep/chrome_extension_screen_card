import * as EVENTS from "./events"

export type ExtendEventName = DocumentEventMap & {
    [prop in keyof typeof EVENTS]: Event;
};

export interface IEventEmitter {
    EventName:keyof ExtendEventName
    Emitter:EventListenerOrEventListenerObject
}

export interface AnyFunc{
    (key:any):void
}

export interface IAddEventListner{
    (event:keyof ExtendEventName,listener:AnyFunc):void
}
export type EventEmitter = {
    [prop in keyof ExtendEventName]?: EventListenerOrEventListenerObject
}

export type UserAction ={
    AtBody?:EventEmitter,
    AtShadowRoot?:EventEmitter
}

export class EE implements IEventEmitter{
    public EventName
    public Emitter
    constructor(eventName:string,emitter:EventListenerOrEventListenerObject) {
        this.EventName = eventName
        this.Emitter = emitter
    }
}
export function newEE(eventName:string,emitter:EventListenerOrEventListenerObject){
    return new EE(eventName,emitter)
}
/**
 * GenNewEELi 即创建 EventEmitter类型的列表
 * */
export function GenEELi(EELi:EventEmitter)
{
    return Object.keys(EELi).map((key)=>newEE(key,EELi[key]))
}

export type Point2d={
    x:number,
    y:number
}
export interface IRect {
    left:number,
    top:number,
    width:number,
    height:number
}
export type Style = {
    [prop in keyof CSSStyleDeclaration]?:string
}

export interface IService{
    registEvents:EventEmitter
}
export interface ICustomEvent extends Event{
    detail
}
export interface ICustomMouseEvent extends ICustomEvent{
    detail:MouseEvent
}

export interface ICustomElementEvent extends ICustomEvent{
    detail:HTMLElement
}

export interface ICustomRectEvent extends ICustomEvent{
    detail:IRect
}
export type DomEvent ={
    target:HTMLElement
}


export interface IComponent{
     component:HTMLElement
}

export type InstalledEvent = {
    [key:string]:Set<{addEventListener:IAddEventListner}>
}

export interface ICSSProp {
    backgroundColor:string
    cursor:string
    backgroundImage:string
    width:string
    height:string
    left:string
    top:string
    position:string
    grid:string
    color:string
    display:string
}

export interface IState{
    STATE:Set<string>
    EMPTY:number
}


export type ConflictFlag=Set<string>[]
