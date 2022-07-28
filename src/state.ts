import {consolelog, InstallEvent} from "./utils/funcTools";
import {IService, IState,} from "./utils/interfaces";
import {Singleton} from "./utils/classes"

abstract class StateItem implements IState{
    public abstract BasicState:string[]
    public STATE=new Set<string>()
    public EMPTY=0
    public HAS=(B:string):boolean=>{
        return this.STATE.has(B)
    }
    public NO=(...B:string[])=>{
        return !this.SOME(...B)
    }
    public SOME=(...B:string[])=>{
        return B.some((value)=>this.HAS(value))
    }
    public ALL=(...B:string[])=>{
        return B.reduce((sum,value)=> sum && this.HAS(value),true)

    }
    public ADD=(...B:string[])=>{
        B.forEach((value)=> this.STATE.add(value))
        this.toArray()
        // consolelog(this.toString())
    }
    public DEL=(...B:string[])=>{
        B.forEach((value)=> this.STATE.delete(value))
        this.toArray()
        // consolelog(this.toString())
    }
    public CLEAR=()=>{
        this.DEL(...this.toArray())
    }
    // public IFF=(...B:string[])=>{
    // //IF and Only if
    //
    // }
    public SETONLY=(...B:string[])=>{
        this.CLEAR()
        this.ADD(...B)
    }
    public toArray=()=>{
        return Array.from(this.STATE.values())
    }
    public toString(){
        return this.toArray().reduce((sum,next)=>{return next+","+sum},"")
    }
    public AtBasicState=()=>{
        return this.toArray()==this.BasicState
    }
}
class FRAME_DRAWING extends StateItem{
    public TRIGGERD="TRIGGERD"
    public STARTED="STARTED"
    public MOVING="MOVING"
    public BasicState=[]
}

class TEMPFRAME extends StateItem{
    public SHOW="SHOW"
    public MOVING="MOVING"
    public RESIZE_TRIGGERED="RESIZE_TRIGGERED"
    public RESIZE_BEGIN="RESIZE_BEGIN"
    public RESIZE_DOING= "RESIZE_DOING"
    public ClearResize=()=>{
        this.DEL(this.RESIZE_TRIGGERED,this.RESIZE_DOING,this.RESIZE_BEGIN)
    }
    public AT_BUTTON = "AT_BUTTON"
    public BasicState=[this.SHOW]
}

class _STATE extends Singleton<_STATE>(){
    /*
    * 单例模式
    * */
    public FRAME_DRAWING= new FRAME_DRAWING()
    public TEMPFRAME=new TEMPFRAME()
    public FRAME_DRAWING_TRIGGERED:boolean = false
    public FRAME_DRAWING_SATRTED :boolean= false
    public FRAME_DRAWING_MOVING :boolean= false
    public FRAME_DRAWING_STOPPED :boolean = true

    public TEMPFRAME_SHOW:boolean=false
    public TEMPFRAME_CAN_MOVE:boolean = false
    public TEMPFRAME_CAN_RESIZE:boolean = false


}


export let STATE = _STATE.Instance


