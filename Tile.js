class Position {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

class Tile {
  constructor(x, y, value) {
    this.position = new Position(x, y);
    this.prevPosition = new Position(x, y);
    this.value = value;
  }

  isWinner() {
    return this.value >= 2048;
  }

  merge() {
    this.value = this.value * 2;
  }
}
