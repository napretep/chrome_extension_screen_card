import {CORE} from "./core";
import {InstallCoreEventEmitter, SetupCoreEventEmitter} from "./utils/connector";
import {test} from "./test";
console.log("injection 文件已经加载")


window.onload = ()=> {
    CORE.InstallStyles()
    CORE.InstallDisptach()
    CORE.InstallEvents()
    test()
    // CORE.ShadowRootService
}