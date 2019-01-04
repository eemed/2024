const CSS_TILE_CLASS = 'tile';
const CSS_VALUE_CLASS = 'value';
const TILE_SIZE = 90;
const TILE_GAP = 10;
const TILE_TOTAL = TILE_SIZE + TILE_GAP;

export class Position {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  serialize() {
    return { x: this.x, y: this.y };
  }

  clone() {
    return new Position(this.x, this.y);
  }

  multiply(multiplier) {
    this.x *= multiplier;
    this.y *= multiplier;
    return this;
  }
}

export function getColor(value) {
  switch (value) {
    case 2:
      return "#a6b3cc"
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
      return "#100e23"
  }
}

export default class Tile {
  constructor(pos, value, parentElement) {
    this.position = pos;
    this.prevPosition = null;
    this.value = value;
    this.mergedFrom = [];
    this.html = this.createHTMLTile(parentElement);

    this.instantRender();
  }

  createHTMLTile(parentElement) {
    console.log('create')
    let tile = document.createElement('div');
    tile.className = CSS_TILE_CLASS;

    let value = document.createElement('p');
    value.className = CSS_VALUE_CLASS;
    value.innerHTML = this.value;

    tile.appendChild(value);
    parentElement.appendChild(tile);
    return tile;
  }

  render() {
    this.setHTMLValue();

    if (this.prevPosition != null) {
      if ( this.prevPosition.x !== this.position.x ||
        this.prevPosition.y !== this.position.y) {

        this.animate();
      }
    }
  }

  animate() {
    let id = setInterval(frame, 5, this);

    let from = this.prevPosition.clone().multiply(TILE_TOTAL);
    let to = this.position.clone().multiply(TILE_TOTAL);

    function frame(tile) {
      if (from.x === to.x && from.y === to.y) {
        clearInterval(id);
        tile.prevPosition = null;
      } else if (from.x > to.x) {
        from.x -= 1;
      } else if (from.x < to.x) {
        from.x += 1;
      } else if (from.y > to.y) {
        from.y -= 1;
      } else if (from.y < to.y) {
        from.y += 1;
      }

      tile.html.style.top = from.y + "px";
      tile.html.style.left = from.x + "px";
    }
  }


  instantRender() {
    this.html.style.left = this.position.x * (TILE_TOTAL) + "px";
    this.html.style.top  = this.position.y * (TILE_TOTAL) + "px";
  }

  setHTMLValue() {
    this.html.querySelector('.value').innerHTML = this.value;
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
    console.log('update Position', this.position, pos)
    this.prevPosition = this.position;
    this.position = pos;
  }
}
