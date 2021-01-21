const dino = document.querySelector(".dino");
const background = document.querySelector(".background");
let isJumping = false;
let position = 0;

function handleKeyUp(event){
    if(event.keyCode === 32 || event.keyCode === 38){
        if(!isJumping){
            jump();
        }

    }

}

function jump(){
    isJumping = true;

    let upInterval = setInterval(()=>{

        if (position >= 160){
            clearInterval(upInterval);
            let downInterval = setInterval(()=>{
                if(position <=0 ){
                    clearInterval(downInterval);
                    isJumping = false;
                }else{
                    position -= 9;
                    dino.style.bottom = position + "px";
                }
            },3)
        }else{

        
        position += 9;
        dino.style.bottom = position + "px";
    }
    },3);

}

function createCactus(){
    const cactus = document.createElement("div");
    let cactusPosition = 2000;
    let randomTime;
    do {
        randomTime = Math.random() *6000;
    }while(randomTime<900);    
    cactus.classList.add("cactus");
    cactus.style.left = cactusPosition+ "px";
    background.appendChild(cactus);

    let leftInterval = setInterval(()=>{
        if (cactusPosition < -60){
            clearInterval(leftInterval);
            background.removeChild(cactus);/*
        }else if (cactusPosition > 0 && cactusPosition < 60 && position <60){
            clearInterval(leftInterval);
            document.body.innerHTML= "<h1 class='game-over'>Fim de Jogo</h1>";*/
        }else{
            cactusPosition -= 10;
            cactus.style.left = cactusPosition + "px";
            
        }
    },1);
    setTimeout(createCactus,randomTime);
}
createCactus();
document.addEventListener("keyup", handleKeyUp);