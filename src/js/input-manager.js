import { DIRECTION } from './grid';

export const EVENTS = { MOVE: 'move', RESTART: 'restart' };

export default class InputManager {
  constructor() {
    this.events = {};
    this.onEvent = this.onEvent.bind(this);
    document.addEventListener('keydown', e => this.onEvent(e, this.events));
  }

  on(eventName, callback) {
    this.events[eventName] = callback;
  }

  onEvent(event) {
    switch (event.key) {
      case 'ArrowUp':
      case 'w':
        this.events[EVENTS.MOVE](DIRECTION.UP);
        break;
      case 'ArrowDown':
      case 's':
        this.events[EVENTS.MOVE](DIRECTION.DOWN);
        break;
      case 'ArrowRight':
      case 'd':
        this.events[EVENTS.MOVE](DIRECTION.RIGHT);
        break;
      case 'ArrowLeft':
      case 'a':
        this.events[EVENTS.MOVE](DIRECTION.LEFT);
        break;
      case 'r':
        this.events[EVENTS.RESTART]();
        break;
      default:
        break;
    }
  }
}
