const CSS_TILE_CLASS = 'tile';
const CSS_VALUE_CLASS = 'value';
const TILE_SIZE = 90;
const TILE_GAP = 14; // 2 * 7 the margin of the tiles
const TILE_AREA_PADDING = 4
const TILE_TOTAL = TILE_SIZE + TILE_GAP;

export class Position {
  constructor(x, y) {
    this.x = x;
    this.y = y;
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
      return "#95ffa4"
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

    this.preMerge = this.preMerge.bind(this);
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

  preMerge() {
    // For fast players
    if ( this.mergedFrom.length === 0 ) { return; }

    let tile = this.mergedFrom[0];
    let other = this.mergedFrom[1];


    let prepare = (tile) => {
      if (tile.prevPosition === null) {
        tile.prevPosition = tile.position;
        tile.position = new Position(this.position.x, this.position.y);
      } else {
        tile.position = new Position(this.position.x, this.position.y);
      }
    }

    prepare(tile);
    prepare(other);
  }

  progressMerge(time) {
    // For fast players
    if ( this.mergedFrom.length === 0 ) { return; }

    let tile = this.mergedFrom[0];
    let other = this.mergedFrom[1];
    let tileProg = tile.progress(time);
    let otherProg = other.progress(time);
    return { tileProg, otherProg };
  }

  drawMerge(progress) {
    // For fast players
    if ( this.mergedFrom.length === 0 ) { return; }

    let tile = this.mergedFrom[0];
    let other = this.mergedFrom[1];

    tile.draw(progress.tileProg);
    other.draw(progress.otherProg);
  }

  postMerge() {
    this.html.style.background = getColor(this.value);
    this.removeMerged();
    this.needsAnim = false;
  }


  draw(progress) {
    if (this.prevPosition) {
      let x = this.toPixels(this.prevPosition.x) + progress.x;
      let y = this.toPixels(this.prevPosition.y) + progress.y;
      this.html.style.top = y + "px";
      this.html.style.left = x + "px";
    }
  }

  progress(time) {
    if (this.prevPosition) {
      let progX = (this.position.x - this.prevPosition.x) * TILE_TOTAL * time;
      let progY = (this.position.y - this.prevPosition.y) * TILE_TOTAL * time;
      return { x: progX, y: progY };
    } else {
      return;
    }
  }

  post() {
    this.prevPosition = null;
    this.needsAnim = false;
  }

  toPixels(coord) {
    return coord * TILE_TOTAL + TILE_AREA_PADDING;
  }

  instantRender() {
    this.html.style.left = this.toPixels(this.position.x) + "px";
    this.html.style.top = this.toPixels(this.position.y) + "px";
    this.html.style.background = getColor(this.value)
  }

  removeHTML() {
    this.parent.removeChild(this.html);
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
