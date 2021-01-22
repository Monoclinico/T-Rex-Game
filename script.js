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
    let isUp =true;
    dino.style.animationPlayState = "paused";
    let upInterval = setInterval(()=>{
        if(!isLose){
            if (position >= 175){
                isUp = false;
            }
            if(position <=17 && !isUp){
                clearInterval(upInterval);
                isJumping = false;
                dino.style.animationPlayState = "running";
            } else{      
                if(isUp){
                    position += 19;
                }else{
                    position -= 18;
                }
                dino.style.bottom = position + "px";
            }
        }
    },30);
}

function randomBackgrondCactus(){
    let randomBackground;
    randomBackground = (Math.random() *1000);
    if (randomBackground <= 300){
        return "url(./cactus1.png)";
    }else if(randomBackground > 300 && randomBackground <= 600){
        return "url(./rock.png)";
    }else{
        return "url(./cactus2.png)";
    }
}

function createCactus(){
    
    if(!isLose){
        const cactus = document.createElement("div");
        let cactusPosition = 1300 + (Math.random() *1000);
        cactus.classList.add("cactus");
        cactus.style.left = cactusPosition+ "px";
        cactus.style.backgroundImage = randomBackgrondCactus();
        background.appendChild(cactus);

        
        let leftInterval = setInterval(()=>{
            if (cactusPosition < -60){
                clearInterval(leftInterval);
                background.removeChild(cactus);
                createCactus();
                
            }else if (cactusPosition > 110 && cactusPosition < 160 && position <67){
                clearInterval(leftInterval);
                clearInterval(addScoreInterval);
                isLose = true;
                background.style.animationPlayState = "paused";
                dino.style.animationPlayState = "paused";
                const endGame = document.createElement("div");
                background.appendChild(endGame);
                endGame.innerHTML = "Game Over";
                endGame.style = "z-index:1000;color: red;text-align: center;font-family: Arial; font-weight: 900;font-size: 8ch;;width:auto;height: 150px; position:relative; transform: translate(-50%, -50%); top:50%; left: 50%";
                const restartGame = document.createElement("div");
                background.appendChild(restartGame);
                restartGame.innerHTML = "Press space or key up to restart";
                restartGame.style = "z-index:1000;color: black;text-align: center;font-family: Arial; font-weight: 900;font-size: 4ch;;width:auto;height: 150px; position:relative; transform: translate(-50%, -50%); top:50%; left: 50%";

            }else{
                cactusPosition -= velocityCactus;
                cactus.style.left = cactusPosition + "px";
                
            }
            if(isLose){
                clearInterval(leftInterval);
            }

        },30);
 
    }
}

function addScore(){
    scoreText.innerHTML = "Score: "+score;
    score += 1;
    if (score % 100 == 0){
        velocityCactus+=1;
        if (velocityBackground>=30){
            velocityBackground-=8;
        }
        background.style.animationDuration = velocityBackground+"s";
    }
}

let addScoreInterval = setInterval(addScore,100);

createCactus();

document.addEventListener("keydown", handleKeyUp);