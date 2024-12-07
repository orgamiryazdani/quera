class WordSearch {
    constructor(grid) {
        this.grid = grid;
        this.directions = [
            { dx: 0, dy: 1 },
            { dx: 0, dy: -1 },
            { dx: 1, dy: 0 },
            { dx: -1, dy: 0 }
        ];
    }

    find(word) {
        this.clearHighlights();

        const rows = this.grid.length;
        const cols = this.grid[0].length;

        for (let row = 0; row < rows; row++) {
            for (let col = 0; col < cols; col++) {
                for (const dir of this.directions) {
                    if (this.checkDirection(row, col, word, dir)) {
                        return true;
                    }
                }
            }
        }
        return false;
    }

    checkDirection(startRow, startCol, word, direction) {
        const rows = this.grid.length;
        const cols = this.grid[0].length;
        const wordLength = word.length;

        const endRow = startRow + (wordLength - 1) * direction.dx;
        const endCol = startCol + (wordLength - 1) * direction.dy;

        if (endRow < 0 || endRow >= rows || endCol < 0 || endCol >= cols) {
            return false;
        }

        for (let i = 0; i < wordLength; i++) {
            const currentRow = startRow + i * direction.dx;
            const currentCol = startCol + i * direction.dy;

            if (this.grid[currentRow][currentCol].toLowerCase() !== word[i].toLowerCase()) {
                return false;
            }
        }

        this.highlightWord(startRow, startCol, word, direction);
        return true;
    }

    highlightWord(startRow, startCol, word, direction) {
        const wordLength = word.length;
        const divs = document.querySelectorAll('.letter');

        for (let i = 0; i < wordLength; i++) {
            const currentRow = startRow + i * direction.dx;
            const currentCol = startCol + i * direction.dy;
            const index = currentRow * this.grid[0].length + currentCol;
            divs[index].classList.add('highlight');
        }
    }

    clearHighlights() {
        const divs = document.querySelectorAll('.letter');
        divs.forEach(div => div.classList.remove('highlight'));
    }
}

function updateGrid() {
    const textareaValue = document.getElementById('grid-input').value;
    if (textareaValue.trim()) {
        const matrix_input = document.querySelector('.matrix-input');
        const game = document.querySelector('.game');
        const word_grid = document.querySelector('#word-grid');
        word_grid.innerHTML = '';
        game.style.display = "block";
        matrix_input.style.display = "none";
        const lines = textareaValue.trim().split('\n');
        for (let i = 0; i < lines.length; i++) {
            const row = lines[i].split('');
            word_grid.style.gridTemplateColumns = `repeat(${row.length}, 1fr)`;
            row.forEach(element => {
                const divEl = document.createElement('div');
                divEl.classList.add('letter');
                divEl.textContent = element;
                word_grid.appendChild(divEl);
            });
        }
    }
}

function findWord() {
    const word = document.getElementById("word-input").value.trim();
    const input = document.getElementById("grid-input").value.trim();
    const rows = input.split('\n').map(row => row.split(''));
    const wordSearch = new WordSearch(rows);
    const result = wordSearch.find(word);
    const resultDiv = document.getElementById("result");
    resultDiv.textContent = result ? `Result for "${word}": Found` : `Result for "${word}": Not found`;
}