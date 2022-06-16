var moles = document.querySelectorAll('.mole');
var score = 0;
var moleHit = false;
var isGameActive =false;
var isConfigset = false;


function gameOver(){
    // document.getElementsByClassName('gameArea')[0].style.display = "none";


    document.getElementById("gameScreen").classList.add("hideDisplay");
    document.getElementById("gameOver").classList.remove("hideDisplay");
}

function popmole(){

    var rand = Math.random() * moles.length;
    rand = Math.floor(rand);

    moles[rand].classList.add('moleUp');
    moleHit = false;

    setTimeout(()=>{
        moles[rand].classList.remove('moleUp');
        if(moleHit === false){
            isGameOver = true;
            console.log("scoreee" + score);
            gameOver()
            // call game over 

        }else{
            popmole();
        }
    }, 1000);

}

function updateScore(){
    score++;
    moleHit = true;
    console.log("score" + score);
    const scoreObject = document.getElementById('currentScore');
    scoreObject.textContent = score;
}

function startGame(){

    var row=document.getElementById("rnum").value;
    var col=document.getElementById("cnum").value;

    console.log(row, col);
    
    // create grid 
    
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
    moles.forEach(mole => mole.addEventListener('click', updateScore));
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
    console.log("adfad");
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