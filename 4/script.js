'use strict';

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

// Размер холста
canvas.width = 400;
canvas.height = 400;

let count = 8;
let clk = {}; // Координаты клика (позиция коня)

// При загрузке страницы вызывается функция init,
// которая определяет координаты клика на холсте и вызывает функцию knightsMove
window.addEventListener('load', init);

function init() {
    canvas.addEventListener('click', event => {
        clk = {
            x: event.layerX,
            y: event.layerY
        };
    });

    requestAnimationFrame(knightsMove);
}

function knightsMove() {
    //Каждый вызов функции инициализирует очистку холста и новую отрисовку доски
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Определение ширины и высоты клетки
    let cellWidth = canvas.width / count;
    let cellHeight = canvas.height / count;
    // Округление координатов клика до меньшего целого в рамках клетки
    let clkCellX = Math.floor(clk.x / cellWidth);
    let clkCellY = Math.floor(clk.y / cellHeight);

    // Заливка клеток доски белым и чёрным цветом
    for (let x = 0; x < count; x++) {
        for (let y = 0; y < count; y++) {
            if (y % 2 === 0) {
                ctx.fillStyle = (x % 2 === 0) ? 'white' : 'black';
            } else {
                ctx.fillStyle = (x % 2 === 0) ? 'black' : 'white';
            }
            // Если x и y совпадают с координатами клика, то клетка заливается синим        
            if (clkCellX === x && clkCellY === y) {
                ctx.fillStyle = 'blue';
            }
            ctx.fillRect(
                x * cellWidth,
                y * cellHeight,
                cellWidth,
                cellHeight
            );
        }
    }

    // Перебор в цикле всех возможных комбинаций ходов шахматного коня
    // и заливка конечных точек зелёным
    for (let i = 0; i < 8; i++) {
        const capacity = [[1, 2], [-1, 2], [1, -2], [-1, -2], [2, 1], [2, -1], [-2, 1], [-2, -1]];
        let x = clkCellX + capacity[i][0];
        let y = clkCellY + capacity[i][1];

        ctx.fillStyle = 'limegreen';
        ctx.fillRect(
            x * cellWidth,
            y * cellWidth,
            cellWidth,
            cellWidth
        );
    }

    // Повторный вызов функции при каждом новом клике
    requestAnimationFrame(knightsMove);
}