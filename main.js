var moles = document.querySelectorAll('.mole');
let score = 0;
var moleHit = false;
var isGameActive =false;
var isConfigset = false;
let level = 1;
let currentMoleTime;

let topScores = [];

const body = document.getElementsByClassName('bodyClass');


function gameOver(){
    // document.getElementsByClassName('gameArea')[0].style.display = "none";


    document.getElementById("gameScreen").classList.add("hideDisplay");
    document.getElementById("gameOver").classList.remove("hideDisplay");

    topScores.push(score);
    topScores.sort(function (a,b) {
        return b - a; // Descending
    });
    topScores.slice(0,5);
    let topScoreElement = document.getElementsByClassName("topScores")[0];
    topScoreElement.textContent = '';
    for(let i =0; i<5 && i<topScores.length; i++){

        const score = document.createElement('div');
        score.textContent = topScores[i];
        topScoreElement.appendChild(score);
        score.classList.add('score');
        score.classList.add('fontSize--30px');
        score.classList.add('margin--32px');
    }
    score = 0;
    updateScore();

}

function popmole(){

    var rand = Math.random() * moles.length;
    rand = Math.floor(rand);

    moles[rand].classList.add('moleUp');
    moleHit = false;

    currentMoleTime =  setTimeout(()=>{
        moles[rand].classList.remove('moleUp');
        if(moleHit === false){
            isGameOver = true;
            gameOver()
        }
    }, 2000/level);

}


function updateScore(){
    const scoreObject = document.getElementById('currentScore');
    scoreObject.textContent = score;
}

function whack(){
    score++;
    moleHit = true;
    body[0].style.background = 'red';
    setTimeout(()=>{
        body[0].style.background = '#00cc66';
    },100);
    updateScore();
    clearTimeout(currentMoleTime);
    document.getElementsByClassName('moleUp')[0].classList.remove('moleUp');
    popmole();

}

function startGame(){

    var row=document.getElementById("rnum").value;
    var col=document.getElementById("cnum").value;
    level = document.getElementById("level").value;

    let table = document.getElementById('dirtGrid');
    
    for(var i = 0; i <row; i++){

        let tableRow = document.createElement('tr');
        
        for(var j = 0; j <col; j++){
            let tableCell = document.createElement('td');
            tableCell.classList.add("cell");
            tableCell.innerHTML = "<img class = \"mole\" src=\"assets/mole.svg\"><img class=\"dirtImage\" src=\"assets/dirt.svg\">";
            tableRow.appendChild(tableCell);
        }
        table.appendChild(tableRow);
    }
    
    moles = document.querySelectorAll('.mole');


    document.getElementById("gameScreen").classList.remove("hideDisplay");
    document.getElementById("config").classList.add("hideDisplay");

    for(var i = 0; i<moles.length; i++){
        moles[i].classList.add("mole"+i);
    }
    moles.forEach(mole => mole.addEventListener('click', whack));
    score = 0;
    
    popmole();
}

function startOver(){
    let table = document.getElementById('dirtGrid');
    table.innerHTML = "";
    document.getElementById("gameOver").classList.add("hideDisplay");
    document.getElementById("config").classList.remove("hideDisplay");
}



document.getElementById('startButton').addEventListener('click', ()=>{
    startOver();
});


const form = document.getElementById('form');

form.onsubmit = submit;

function submit(event) {
    event.preventDefault();
    startGame();
}
/*
Form element for form , OnSubmit => hide prompt, update config, crate game grid with JS
Object with multiple keys to store configurations - global/
variables - prompt(bool) , 


Optional functionality - 
1 strike or 3 strike 

*/