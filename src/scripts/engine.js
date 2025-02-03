const state = {
    view: {
        squares: document.querySelectorAll(".square"),
        enemy: document.querySelector(".enemy"),
        timeLeft: document.querySelector("#time-left"),
        score: document.querySelector("#score"),
    },
    values: {
        gameVelocity: 500,
        hitPosition: 0,
        result: 0,
        curretTime: 60,
    },
    actions:{
        countDownTimerId: setInterval(countDown, 500),
        timerId: setInterval(randomSquare, 1000)
    }
}

function countDown(){
    state.values.curretTime--;
    state.view.timeLeft.textContent = state.values.curretTime

    if (state.values.curretTime <= 0){
        clearInterval(state.actions.countDownTimerId)
        clearInterval(state.actions.TimerId)
        alert("Game Over! O seu resultado foi: " + state.values.result); 
       
    }
}

function playSound(){
    let audio = new Audio("./src/audios/audios/hit.m4a");
    audio.volume = 0.2
    audio.play();
}

function randomSquare(){
    state.view.squares.forEach((square) =>{
        square.classList.remove("enemy");
    });

let randomNumber = Math.floor(Math.random() * 9);
let randomSquare = state.view.squares[randomNumber]
randomSquare.classList.add("enemy");
state.values.hitPosition = randomSquare.id
}

function moveEnemy(){
    state.values.timerId = setInterval(randomSquare, state.values.gameVelocity)
}

function addListenerHitBox(){
    state.view.squares.forEach((square) =>{
        square.addEventListener("mousedown", () => {
            if(square.id === state.values.hitPosition){
                state.values.result++
                state.view.score.textContent = state.values.result
                state.values.hitPosition = null
                playSound("hit");
            }
        })
    })
}

function init() {
    moveEnemy();
    addListenerHitBox();
}

init();