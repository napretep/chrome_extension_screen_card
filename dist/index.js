
window.onload = ()=>{
    console.log((new Date()).toString())
    let span = document.querySelector(".iconfont.icon-jieping")
    chrome.runtime.connect()
    span.addEventListener('click', ()=>{
        chrome.tabs.query({active: true,currentWindow:true}, (tabs)=>{
          chrome.tabs.sendMessage(tabs[0].id,{EVENT:"EVENT_FRAME_DRAWING_TRIGGERED"})
        })
        console.log("sendMessage EVENT_FRAME_DRAWING_TRIGGERED")
    })
}