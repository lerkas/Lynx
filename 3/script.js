'use strict';

const colors = ['red', 'red', 'green', 'green', 'blue', 'blue', 'yellow', 'yellow',
                'aqua', 'aqua', 'fuchsia', 'fuchsia', 'silver', 'silver', 'orange', 'orange'];
let pairs = [];
let cellID = [];
let count = 0; // счётчик открытых клеток
let totalSec = 0;
let timeInit = 0;

function gameInit() {
    clearTimer();
    createBoard();
    timeInit = setInterval(Timer, 1000);
}

// правильный рандом для заливки клеток
// https://habr.com/ru/post/358094/
function shuffle(arr) {
    let j, temp;
    for (let i = arr.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        temp = arr[j];
        arr[j] = arr[i];
        arr[i] = temp;
    }
    return arr;
}
/*
При генерации доски создаются 16(4х4) div'ов вида: 
<div id="cell0" onclick="findPair(this,'blue')"></div>
При клике на каждый div (то есть клетку), запускается ф-я findPair
*/
function createBoard() {
    count = 0;
    let output = '';
    shuffle(colors);
    for (let i = 0; i < colors.length; i++) {
        output += '<div id="cell' + i + '" onclick="findPair(this,\'' + colors[i] + '\')"></div>';
    }
    document.getElementById('board').innerHTML = output;
}
/*
При клике на любые две клетки заполняются массивы pairs и cellID
Если клетки совпадают по цвету, то счётчик вскрытых клеток увеличивается на 2
После проверки на совпадение, массивы очищаются для записи следующей пары клеток
*/
function findPair(cell, color) {
    if (pairs.length == 0) {
        pairs.push(color);
        cellID.push(cell.id);
        cell.style.background = color;
    } else if (pairs.length == 1) {
        pairs.push(color);
        cellID.push(cell.id);
        cell.style.background = color;
        if (pairs[0] == pairs[1]) {
            count += 2;
            pairs.length = 0;
            cellID.length = 0;
        } else 
        // если игрок ошибается, то через 1с разноцветные клетки становятся белыми
        setTimeout(beWrong, 1000);
    }
    if (count === colors.length) {
        alert('Вы выиграли! \n' + 'Затраченное время: ' + stopTimer());
    }
}

function beWrong() {
    let cell1 = document.getElementById(cellID[0]);
    let cell2 = document.getElementById(cellID[1]);
    cell1.style.background = 'white';
    cell2.style.background = 'white';
    pairs.length = 0;
    cellID.length = 0;
}

function Timer() {
    ++totalSec;
    function addZero(i) {
        return (i < 10) ? '0' + i : i;
    }
    let min = addZero(Math.floor(totalSec / 60));
    let sec = addZero(totalSec - (min * 60));;
    document.getElementById('timer').innerHTML = min + ':' + sec;
}

function stopTimer() {
    clearInterval(timeInit);
    return document.getElementById('timer').innerHTML;
}

function clearTimer() {
    clearInterval(timeInit);
    totalSec = 0;
    document.getElementById('timer').innerHTML = '00:00';
}