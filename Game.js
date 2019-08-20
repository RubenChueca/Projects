//Declaracion de variables
let counterTR = 0;
let counterTD = 0;
let tableLenght = 2;
let currentLVL = 1;
let arrayRnd = [];
let arraySelect = [];
let clickDisabled = true;
let endCount = false;
let color = true;

let buttons = document.getElementById('btns');
buttons.style.borderCollapse = 'collapse';
buttons.style.visibility = 'hidden';

let beginGame = document.getElementById('begin');
beginGame.addEventListener('click', game);

let lvl = document.getElementById('lvl');
lvl.style.visibility = 'hidden';

let guide = document.getElementById('guide');
guide.innerHTML = 'Memorice...';
guide.style.visibility = 'hidden';
//--------------------------------------------------------------
//Creacion de las celdas 
for (let i = 0; i < tableLenght; i++) {
    let trBtns = document.createElement('tr');
    counterTR++;
    trBtns.id = 'row' + (counterTR);
    buttons.appendChild(trBtns);
    for (let j = 0; j < tableLenght; j++) {
        let tdBtns = document.createElement('td');
        tdBtns.style.width = '150px';
        tdBtns.style.height = '150px';
        tdBtns.style.border = '10px solid black';
        counterTD++;
        tdBtns.id = counterTD;
        trBtns.appendChild(tdBtns);
    }
}
//--------------------------------------------------------------
//Creacion de funcion game
function game() {
    colorCells();
    let checkArray = 0;
    let rnd = Math.floor(Math.random() * 4) + 1;
    arrayRnd.push(rnd);

    buttons.style.visibility = 'visible';
    lvl.style.visibility = 'visible';
    lvl.innerHTML = 'Nivel' + ' ' + currentLVL;
    
    guide.style.visibility = 'visible';

    beginGame.disabled = true;
    endCount = true;
    count(checkArray);
    endFunctionGame();
}
//--------------------------------------------------------------
//Creacion de funcion count (crea combinacion de colores random)
function count(checkArray) {
    let btnRnd = document.getElementById(arrayRnd[checkArray]);
    if (checkArray < arrayRnd.length) {
        setTimeout(function () {
            changeColor(arrayRnd[checkArray], btnRnd);
            color = true;
        }, 500);
        setTimeout(function () {
            changeColor(arrayRnd[checkArray], btnRnd);
            color = false;
            count(checkArray + 1);
        }, 1000);
    } else {
        endCount = false;
    }
}
//--------------------------------------------------------------
//Creacion funcion endFunctionGame
function endFunctionGame() {
    if (endCount) {
        setTimeout(function () { endFunctionGame() }, 1500);
    } else {
        currentLVL++;
        guide.innerHTML = 'Seleccione';
        disableClickCell();
    }
}
//--------------------------------------------------------------
//Creacion funcion disableClickCell
function disableClickCell() {
    if (clickDisabled) {
        for (let i = 0; i < counterTD; i++) {
            let tableCell = document.getElementById(i+1);
            tableCell.addEventListener('click', checkSelect);
            tableCell.addEventListener('mousedown', colorSelect);
            tableCell.addEventListener('mouseup', colorUnselect);
        }
        clickDisabled = false;
    } else {
        for (let i = 0; i < counterTD; i++) {
            let tableCell = document.getElementById(i+1);
            tableCell.removeEventListener('click', checkSelect);
            tableCell.removeEventListener('mousedown', colorSelect);
            tableCell.removeEventListener('mouseup', colorUnselect);
        }
        clickDisabled = true;
    }
}
//--------------------------------------------------------------
//Creacion de funcion checkSelect
function checkSelect() {
    let btnSelect = this.id;
    arraySelect.push(btnSelect);

    for (let i = 0; i < arraySelect.length; i++) {
        if (arraySelect[i] != arrayRnd[i]) {
            buttons.style.visibility = 'hidden';
            lvl.style.visibility = 'hidden';
            currentLVL = 1;
            arrayRnd = [];
            arraySelect = [];
            beginGame.disabled = false;
            clickDisabled = true;
            color = true;
            alert("Ha fallado");
            return;
        }
    }
    if (arraySelect.length == arrayRnd.length) {
        arraySelect = [];
        guide.innerHTML = 'Memorice...';
        disableClickCell();
        color = true;
        game();
    }
}
//--------------------------------------------------------------
//Creacion de funcion colorSelect
function colorSelect() {
    let id = parseInt(this.id);

    changeColor(id, this);
    color = true;
}
//--------------------------------------------------------------
//Creacion de funcion colorUnselect
function colorUnselect() {
    let id = parseInt(this.id);

    changeColor(id, this);
    color = false;
}
//--------------------------------------------------------------
//Creacion funcion changeColor
function changeColor(id, cellChanged) {
    if (color) {
        switch (id) {
            case 1:
                cellChanged.style.backgroundColor = 'green';
                break;
            case 2:
                cellChanged.style.backgroundColor = 'red';
                break;
            case 3:
                cellChanged.style.backgroundColor = 'blue';
                break;
            case 4:
                cellChanged.style.backgroundColor = 'yellow';
                break;
        }
    } else{
        switch (id) {
            case 1:
                cellChanged.style.backgroundColor = 'lightgreen';
                break;
            case 2:
                cellChanged.style.backgroundColor = 'salmon';
                break;
            case 3:
                cellChanged.style.backgroundColor = 'lightblue';
                break;
            case 4:
                cellChanged.style.backgroundColor = 'lightyellow';
                break;
        }
    }
}
//--------------------------------------------------------------
//Colocacion de colores en las celdas
function colorCells(){
    for (let i = 0; i < counterTD; i++) {
        let cell = document.getElementById(i+1);
        changeColor(i+1, cell);
    }
    color = false;
}