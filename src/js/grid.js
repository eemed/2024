import Tile, { Position } from './tile';

export const DIRECTION = {
  UP: 1, DOWN: 2, LEFT: 3, RIGHT: 4,
};

/*
          X
    +------------>
    | 0,0   1,0
    |
 Y  | 0,1
    |
    V
*/
export default class Grid {
  constructor(size) {
    this.size = size;
    this.matrix = this.createMatrix();
  }

  createMatrix() {
    const matrix = new Array(this.size);
    for (let i = 0; i < this.size; i += 1) {
      matrix[i] = new Array(this.size);
    }

    // Initialize array with null values
    for (let i = 0; i < this.size; i += 1) {
      for (let j = 0; j < this.size; j += 1) {
        matrix[i][j] = null;
      }
    }
    return matrix;
  }

  getTile(i) {
    if (i < 0 || i > (this.size ** 2) - 1) return '';

    let position = i;
    let row = 0;
    while (position >= 4) {
      position -= this.size;
      row += 1;
    }

    const tile = this.matrix[position][row];
    if (!tile) { return null; }
    return tile;
  }

  insertTileTo(x, y, value) {
    this.matrix[x][y] = new Tile(x, y, value);
  }

  insertTile(tile) {
    this.matrix[tile.position.x][tile.position.y] = tile;
  }

  swapTiles(pos, pos2) {
    const tmp = this.matrix[pos2.x][pos2.y];
    this.matrix[pos2.x][pos2.y] = this.matrix[pos.x][pos.y];
    this.matrix[pos.x][pos.y] = tmp;
  }

  removeTile(x, y) {
    this.matrix[x][y] = null;
  }

  eachTile(callback) {
    for (let x = 0; x < this.size; x += 1) {
      for (let y = 0; y < this.size; y += 1) {
        callback(x, y, this.matrix[x][y]);
      }
    }
  }

  // debug() {
  //   this.eachTile((x, y, tile) => {
  //     if (tile) {
  //       console.log('(', tile.position.x,
  //         ',', tile.position.y, '), with value ', tile.value);
  //     }
  //   });
  // }

  moveTile(tile, to) {
    const from = tile.position;
    this.matrix[to.x][to.y] = this.matrix[from.x][from.y];
    this.removeTile(from.x, from.y);

    tile.requestAnimation();
    tile.updatePosition(new Position(to.x, to.y));
  }

  eachRow(callback) {
    const rows = this.getRows();
    for (let i = 0; i < rows.length; i += 1) {
      callback(rows[i]);
    }
  }

  eachColumn(callback) {
    const columns = this.getColumns();
    for (let i = 0; i < columns.length; i += 1) {
      callback(columns[i]);
    }
  }

  getRows() {
    const columns = [];
    for (let y = 0; y < this.size; y += 1) {
      const column = [];
      for (let x = 0; x < this.size; x += 1) {
        column.push(this.matrix[x][y]);
      }
      columns.push(column);
    }
    return columns;
  }

  getColumns() {
    const rows = [];
    for (let x = 0; x < this.size; x += 1) {
      const row = [];
      for (let y = 0; y < this.size; y += 1) {
        row.push(this.matrix[x][y]);
      }
      rows.push(row);
    }
    return rows;
  }

  isFull() {
    return this.unusedTiles().length === 0;
  }

  getRandomUnusedTile() {
    const unusedPositions = this.unusedTiles();
    return unusedPositions[Math.floor(Math.random() * unusedPositions.length)];
  }

  unusedTiles() {
    const positions = [];
    this.eachTile((x, y, tile) => {
      if (!tile) {
        positions.push(new Position(x, y));
      }
    });
    return positions;
  }

  getAdjacentTiles(tile) {
    const tiles = [];
    let adj = null;

    if (tile.position.x > 0) {
      adj = this.matrix[tile.position.x - 1][tile.position.y];
      if (adj) { tiles.push(adj); }
    }

    if (tile.position.x < this.size - 1) {
      adj = this.matrix[tile.position.x + 1][tile.position.y];
      if (adj) { tiles.push(adj); }
    }

    if (tile.position.y > 0) {
      adj = this.matrix[tile.position.x][tile.position.y - 1];
      if (adj) { tiles.push(adj); }
    }

    if (tile.position.y < this.size - 1) {
      adj = this.matrix[tile.position.x][tile.position.y + 1];
      if (adj) { tiles.push(adj); }
    }
    return tiles;
  }
}
