class Grid {
  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.matrix = this.createMatrix(width, height);
  }

  createMatrix(width, height) {
    this.matrix = new Array(height);
    for (let i = 0; i < height; i += 1) {
      this.matrix[i] = new Array(width);
    }
  }
}
