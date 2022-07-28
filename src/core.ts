import {Singleton} from "./utils/classes";
import {CardFrameService, StateService,
    MaskService, ShadowRootService,
    TempFrameDrawingService, TempFrameService} from "./services";
import {STATE} from "./state";
import {InstallDispatch_AtBody, InstallDispatch_AtShadowRoot} from "./actionDispatcher";
import {styles_sheet} from "./utils/styles_sheet";
import {IService} from "./utils/interfaces";
import {InstallCoreEventEmitter, SetupCoreEventEmitter,} from "./utils/connector";
import {consolelog} from "./utils/funcTools";
import {TempFrameComponent} from "./components"
import {CSSClass} from "./utils/constants";
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
export  class _CORE  extends Singleton<_CORE>()
{
    public StateService:StateService=new StateService();
    public STATE = STATE
    public ShadowRootService:ShadowRootService = new ShadowRootService()
    public ShadowRoot:HTMLElement = this.ShadowRootService.root
    public TempFrameDrawingService:TempFrameDrawingService = new TempFrameDrawingService()
    public TempFrameService:TempFrameService=new TempFrameService()
    public TempFrameComponent:TempFrameComponent=null
    public CardFrameService:CardFrameService = new CardFrameService()
    public CurrentCardFrame=null
    public MaskService:MaskService = new MaskService()
    public ServiceList:IService[]=
        [this.MaskService,this.StateService,
            this.TempFrameDrawingService,
            this.TempFrameService,
            this.ShadowRootService]
    public InstallDisptach=()=>{
        InstallDispatch_AtBody()
        InstallDispatch_AtShadowRoot()
    }
    public InstallStyles=()=>{
        let styleString=""
        for(let classkey in styles_sheet.default) {
            styleString += `\n.${classkey}{${styles_sheet.default[classkey]}}`
        }
        for(let otherKey in styles_sheet.other){
            styleString += `\n${otherKey}{${styles_sheet.other[otherKey]}}`
        }
        for(let buttonKey in styles_sheet.buttonIcons){
            styleString+=`\n.icon-${buttonKey}{${styles_sheet.buttonIcons[buttonKey]}}`
        }
        let styleEl = document.createElement("style")
        styleEl.innerHTML = styleString
        this.ShadowRoot.appendChild(styleEl)
        let styleEl2 = document.createElement("style")
        styleEl2.innerHTML = `.${CSSClass.ShadowRootHost}
        {${styles_sheet.default[CSSClass.ShadowRootHost]}}`

        document.head.appendChild(styleEl2)
    }
    public InstallEvents=()=>{
        SetupCoreEventEmitter()
        InstallCoreEventEmitter(this.ServiceList)
    }

}

export let CORE = _CORE.Instance
