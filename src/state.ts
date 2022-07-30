import {consolelog, InstallEvent} from "./utils/funcTools";
import {ConflictFlag, IService, IState,} from "./utils/interfaces";
import {Singleton} from "./utils/classes"


/**
 * {STATE}是状态, 用集合存储各类flag, 从而显示出不同的状态.
 * {Group}是flag的分类, flag一般写成 xxx_xxx_xxx的形式, `_` 分割的首个xxx就是flag的分类
 *
 * */
abstract class StateItem implements IState {

    public abstract BasicFlag: string[]
    public abstract ConflictFlag: ConflictFlag
    public abstract Groups: { [name: string]: string }
    public STATE = new Set<string>()
    public EMPTY = 0
    //满足
    public HAS = (B: string): boolean => {
        return this.STATE.has(B)
    }

    //全部不满手
    public NO = (...B: string[]) => {
        return !this.SOME(...B)
    }

    //部分条件满足
    public SOME = (...B: string[]) => {
        return B.some((value) => this.HAS(value))
    }

    //全部条件满足
    public ALL = (...B: string[]) => {
        return B.reduce((sum, value) => sum && this.HAS(value), true)

    }

    //当且仅当
    public IFF = (...B: string[]) => {
        return this.toArray().sort().toString() === B.sort().toString()
    }

    public ADD = (...B: string[]) => {
        B.forEach((value) => {
            let group = value.split("_")[0]
            this.RemoveGroup(group)
            this.STATE.add(value)
        })

        console.log(this.constructor.name + " " +
            B.toString() + ">>>added>>>" + this.toString())
    }

    public DEL = (...B: string[]) => {
        B.forEach((value) => this.STATE.delete(value))

        console.log(this.constructor.name + " " + B.toString() + ">>>deleted>>>" + this.toString())
    }
    public CLEAR = () => {
        this.DEL(...this.toArray())
    }

    public SETONLY = (...B: string[]) => {
        this.CLEAR()
        this.ADD(...B)
    }
    public toArray: () => string[] = () => {
        return Array.from(this.STATE.values())
    }

    public toString() {
        return this.toArray().toString()
    }

    public IsBasicState = () => {
        return this.IFF(...this.BasicFlag)
    }


    public SetBasicState = () => {
        this.SETONLY(...this.BasicFlag)
    }
    public InitWith = (...B: string[]) => {
        this.SetBasicState()
        this.ADD(...B)
    }


    /**
     * NOGROUP 即状态中 没有 B类flag
     * */
    public NOGROUP = (B: string) => {
        return !this.toArray().some((s) => {
            s.startsWith(B)
        })
    }
    /**
     *     ONLYGROUP的意思是 在GroupNames中 B类flag是当前状态唯一存在的
     * */
    public ONLYGROUP = (B: string) => {
        return Object.keys(this.Groups).reduce((result, next) => {
            if (B === next) return result && this.HASGROUP(B)
            return result && !this.HASGROUP(next)
        }, true)
    }

    /**
     * HASGROUP 就是检测当前状态中是否存在B类flag
     * */
    public HASGROUP = (B: string) => {
        return this.toArray().some((s) => {
            return s.startsWith(B)
        })
    }
    /**
     * 获取状态中, 与groupname 冲突的集
     * */
    public getConlictSet = (groupname: string) => {
        return this.ConflictFlag.reduce(
            (result: Set<string>, next:Set<string>) => {
                return next.has(groupname) ? next : result
            }, new Set<string>())
    }
    /**
     * 移除状态中所有 groupname类的flag
     * */
    public RemoveGroup = (groupname: string, includeSelf = false) => {
        this.getConlictSet(groupname)
            .forEach((g_name) => {
                this.STATE.forEach((s_flag) =>
                    s_flag.startsWith(g_name) && (includeSelf ? groupname == g_name : !(groupname == g_name)) ?
                        this.DEL(s_flag)
                        : null)
            })
    }
}

class FRAME_DRAWING extends StateItem {
    public TRIGGERED = "TRIGGERD"
    public STARTED = "STARTED"
    public MOVING = "MOVING"
    public Groups = {}
    public BasicFlag = []
    public ConflictFlag = []
}

class TEMPFRAME extends StateItem {
    public SHOW = "SHOW"
    public MOVE_BEGIN = "MOVE_BEGIN"
    public MOVE_DOING = "MOVE_DOING"
    public RESIZE_TRIGGERED = "RESIZE_TRIGGERED"
    public RESIZE_BEGIN = "RESIZE_BEGIN"
    public RESIZE_DOING = "RESIZE_DOING"
    public BTN_FOLDBODY = "BTN_FOLDBODY"
    public BTN_MINIMIZE = "BTN_MINIMIZE"
    public BTN_TOOLS = "BTN_TOOLS"
    public BTN_PINE = "BTN_PINE"

    public ClearResize = () => {
        this.DEL(this.RESIZE_TRIGGERED, this.RESIZE_DOING, this.RESIZE_BEGIN)
    }
    public ClearMove = () => {
        this.DEL(this.MOVE_DOING)
    }
    public AT_BUTTON = "AT_BUTTON"
    public BasicFlag = [this.SHOW]
    public Groups = {
        RESIZE: "RESIZE", MOVE: "MOVE"
    }
    public ConflictFlag = [new Set([this.Groups.RESIZE, this.Groups.MOVE])]
}

class MOUSE extends StateItem {
    BasicFlag = [];
    ConflictFlag = []
    Groups = {}
    public LBTN_HOLDING = "LBTN_HOLDING"
    public LBTN_RELEASED = "LBTN_RELEASED"
    public RBTN_HOLDING = "RBTN_HOLDING"
    public RBTN_RELEASED = "RBTN_RELEASED"
}

class _STATE extends Singleton<_STATE>() {
    /*
    * 单例模式
    * */
    public MOUSE = new MOUSE()
    public FRAME_DRAWING = new FRAME_DRAWING()
    public TEMPFRAME = new TEMPFRAME()
    public FRAME_DRAWING_TRIGGERED: boolean = false
    public FRAME_DRAWING_SATRTED: boolean = false
    public FRAME_DRAWING_MOVING: boolean = false
    public FRAME_DRAWING_STOPPED: boolean = true

    public TEMPFRAME_SHOW: boolean = false
    public TEMPFRAME_CAN_MOVE: boolean = false
    public TEMPFRAME_CAN_RESIZE: boolean = false


}


export let STATE = _STATE.Instance


