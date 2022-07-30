import {
    EVENT_TEMPFRAME_APPENDED,
    EVENT_TEMPFRAME_REMOVED,
    EVENT_NEED_MASK,
    EVENT_NO_MASK
}  from "./events"

import {extensionBaseName, CSSClass, assetsDir} from "./constants";
import {RemoveMaskFromBody, AppendMaskToBody, InstallEvent, UninstallEvent, Dispatch, AppendChildren} from "./funcTools";
import {EE, IEventEmitter,IRect} from "./interfaces";
import {STATE} from "../state";
import {CORE} from "../core"
import {keyBy} from "lodash";

export  function Singleton<T>(){
    class Singleton{
        protected constructor() {
        }
        private static _Instance:Singleton = null;
        public static get Instance():T{
            if(Singleton._Instance==null){
                Singleton._Instance=new this()
            }
            return Singleton._Instance as T
        }
    }
    return Singleton
}


class BaseTempFrame{
    public zindex=99999
}

//
// export class TempFrame extends BaseTempFrame{
//     public unique=true
//     public moveEvent ={
//         begin:false,
//         start:{
//             cursorX:null,
//             cursorY:null,
//             containerLeft:null,
//             containerTop:null,
//             correctionX:null,
//             correctionY:null
//         },
//     }
//     public resizeEvent ={
//         begin:false,
//         start:{
//             cursorX:null,
//             cursorY:null,
//             divLeft:null,
//             divTop:null,
//             divWidth:null,
//             divHeight:null,
//         },
//         at:{
//             LT:"nw-resize",
//             LB:"sw-resize",
//             RT:"ne-resize",
//             RB:"se-resize",
//             L:"w-resize",
//             R:'e-resize',
//             T:"n-resize",
//             B:"s-resize"
//         },
//         direction:null
//     }
//     /**
//      * container
//      *  - header
//      *      - buttongroup
//      *  - body
//      *      - frame
//      *  - footer
//      *      -buttongroup
//      *
//      * */
//     public container=new TempFrameContainer()
//     public header=new TempFrameHeader()
//     public footer=new TempFrameFooter()
//     public body =new TempFrameBody()
//     public frame = document.createElement("div")
//     // public
//     /**
//      * @param elm {HTMLElement} 不管是什么定位的, 输出转为固定定位
//      * */
//     public constructor(elm: HTMLElement) {
//         super()
//         this.frame.style.border=elm.style.border
//         this.frame.classList.add(extensionBaseName+"-tempframe-body")
//
//         this.container.SetCSSText(`
//         position:absolute;
//         display:grid;
//         z-index:${this.zindex};
//         grid-template-columns: auto;
//         grid-template-rows: ${this.header.height}px  auto  ${this.footer.height}px;
//         width: ${elm.style.width};
//         height:calc(${elm.style.height} + ${this.footer.height}px + ${this.header.height}px);
//         top:calc(${elm.style.top} - ${this.header.height}px);
//         left:calc(${elm.style.left});
//         box-shadow:5px 4px 5px 0px;
//         `)
//
//         this.container.element.appendChild(this.header.element)
//         this.container.element.appendChild(this.body.element)
//         this.container.element.appendChild(this.footer.element)
//         console.log("TempFrame 创建成功")
//         this.header.InitAll()
//         this.InitEvent()
//         this.HideHeaderFooter()
//         this.AppendToDom()
//     }
//     public HideHeaderFooter(){
//         this.header.element.hidden=true
//         this.header.element.hidden=true
//     }
//     public ShowHeaderFooter(){
//         this.header.element.hidden=true
//         this.header.element.hidden=true
//     }
//     public AppendToDom(){
//         CORE.ShadowRoot.appendChild(this.container.element)
//         Dispatch(EVENT_TEMPFRAME_APPENDED,{obj:this})
//     }
//     public RemoveFromDom(){
//         CORE.ShadowRoot.removeChild(this.container.element)
//         Dispatch(EVENT_TEMPFRAME_REMOVED)
//     }
//     public UpdateContainer(){
//         // let rect = this.body.getBoundingClientRect()
//         // let style = this.container.element.style
//         // // style.left = rect.left.toString()+"px"
//         // // style.top = (rect.top-this.header.height).toString()+"px"
//         // style.width = rect.width.toString()+"px"
//         // style.height = (rect.height+this.header.height+this.footer.height).toString()+"px"
//     }
//     public InitEvent(){
//         this.InitMoveEvent()
//         this.InitShowHeaderFooterEvent()
//         // this.InitResizeEvent()
//     }
//     public InitShowHeaderFooterEvent(){
//         // this.body.addEventListener("mouseenter",(e)=>{
//         //     this.ShowHeaderFooter()
//         // })
//         this.container.element.addEventListener("mouseleave",(e)=>{
//             this.HideHeaderFooter()
//         })
//     }
//     // public InitResizeEvent(){
//     //     let edgeSense = 5
//     //     document.addEventListener("mousemove",(e)=>{
//     //
//     //         if(!this.resizeEvent.begin){
//     //             let c1 = [e.clientX,e.clientX,e.clientY,e.clientY]
//     //             let [cx,cy] = [e.clientX,e.clientY]
//     //             let rect = this.body.getBoundingClientRect()
//     //             let r1 =  [rect.left,rect.right,rect.top,rect.bottom]
//     //             let dirChar = ["L","R","T","B"]
//     //             let events = [0,1,2,3].map((idx)=>{
//     //                 let [idx2,idx3] =[ (Math.floor(idx/2)+1)*2%4, (Math.floor(idx/2)+1)*2%4+1]
//     //                 return [ Math.abs(c1[idx]-r1[idx])<=edgeSense && r1[idx2]-edgeSense <=c1[idx2]&&c1[idx2]<=r1[idx3]+edgeSense,dirChar[idx]]
//     //             })
//     //             this.resizeEvent.direction = events.filter((value,index)=>{
//     //                 return value[0]
//     //             }).reduce((sum,next)=>{ return sum+next[1]},"")
//     //             document.body.style.cursor=this.resizeEvent.direction?this.resizeEvent.at[this.resizeEvent.direction]:""
//     //         }
//     //         else{
//     //             let [sx,sy] = [window.scrollX,window.scrollY]
//     //             let [container,div,result,start,x,y] = [this.container.element,this.body,this.resizeEvent.direction,this.resizeEvent.start,e.clientX,e.clientY]
//     //             div.style.height =result.indexOf("B")>=0? (start.divHeight+y-start.cursorY).toString()+"px":div.style.height
//     //             div.style.width = result.indexOf("R")>=0? (start.divWidth+x-start.cursorX).toString()+"px":div.style.width
//     //             div.style.height =result.indexOf("T")>=0? (start.divHeight-(y-start.cursorY)).toString()+"px":div.style.height
//     //             container.style.top = result.indexOf("T")>=0? (sy+start.divTop+(y-start.cursorY)).toString()+"px":container.style.top
//     //             div.style.width = result.indexOf("L")>=0? (start.divWidth-(x-start.cursorX)).toString()+"px":div.style.width
//     //             container.style.left = result.indexOf("L")>=0? (sx+start.divLeft+x-start.cursorX).toString()+"px":container.style.left
//     //             this.UpdateContainer()
//     //         }
//     //     })
//     //     document.addEventListener("mousedown",(e)=>{
//     //         console.log(e.target)
//     //         if (this.resizeEvent.direction){
//     //             this.resizeEvent.begin=true
//     //             let rect = this.body.getBoundingClientRect()
//     //             this.resizeEvent.start={
//     //                 cursorX: e.clientX,
//     //                 cursorY: e.clientY,
//     //                 divHeight: rect.height,
//     //                 divWidth: rect.width,
//     //                 divLeft: this.container.element.getBoundingClientRect().left,
//     //                 divTop:this.container.element.getBoundingClientRect().top,
//     //             }
//     //             Dispatch(EVENT_NEED_MASK,{zindex:this.zindex})
//     //         }
//     //     })
//     //     document.addEventListener("mouseup",(e)=>{
//     //         this.resizeEvent.begin=false
//     //         document.dispatchEvent(new CustomEvent(EVENT_NO_MASK,{detail:{zindex:this.zindex}}))
//     //     })
//     // }
//     public InitMoveEvent(){
//         let bar = this.header.moveBar
//         let h =  this.header
//         bar.addEventListener("mousedown",(e)=>{
//             this.moveEvent.begin = true
//             let start = this.moveEvent.start
//             let CRect = this.container.element.getBoundingClientRect()
//             start.correctionX = e.clientX-this.container.element.offsetLeft
//             start.correctionY = e.clientY-this.container.element.offsetTop
//             start.containerLeft = this.container.element.offsetLeft
//             start.containerTop = this.container.element.offsetTop
//             start.cursorX = e.clientX
//             start.cursorY = e.clientY
//             document.dispatchEvent(new CustomEvent(EVENT_NEED_MASK,{detail:{zindex:this.zindex}}))
//         })
//         document.body.addEventListener("mousemove",(e)=>{
//             if(this.moveEvent.begin ){
//                 let start = this.moveEvent.start
//                 let [sx,sy] = [window.scrollX,window.scrollY]
//                 let [cx,cy] = [this.moveEvent.start.correctionX,this.moveEvent.start.correctionY]
//                 let newLeft =  e.clientX - (start.cursorX - start.containerLeft)
//                 let newRight =  e.clientY - (start.cursorY - start.containerTop)
//                 this.container.element.style.left = newLeft.toString()+"px";
//                 this.container.element.style.top = newRight.toString()+"px";
//             }
//         })
//         document.body.addEventListener("mouseup",(e)=>{
//             this.moveEvent.begin=false
//             document.dispatchEvent(new CustomEvent(EVENT_NO_MASK,{detail:{zindex:this.zindex}}))
//         })
//     }
// }
interface ButtonGroup {
  [key: string]: HTMLElement;
}
class TempFrameBaseElement{
    public height:number = 20
    public backgroundColor = "background-image:linear-gradient(#34adff,#0083e2)"
    public element:HTMLElement=document.createElement("div")
    public constructor(classname:string) {
        this.element.classList.add(classname)
    }
    public SetCSSText=(cssText:string)=>{
        this.element.style.cssText=cssText
    }
}

