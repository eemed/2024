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
    this.parent = parentElement;
    this.needsAnim = false;

    this.draw = this.draw.bind(this);
    this.progress = this.progress.bind(this);
    this.post = this.post.bind(this);

    this.drawMerge = this.drawMerge.bind(this);
    this.progressMerge = this.progressMerge.bind(this);
    this.postMerge = this.postMerge.bind(this);

    this.instantRender();
  }

  createHTMLTile(parentElement) {
    let tile = document.createElement('div');
    tile.className = CSS_TILE_CLASS;

    let value = document.createElement('p');
    value.className = CSS_VALUE_CLASS;
    value.innerHTML = this.value;

    tile.appendChild(value);
    parentElement.appendChild(tile);
    return tile;
  }

  removeMerged() {
    for (let i = 0; i < this.mergedFrom.length; ++i) {
      this.parent.removeChild(this.mergedFrom[i].html);
    }
    this.mergedFrom = [];
  }

  progressMerge(time) {
    let tile = this.mergedFrom[0];
    let other = this.mergedFrom[1];
    let tileProg = tile.progress(time);
    let otherProg = other.progress(time);
    return { tileProg, otherProg };
  }

  drawMerge(progress) {
    let tile = this.mergedFrom[0];
    let other = this.mergedFrom[1];

    tile.draw(progress.tileProg);
    tile.draw(progress.otherProg);
  }

  postMerge() {
    this.removeMerged();
    this.needsAnim = false;
  }


  draw(progress) {
    let x = this.prevPosition.x * TILE_TOTAL + progress.x;
    let y = this.prevPosition.y * TILE_TOTAL + progress.y;
    this.html.style.top = y + "px";
    this.html.style.left = x + "px";
  }

  progress(time) {
    let progX = (this.position.x - this.prevPosition.x) * TILE_TOTAL * time;
    let progY = (this.position.y - this.prevPosition.y) * TILE_TOTAL * time;
    return { x: progX, y: progY };
  }

  post() {
    this.prevPosition = null;
    this.needsAnim = false;
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
    if (this.mergedFrom.length > 2) { 
      console.error('mergedFrom array too large', this.mergedFrom.length);
      return;
    }

    this.mergedFrom.push(tile);
    this.mergedFrom.push(otherTile);
  }

  clearMergedFrom() {
    this.mergedFrom = [];
  }

  didMerge() {
    return this.mergedFrom.length > 0;
  }

  requestAnimation() {
    this.needsAnim = true;
  }

  needsAnimation() {
    return needsAnim;
  }

  updatePosition(pos) {
    this.prevPosition = this.position;
    this.position = pos;
  }
}
