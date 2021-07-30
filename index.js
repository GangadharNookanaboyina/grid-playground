class Playground {

    /**
     * @param {number} width 
     * @param {number} height 
     * @param {Array<number>} cells 
     */
    constructor(width, height, cells) {
        this.width = width
        this.height = height
        this.cells = cells
    }

    /**
     * @returns {Playground}
     */
    new() {
        let width = 64, height = 64
        let cells = [...Array(width * height).keys()].map(i => i % 2 || i % 7 === 0)

        return new Playground(width, height, cells)
    }

    getIndex(row, col) {
        return row * this.width + col
    }

    liveNeighbourCount(row, col) {
        let count = 0
        for (let otherRow of [this.height - 1, 0, 1]) {
            for (let otherCol of [this.width - 1, 0, 1]) {
                if (otherRow === 0 && otherCol === 0) continue

                let neighbourRow = (row + otherRow) % this.height
                let neighbourCol = (col + otherCol) % this.width
                let index = this.getIndex(neighbourRow, neighbourCol)

                count += this.cells[index]
            }
        }
        return count
    }

    next() {
        let futureCells = [...this.cells]
        
        for (let row = 0; row < this.height; row++) {
            for (let col = 0; col < this.width; col++) {
                let index = this.getIndex(row, col)
                let cell = this.cells[index]
                let liveNeighbours = this.liveNeighbourCount(row, col)

                let nextCell = cell
                if (cell && (liveNeighbours < 2 || liveNeighbours > 3)) {
                    nextCell = 0
                } else if (cell && (liveNeighbours === 2 || liveNeighbours === 3)) {
                    nextCell = 1
                } else if (!cell && liveNeighbours === 3) {
                    nextCell = 1
                }

                futureCells[index] = nextCell
            }
        }

        this.cells = futureCells
    }
}

const CELL_SIZE = 10
const BG_COLOR = "#111111"
const DEAD_COLOR = "#000000"
const ALIVE_COLOR = "#00c853"

const ground = (new Playground()).new()
const width = ground.width
const height = ground.height

const canvas = document.getElementById("viewport")
canvas.width = (CELL_SIZE + 1) * width + 1
canvas.height = (CELL_SIZE + 1) * height + 1

const ctx = canvas.getContext("2d")

const drawGrid = () => {
  ctx.beginPath();
  ctx.strokeStyle = BG_COLOR;

  for (let i = 0; i <= width; i++) {
    ctx.moveTo(i * (CELL_SIZE + 1) + 1, 0);
    ctx.lineTo(i * (CELL_SIZE + 1) + 1, (CELL_SIZE + 1) * height + 1);
  }

  for (let j = 0; j <= height; j++) {
    ctx.moveTo(0, j * (CELL_SIZE + 1) + 1);
    ctx.lineTo((CELL_SIZE + 1) * width + 1, j * (CELL_SIZE + 1) + 1);
  }

  ctx.stroke();
}

const drawCells = () => {
    const cells = ground.cells
    ctx.beginPath();

    for (let row = 0; row < height; row++) {
        for (let col = 0; col < width; col++) {
            const index = ground.getIndex(row, col)

            ctx.fillStyle = cells[index] ? ALIVE_COLOR : DEAD_COLOR

            ctx.fillRect(
                col * (CELL_SIZE + 1) + 1,
                row * (CELL_SIZE + 1) + 1,
                CELL_SIZE,
                CELL_SIZE
            );
        }
    }

    ctx.stroke();
}

const drawLoop = () => {
    ground.next()
    drawGrid()
    drawCells()
    requestAnimationFrame(drawLoop)    
}

drawGrid()
drawCells()
requestAnimationFrame(drawLoop)    
