const direction = { "up": 1, "down": 2, "left": 3, "right": 4 };

class Grid {
  constructor(size) {
    this.size = size;
    this.matrix = this.createMatrix();
  }

  createMatrix() {
    this.matrix = new Array(this.size);
    for (let i = 0; i < this.size; i += 1) {
      this.matrix[i] = new Array(this.size);
    }

    // Initialize array with null values
    for (let i = 0; i < this.size; i += 1) {
      for (let j = 0; j < this.size; j += 1) {
        this.matrix[i][j] = null;
      }
    }
    console.log(this.matrix);
  }

  insertTile(x, y, value) {
    matrix[x][y] = new Tile(x, y, value);
  }

  removeTile(x, y) {
    matrix[x][y] = null;
  }

  eachTile(callback) {
    for (let x = 0; x < this.size; x += 1) {
      for (let y = 0; y < this.size; y += 1) {
        callback(x, y, this.matrix[x][y]);
      }
    }
  }

  getRandomUnusedTile() {
    const unusedPositions = this.unusedTiles;
    return unusedPosition[Math.floor(Math.random() * unusedPositions.length)];
  }

  unusedTiles() {
    const positions = [];

    this.eachTile(function (x, y, tile) {
      if (!tile) {
        positions.push(new Position(x,y));
      }
    });
    return positions;
  }
}
const grid = new Grid(4);
