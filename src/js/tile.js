const CSS_TILE_CLASS = 'tile';
const CSS_VALUE_CLASS = 'value';

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
  constructor(pos, value, parentElement) {
    this.position = pos;
    this.prevPosition = null;
    this.value = value;
    this.mergedFrom = [];
    this.html = this.createHTMLTile(parentElement);
  }

  createHTMLTile(parentElement) {
    let tile = document.createElement('div');
    tile.className = 'tile';

    let value = document.createElement('p');
    value.className = 'value';
    value.innerHTML = this.value;

    tile.appendChild(value);
    parentElement.appendChild(tile);
    return tile;
  }

  render() {
    setHTMLValue();
    if (prevPosition !== null) {
      // TODO implement animate
      animate();
    }
  }

  setHTMLValue() {
    this.html.querySelector('value').innerHTML = this.value;
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

  didMerge() {
    return this.mergedFrom.length > 0;
  }

  updatePosition(pos) {
    this.position = pos;
  }
}
