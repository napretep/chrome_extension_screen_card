export  const extensionBaseName:string="screen-card"

function setClassName(list:string[]):object{
    let emptydict ={}
    list.map((e)=>{
    emptydict[e]=`${e}`
})
    return emptydict
}

export  const CSSClass={
    // noselect:`${extensionBaseName}-noselect`,
    // beGray:`${extensionBaseName}-begray`,
    focus:"focus",
    fullScreen:"fullScreen",
    crossCursor:`crossCursor`,
    transitionAll:"transitionAll",
    button:`button`,
    ShadowRootContainer:"ShadowRootContainer",
        TempFrameComponent:"TempFrameComponent",
            tempFrameContainer:"tempFrameContainer",
                tempFrameHeader:`tempFrameHeader`,
                    tempFrameHeaderButtons:{
                    fixed:`fixed`,
                    save:`save`,
                    foldbody:`foldbody`,
                    minimize:`minimize`,
                    close:`close`,
                    title:`title`,
                    toolbox:`toolbox`,
                },
                    tempFrameHeaderMoveBar:"tempFrameHeaderMoveBar",
                    tempFrameHeaderSide:"tempFrameHeaderSide",
                tempFrameBody:"tempFrameBody",
                    tempFrame:"TempFrame",
                tempFrameFooter:`tempFrameFooter`,
                    tempFrameFooterButtons:{},

    ShadowRootHost:`${extensionBaseName}-host`,
    selectionFrameDiv:"selectionFrameDiv",
    blockActionMask:"blockActionMask",
    divForBlockMouse:"divForBlockMouse",
}
CSSClass.tempFrameFooterButtons=setClassName(
    ["screenCapture","function","filter","annotGraph","annotText","annotFree","zoomInOut","drag","linkCard","tags","share","shutdown"])


export const TempFrameFooterHeight=30

export const TempFrameHeaderHeight=30

export const BTN_Red = "#ff3333"

export  const extensionId="fhngaecmpobhnbjhglakokmnbghmnllk"
export const assetsDir = `/assets`

export const ISDEBUG = true;