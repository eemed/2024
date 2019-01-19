import Tile, { Position } from '../tile';

describe('Tile', () => {
  test('Creates a tile', () => {
    const parent = document.createElement('div');
    const tile = new Tile(new Position(0, 0), 4, parent);
    expect(tile.position.x).toBe(0);
    expect(tile.position.y).toBe(0);
    expect(tile.value).toBe(4);
  });

  test('Updates prev position on updateposition', () => {
    const parent = document.createElement('div');
    const tile = new Tile(new Position(0, 0), 4, parent);

    tile.updatePosition(new Position(1, 1));
    expect(tile.prevPosition.x).toBe(0);
    expect(tile.prevPosition.y).toBe(0);

    expect(tile.position.x).toBe(1);
    expect(tile.position.y).toBe(1);
  });
});
