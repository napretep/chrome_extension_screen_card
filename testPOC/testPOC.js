    window.onload=()=>{
    let div  = document.querySelector(".resizer")
    let blockDiv = document.createElement("div")
        blockDiv.style.cssText=`
        z-index:10000;
        width:20px;
        height:20px;
        border:1px dotted;
        position:fixed;
        `
    let direction = {
        LT:"nw-resize",
        LB:"sw-resize",
        RT:"ne-resize",
        RB:"se-resize",
        L:"w-resize",
        R:'e-resize',
        T:"n-resize",
        B:"s-resize"
    }
    let start={
        cursorX:null,
        cursorY:null,
        divWidth:null,
        divHeight:null,
        divLeft:null,
        divTop:null,
    }
    let result
    let startResize=false
    document.addEventListener("mousedown",(e)=>{
        if(result){
            startResize=true
            start.cursorX = e.clientX
            start.cursorY = e.clientY
            start.divTop = div.getBoundingClientRect().top
            start.divLeft = div.getBoundingClientRect().left
            start.divWidth = div.getBoundingClientRect().width
            start.divHeight = div.getBoundingClientRect().height
            // div.appendChild(blockDiv)
            blockDiv.style.cursor=result
        }
    })
    document.addEventListener("mouseup",(e)=>{
        startResize=false
        // div.removeChild(blockDiv)
    })
    document.addEventListener("mousemove",(e)=>{
        if(!startResize){
            let [cx,cy,] = [e.clientX,e.clientX,e.clientY,e.clientY]
            let cursorPos = [e.clientX,e.clientX,e.clientY,e.clientY]
            let rect = div.getBoundingClientRect()
            let rectPos =  [rect.left,rect.right,rect.top,rect.bottom,]
            let dirChar = ["L","R","T","B"]
            let [top,bottom,left,right] = [rect.top,rect.bottom,rect.left,rect.right]
            let event = [[Math.abs(cx-left),"L"],[Math.abs(cx-right),"R"],[Math.abs(cy-top),"T"],[Math.abs(cy-bottom),"B"]]
            result = event.filter((e)=>{
                return e[0]<20
            }).reduce((sum,next)=>{
                return sum+next[1]
            },"")
            document.body.style.cursor = direction[result]?direction[result]:""

        }
        if(startResize){
            let [x,y] = [e.clientX,e.clientY]
            //下面的操作把所有情况都融合在了一块, 减少了代码量 但增加了阅读难度
            div.style.height =result.indexOf("B")>=0? (start.divHeight+y-start.cursorY).toString()+"px":div.style.height
            div.style.width = result.indexOf("R")>=0? (start.divWidth+x-start.cursorX).toString()+"px":div.style.width
            div.style.height =result.indexOf("T")>=0? (start.divHeight-(y-start.cursorY)).toString()+"px":div.style.height
            div.style.top = result.indexOf("T")>=0? (start.divTop+(y-start.cursorY)).toString()+"px":div.style.top
            div.style.width = result.indexOf("L")>=0? (start.divWidth-(x-start.cursorX)).toString()+"px":div.style.width
            div.style.left = result.indexOf("L")>=0? (start.divLeft+x-start.cursorX).toString()+"px":div.style.left

        }
    })
}