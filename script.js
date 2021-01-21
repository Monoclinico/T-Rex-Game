const dino = document.querySelector(".dino");
const background = document.querySelector(".background");
const scoreText = document.querySelector(".score");
let isJumping = false;
let isLose = false;
let position = 0;
let score = 0;
let velocityCactus = 8;
let velocityBackground = 200;

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
    dino.style.animationPlayState = "paused";
    let upInterval = setInterval(()=>{
        if (position >= 180){
            clearInterval(upInterval);
            let downInterval = setInterval(()=>{
                if(position <=0 ){
                    clearInterval(downInterval);
                    isJumping = false;
                    dino.style.animationPlayState = "running";

                }else{
                    if (!isLose){
                        position -= 10;
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
        let randomBackground;
        randomBackground = (Math.random() *1000);
        if (randomBackground <= 300){
            cactus.style.backgroundImage = "url(./cactus1.png)";
        }else if(randomBackground > 300 && randomBackground <= 600){
            cactus.style.backgroundImage = "url(./rock.png)";
        }else{
            cactus.style.backgroundImage = "url(./cactus2.png)";
        }
        background.appendChild(cactus);

        let leftInterval = setInterval(()=>{
            if (cactusPosition < -60){
                clearInterval(leftInterval);
                background.removeChild(cactus);
            }else if (cactusPosition > 110 && cactusPosition < 168 && position <67){
                clearInterval(leftInterval);
                clearInterval(createCactusInterval);
                clearInterval(addScoreInterval);
                isLose = true;
                background.style.animationPlayState = "paused";
                dino.style.animationPlayState = "paused";
                const endGame = document.createElement("div");
                background.appendChild(endGame);
                endGame.innerHTML = "Game Over";
                endGame.style = "color: red;text-align: center;font-family: Arial; font-weight: 900;font-size: 8ch;;width:auto;height: 150px; position:relative; transform: translate(-50%, -50%); top:50%; left: 50%";
                const restartGame = document.createElement("div");
                background.appendChild(restartGame);
                restartGame.innerHTML = "Press space or key up to restart";
                restartGame.style = "color: black;text-align: center;font-family: Arial; font-weight: 900;font-size: 4ch;;width:auto;height: 150px; position:relative; transform: translate(-50%, -50%); top:50%; left: 50%";

            }else{
                cactusPosition -= velocityCactus;
                cactus.style.left = cactusPosition + "px";
                
            }
        },1);
        setInterval(()=>{if(isLose){clearInterval(leftInterval);}},100);
    }
}

function addScore(){
    scoreText.innerHTML = "Score: "+score;
    score += 1;
    if (score % 100 == 0){
        velocityCactus+=1;
        if (velocityBackground>=30){
            velocityBackground-=10;
        }
        background.style.animationDuration = velocityBackground+"s";
    }
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