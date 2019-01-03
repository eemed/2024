export class Position {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  serialize() {
    return { x: this.x, y: this.y };
  }
}

export function getColor(value) {
  switch (value) {
    case 2:
      return "#100e23"
    case 4:
      return "#565575"
    case 8:
      return "#ffe9aa"
    case 16:
      return "#ff8080"
    case 32:
      return "##95ffa4"
    case 64:
      return "#91ddff"
    case 128:
      return "#c991e1"
    case 256:
      return "#aaffe4"
    case 512:
      return "#cbe3e7"
    case 1024:
      return "#ff5458"
    case 2048:
      return "#65b2ff"
    default:
      return "#a6b3cc"
  }
}

export default class Tile {
  constructor(pos, value, identifier) {
    this.identifier = identifier;
    this.position = pos;
    this.prevPosition = null;
    this.value = value;
    this.mergedFrom = [];
  }

  isWinner() {
    return this.value >= 2048;
  }

  serialize() {
    return {
      position: this.position.serialize(),
      prevPosition: this.prevPosition.serialize(),
      value: this.value,
    };
  }

  setMergedFrom(tile, otherTile) {
    if (this.mergedFrom.length > 2) { return; }

    this.mergedFrom.push(tile);
    this.mergedFrom.push(otherTile);
  }

  clearMergedFrom() {
    this.mergedFrom = [];
  }

  isMerged() {
    return this.mergedFrom.length > 0;
  }

  updatePosition(pos) {
    this.position = pos;
  }
}
