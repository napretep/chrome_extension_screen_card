import {assetsDir, CSSClass, TempFrameFooterHeight, TempFrameHeaderHeight} from "./constants";
import {MakeIconClass} from "./funcTools";

export let styles_sheet = {
    default:{},//key是class
    other:{},//必须在key中指明选择器类型
    buttonIcons:{},//key是class
}
styles_sheet.default[CSSClass.ShadowRootHost]=`
position: absolute;
left: 0;
top:0;
pointer-events: none;
user-select: none;
width:100%;
height:${document.scrollingElement.scrollHeight}px;
z-index:99999;
`
styles_sheet.default[CSSClass.crossCursor] = `cursor: crosshair;`
styles_sheet.default[CSSClass.button] = `
background-size:100% 100%;
background-repeat:no-repeat;
transition:all 200ms;
`
styles_sheet.other[`.${CSSClass.tempFrameHeader} > div,.${CSSClass.tempFrameFooter} > div`]=`
border-radius: 4px;
padding:3px;
`
styles_sheet.other[`.${CSSClass.tempFrameHeader} > div:hover,.${CSSClass.tempFrameFooter} > div:hover`]=`
box-shadow: 4px 4px 4px #494949;
`
styles_sheet.other[`.${CSSClass.tempFrameHeader} > div:active, .${CSSClass.tempFrameFooter} > div:active`]=`
background-color: #ff3333;
`
for(let keyname in CSSClass.tempFrameHeaderButtons){
    let iconpath = chrome.runtime.getURL(`${assetsDir}/${keyname}.png`)
    if(keyname=="title") {
            styles_sheet.buttonIcons[keyname]=` 
            color:white;
            text-align:center;
            `
        }
    else{
         styles_sheet.buttonIcons[keyname]=`background-image:url(${iconpath})`
    }
}
styles_sheet.buttonIcons=Object.assign({},styles_sheet.buttonIcons,MakeIconClass(CSSClass.tempFrameFooterButtons))

styles_sheet.default[CSSClass.selectionFrameDiv]=`
position: absolute;
border:1px dotted;
display:block;
`
styles_sheet.default[CSSClass.blockActionMask]=`
position: absolute;
left: 0;
top: 0;
width: 100%;
background-color:red;
opacity: 0.8;
 `
styles_sheet.default[CSSClass.divForBlockMouse]=`
position: absolute;
left:50%;
top:3px;
transform:translate(-50%,0)
width: 20px;
height: 20px;
border:1px dotted;
cursor:crosshair;
`

styles_sheet.default[CSSClass.tempFrameHeaderMoveBar]=`
        position: absolute;
        left:50%;
        top:3px;
        width:30%;
        max-width:150px;
        height:50%;
        max-height:20px;
        background-color:white;
        opacity: 0.5;
        border-radius:3px;
        box-shadow: 1px 1px 1px;
        cursor:all-scroll;
        transform:translate(-50%,0);
`
styles_sheet.default[CSSClass.tempFrameContainer]=`
width:100%;
height:100%;
display:grid;
grid-template-columns: 100%;
grid-template-rows: min-content auto min-content; 
`
styles_sheet.default[CSSClass.TempFrameComponent]=`
position:absolute;
border-radius: 4px;
box-shadow: 1px 1px 10px #000000b0;
overflow:hidden;
`
styles_sheet.default[CSSClass.tempFrameHeader]=`
display:grid;
height:${TempFrameHeaderHeight}px;
grid-template-rows:${TempFrameHeaderHeight}px;
background-image:linear-gradient(#a6e3f5,#81bae0);
`
styles_sheet.default[CSSClass.tempFrameFooter]=`
background-image:linear-gradient(#a6e3f5,#81bae0);
display:grid;
justify-content: center;
grid-gap: 2px;
grid-template-columns: repeat(auto-fit,30px);
height:${TempFrameFooterHeight}px;
grid-template-rows:${TempFrameFooterHeight}px;
`
styles_sheet.default[CSSClass.ShadowRootContainer]=`
pointer-events:all;
`
styles_sheet.default[CSSClass.transitionAll]=`
transition:all 100ms;
`