class TempFrameHeader extends TempFrameBaseElement{
    public height:number = 24
    public children={
        left:document.createElement("div"),
        center: document.createElement("div"),
        right:document.createElement("div"),
        moveBar:document.createElement("div"),
    }
    // public buttonDir = [`${assetsDir}/save.png`]
    public leftButtonGroup = ["save","fixed","toolbox"]
    public rightButtonGroup = ["foldbody","minimize","close"]
    public constructor() {
        super(CSSClass.tempFrameHeader);
        this.InitAll()
    }
    public InitAll=()=>{
        this.InitSelf()
        this.InitMoveBar()
        this.InitButton(this.children.left,this.leftButtonGroup)
        this.InitCenter()
        this.InitButton(this.children.right,this.rightButtonGroup)
    }
    public InitSelf=()=>{
        AppendChildren(this.element,...Object.values(this.children))
    }
    public InitCenter=()=>{
        this.children.center.classList.add(CSSClass.tempFrameHeaderButtons.title)
    }
    public InitButton=(el:HTMLElement,LR:string[])=>{
        LR.map(
            (btnName)=>{
                let div = document.createElement("div")
                div.classList.add("icon"+"-"+btnName)
                div.style.backgroundImage =chrome.runtime.getURL(`assets/${btnName}.png`);
                    console.log( chrome.runtime.getURL(`assets/${btnName}.png`))
                    div.classList.add(CSSClass.button)
                el.appendChild(div)
            }
        )
        el.classList.add(CSSClass.tempFrameHeaderSide)
    }
    public InitMoveBar=()=>{
        this.children.moveBar.classList.add(CSSClass.tempFrameHeaderMoveBar,CSSClass.transitionAll)
    }

}

