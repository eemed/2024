/**
 * @jest-environment jsdom
 */
import Grid from '../grid';
import Tile, { Position } from '../tile';

describe('Grid', () => {
  test('Creates a 4x4 empty matrix', () => {
    const grid = new Grid();
    expect(grid.matrix.length).toBe(4);
    expect(grid.matrix[0].length).toBe(4);
    expect(grid.size).toBe(4);
  });

  test('Insert tile to (1,1) and (1,2) and swap them',
    () => {
      const parent = document.createElement('div');

      const grid = new Grid();
      const tile = new Tile(new Position(1, 1), 2, parent);
      grid.insertTile(tile);

      const other = new Tile(new Position(2, 2), 4, parent);
      grid.insertTile(other);

      // Tile (1,1) is position 5
      expect(grid.getTile(5).value).toBe(tile.value);
      // Tile (2,2) is position 10
      expect(grid.getTile(10).value).toBe(other.value);

      grid.swapTiles(tile.position, other.position);

      expect(grid.getTile(5).value).toBe(other.value);
      expect(grid.getTile(10).value).toBe(tile.value);
    });
});
