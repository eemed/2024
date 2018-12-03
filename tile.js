class Position {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  serialize() {
    return { x: this.x, y: this.y };
  }
}

class Tile {
  constructor(pos, value) {
    this.position = pos;
    this.prevPosition = new Position(pos.x, pos.y);
    this.value = value;
  }

  isWinner() {
    return this.value >= 2048;
  }

  doubleValue() {
    this.value = this.value * 2;
  }

  serialize() {
    return {
      position: this.position.serialize(),
      prevPosition: this.prevPosition.serialize();
      value: this.value
    };
  }
}
