/**
 * 组件是可以复用的html+css, 只是缺少交互功能, 交互由service实现
 * */
import {IComponent, IRect, Point2d, Style} from "./utils/interfaces";
import {TempFrameContainer} from "./utils/classes"
import {CSSClass, TempFrameFooterHeight, TempFrameHeaderHeight} from "./utils/constants";
import {setElStyle} from "./utils/funcTools";
class Component implements IComponent{
    public component: HTMLElement = document.createElement("div")
}

export class TempFrameComponent extends Component{
    private _container:TempFrameContainer = new TempFrameContainer()
    public get container(){
        return this._container.element
    }
    public constructor() {
        super();
        this.component.appendChild(this.container)
        this.component.classList.add(CSSClass.TempFrameComponent,CSSClass.transitionAll)
    }
    public UpdateGeometry=(el:IRect)=>{
        // let r = this.WrapFrameRect(el)
        let r2:Style = {}
        for(let key in el){
            if (el[key])r2[key]=`${el[key]}px`
        }
        setElStyle(this.component,r2)
    }

    public WrapFrameRect(elRect:IRect){

        let headerHeight = this._container.headerHeight>0?this._container.headerHeight:TempFrameHeaderHeight
        let footerHeight = this._container.footerHeight>0?this._container.footerHeight:TempFrameFooterHeight
        let rect:IRect ={
            left: window.scrollX + elRect.left,
            top:window.scrollY+elRect.top-headerHeight,
            width:elRect.width,
            height:elRect.height+headerHeight+footerHeight
        }
        return rect
    }

    public AtEdge(p:Point2d,edgeSense=5):string|undefined|null{
        let c1 = [p.x,p.x,p.y,p.y]
        let rect = this.component.getBoundingClientRect()
        let r1 =  [rect.left,rect.right,rect.top,rect.bottom]
        let dirChar = ["L","R","T","B"]
        let events = [0,1,2,3].map((idx)=>{
            let [idx2,idx3] =[ (Math.floor(idx/2)+1)*2%4, (Math.floor(idx/2)+1)*2%4+1]
            return [ Math.abs(c1[idx]-r1[idx])<=edgeSense
            && r1[idx2]-edgeSense <=c1[idx2]&&c1[idx2]<=r1[idx3]+edgeSense,
                dirChar[idx]]
        })
        return events.filter((value,index)=>{
            return value[0]
        }).reduce((sum,next)=>{ return sum+next[1]},"")
    }
}