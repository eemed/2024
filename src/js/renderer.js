export default class Renderer {
  constructor(grid) {
    this.grid = grid;
    this.scoreDisplay = document.querySelector('.score-display');
    this.tileArea = document.querySelector('.tile-area');
  }

  render() {
    let values = document.querySelectorAll('.value');

    if (values.length !== this.grid.size ** 2) return;

    for (let i = 0; i < values.length; ++i) {
      values[i].innerHTML = this.grid.getValue(i);
    }
  }
}
