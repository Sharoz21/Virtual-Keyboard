const keys = document.querySelectorAll('.key');
const keyboard = document.querySelector('.keyboard-keys');
const textArea = document.querySelector('textarea');
const body = document.querySelector('body');


function toggleCaps(capsKey){
    let isActive = capsKey.classList.contains("active");

    keys.forEach(key => {
        if(key.classList.length === 1)
            isActive ? key.textContent = key.textContent.toLowerCase() : key.textContent = key.textContent.toUpperCase();
        })
    capsKey.classList.toggle("active");
    
}

function keyPressed(e , intervalID ){
    let classList = e.target.classList;
    
    if(classList.contains("backspace")) {
        textArea.value = textArea.value.slice(0,-1);
    }
    else if (classList.contains("caps")) {
        if(!intervalID)
            toggleCaps(e.target);
    }
    else if (classList.contains("spacebar")){
        textArea.value += " ";
    }
    else if(classList.contains("enter")){
        textArea.value += "\n";
    }
    else if(classList.contains("clear")){
        textArea.value = "";
    }else{
        textArea.value += e.target.textContent;
    }

    textArea.focus();
}

function hideKeyboard(){
    keyboard.style.transform="translateY(100%)";
    textArea.style.removeProperty("border");
}

function showKeyboard(){
    keyboard.style.transform="translateY(0)";
    textArea.style.border = "3px solid rgb(255, 218, 185)";
}

["mousedown","touchstart"].forEach(event => {
    
    keyboard.addEventListener(event, e => {
        if(e.target.classList.contains("key")){
            
            let leaveEvent;
            let target = e.target;
            target.classList.toggle("active-key");
            

            keyPressed(e , null);
            const intervalID = setInterval(() => keyPressed(e , intervalID) , 300);

            (event == "mousedown") ? leaveEvent = "mouseup" : leaveEvent = "touchend";

            document.querySelector("body").addEventListener(leaveEvent , e => {
                if(intervalID)
                    clearInterval(intervalID);

                target.classList.toggle("active-key");
                textArea.blur();
                
            },{once:true});    
        }
    })
})

textArea.addEventListener("focus" , () => {
    showKeyboard();
})

body.addEventListener("click" , e => {        
    if(e.target.tagName === "BODY"){
        hideKeyboard();
    }
})


window.addEventListener("load" , ()=>{
    showKeyboard();
})