class TempFrameFooter extends TempFrameBaseElement{
    // public buttonGroup=[""]
    public buttonGroup:ButtonGroup={}//key为buttonname,value是对应的HTMLElement
    public constructor() {
        super(CSSClass.tempFrameFooter);
        // this.element.style.backgroundColor = "#34adff"
        let tffb = CSSClass.tempFrameFooterButtons
        for(let name in CSSClass.tempFrameFooterButtons){
            let div = document.createElement("div")
            div.classList.add("icon-"+name,CSSClass.button)
            this.buttonGroup[name]=div
            this.element.appendChild(div)
        }

    }
}

class TempFrameBody extends TempFrameBaseElement{
    public frame:HTMLElement=document.createElement('div')
    public constructor() {
        super(CSSClass.tempFrameBody)
        this.element.appendChild(this.frame)
        this.frame.classList.add(CSSClass.tempFrame)
    }

}
export class TempFrameContainer extends TempFrameBaseElement{
    public _header = new TempFrameHeader()
    public _body = new TempFrameBody()
    public _footer = new TempFrameFooter();
    public get header(){
        return this._header.element
    }
    public get body(){
        return this._body.element
    }
    public get footer() {
        return this._footer.element
    }
    public constructor() {
        super(CSSClass.tempFrameContainer);
        ([this.header, this.body, this.footer]).map((e) => {
            this.element.appendChild(e)
        })
    }
    public get headerHeight(){
        return this.header.getBoundingClientRect().height
    }
    public get footerHeight(){
        return this.footer.getBoundingClientRect().height
    }
    public UpdateFrame=(value:HTMLElement)=>{

    }
}


