var direction = { "up": 1, "down": 2, "left": 3, "right": 4 };
Object.freeze(direction);

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

  push(dir) {
    switch (dir) {
      case direction.up:
        this.pushUp();
        break;
      case direction.down:
        this.pushDown();
        break;
      case direction.left:
        this.pushLeft();
        break;
      case direction.right:
        this.pushRight();
        break;
      default:
        break;
    }
  }

  pushUp() {
  }

  pushDown() {
    
  }

  pushLeft() {
    
  }

  pushRight() {
    
  }
}
