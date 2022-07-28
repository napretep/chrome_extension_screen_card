window.onload=()=>{
    let html = document.querySelector("body")
    let div =document.createElement("div")
    div.style.cssText=`
    position:absolute;
    background-color:blue;
    left:0;
    top:0;
    width:100%;
    height:100%;
    `
    div.style.height=document.scrollingElement.scrollHeight.toString()+"px"
    let style = document.createElement("style")
    style.innerHTML=`
    div{
    position:absolute;
    top:50%;
    left:50%;
    transform:translate(-50%, -50%);
    background-color:red;
    width:100px;
    height:100px;}
    `
    let shadow = div.attachShadow({mode:"open"})
    let shadowdiv = document.createElement("div")
    shadowdiv.innerText="hello"
    shadow.appendChild(style)
    shadow.appendChild(shadowdiv)
    html.appendChild(div)

}

class testblock extends HTMLElement {
    /**
     *   card-screen root
     *   style element
     *   tempframe service
     *   tempframe
     *   cardframe
     *   card service
     *   storage service
     * */
    connetctedCallback(){}

}