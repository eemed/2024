const direction = { "up": 1, "down": 2, "left": 3, "right": 4 };
Object.freeze(direction);

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

  unusedTiles() {
    const positions = [];

    this.eachTile(function (x, y, tile) {
      if (!tile) {
        positions.push(new Position(x,y));
      }
    });
    return positions;
  }

  eachTile(callback) {
    for (let x = 0; x < this.size; x += 1) {
      for (let y = 0; y < this.size; y += 1) {
        callback(x, y, this.matrix[x][y]);
      }
    }
  }
}
const grid = new Grid(4);
