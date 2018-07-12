var size = 3;
var EMPTY = '&nbsp;';
var boxes = [];
var turn = 'X';
var score;
var moves;

function main() {
    var board = document.createElement('table');
    board.setAttribute('border', 1);
    board.setAttribute('cellspacing', 0);

    var identifier = 1;
    for (var i = 0; i < size; i++) {
        var row = document.createElement('tr');
        board.appendChild(row);
        for (var j = 0; j < size; j++) {
            var cell = document.createElement('td');
            cell.setAttribute('height', 200);
            cell.setAttribute('width', 200);
            cell.setAttribute('align', 'center');
            cell.setAttribute('valign', 'center');
            cell.classList.add('collumn' + j, 'row' + i);
            if (i == j) {
                cell.classList.add('diagonalrtl');
            }
            if (j == size - i - 1) {
                cell.classList.add('diagonalltr');
            }
            cell.identifier = identifier;
            cell.addEventListener('click', check_status);
            row.appendChild(cell);
            boxes.push(cell);
            identifier += identifier;
        }
    }

    document.getElementById('tictactoe').appendChild(board);
    NewGame();
}

function NewGame() {
    score = { 'X': 0, 'O': 0 };
    moves = 0;
    turn = 'X';
    boxes.forEach(function(square) {
        square.innerHTML = EMPTY;
    });
}

function win(clicked) {
    var memberOf = clicked.className.split(/\s+/);
    for (var i = 0; i < memberOf.length; i++) {
        var testClass = '.' + memberOf[i];
        var items = contains('#tictactoe ' + testClass, turn);
        if (items.length == size) {
            return true;
        }
    }
    return false;
}

function contains(selector, text) {
    var elements = document.querySelectorAll(selector);
    return [].filter.call(elements, function(element) {
        return RegExp(text).test(element.textContent);
    });
}

function check_status() {
    if (this.innerHTML !== EMPTY) {
        return;
    }
    this.innerHTML = turn;
    moves += 1;
    score[turn] += this.identifier;
    if (win(this)) {
        document.getElementById('turn').textContent = 'Winner: Player ' + turn;
        NewGame();
    } else if (moves === size * size) {
        document.getElementById('turn').textContent = 'Draw';
        NewGame();
    } else {
        if (turn === 'X') {
            turn = 'O';
        } else if (turn === 'O') {
            turn = 'X';
        }
        document.getElementById('turn').textContent = 'Player\'s ' + turn + ' turn';
    }
}

main();