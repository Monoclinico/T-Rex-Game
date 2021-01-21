const dino = document.querySelector(".dino");
const background = document.querySelector(".background");
const scoreText = document.querySelector(".score");
let isJumping = false;
let isLose = false;
let position = 0;
let score = 0;

function handleKeyUp(event){
    if(event.keyCode === 32 || event.keyCode === 38){
        if(!isJumping && !isLose){
            jump();
        }
        if(isLose){
            location.reload(); 
        }
    }

}

function jump(){
    isJumping = true;

    let upInterval = setInterval(()=>{
        if (position >= 180){
            clearInterval(upInterval);
            let downInterval = setInterval(()=>{
                if(position <=0 ){
                    clearInterval(downInterval);
                    isJumping = false;
                }else{
                    if (!isLose){
                        position -= 9;
                        dino.style.bottom = position + "px";
                    }
                }
            },3)
        }else{
            if (!isLose){
                position += 11;
                dino.style.bottom = position + "px";
            }
        }
    },3);

}

function createCactus(){
    
    if(!isLose){
        const cactus = document.createElement("div");
        let cactusPosition = 1500;
   
        cactus.classList.add("cactus");
        cactus.style.left = cactusPosition+ "px";
        background.appendChild(cactus);

        let leftInterval = setInterval(()=>{
            if (cactusPosition < -60){
                clearInterval(leftInterval);
                background.removeChild(cactus);
            }else if (cactusPosition > 110 && cactusPosition < 170 && position <70){
                clearInterval(leftInterval);
                clearInterval(createCactusInterval);
                clearInterval(addScoreInterval);
                isLose = true;
                background.style.animationPlayState = "paused";
                const endGame = document.createElement("div");
                background.appendChild(endGame);
                endGame.innerHTML = "Game Over";
                endGame.style = "color: red;text-align: center;font-family: Arial; font-weight: 900;font-size: 8ch;;width:auto;height: 150px; position:relative; transform: translate(-50%, -50%); top:50%; left: 50%";
                const restartGame = document.createElement("div");
                background.appendChild(restartGame);
                restartGame.innerHTML = "Press space or key up to restart";
                restartGame.style = "color: black;text-align: center;font-family: Arial; font-weight: 900;font-size: 4ch;;width:auto;height: 150px; position:relative; transform: translate(-50%, -50%); top:50%; left: 50%";

            }else{
                cactusPosition -= 10;
                cactus.style.left = cactusPosition + "px";
                
            }
        },1);
        setInterval(()=>{if(isLose){clearInterval(leftInterval);}},100);
    }
}

function addScore(){
    scoreText.innerHTML = "Score: "+score;
    score += 1;
}

function callCreateCactus(){
    if(!isLose){
        let randomTime;
        randomTime = (Math.random() *1000);
        let createCactusTimeout = setTimeout(createCactus,randomTime);
    }
}

let addScoreInterval = setInterval(addScore,100);

let createCactusInterval = setInterval(callCreateCactus,1500);

document.addEventListener("keyup", handleKeyUp);