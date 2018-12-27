import { DIRECTION } from './grid';
export const EVENTS = { 'MOVE': 'move', 'RESTART': 'restart' };

export default class InputManager {
  constructor() {
    this.events = {};
    this.onEvent.bind(this);
    this.addEventListeners();
    console.log(this.events)
  }

  on(eventName, callback) {
    this.events[eventName] = callback;
  }

  onEvent(event, events) {
    switch (event.key) {
      case 'ArrowUp':
      case 'w':
        events[EVENTS.MOVE](DIRECTION.UP);
        break;
      case 'ArrowDown':
      case 's':
        events[EVENTS.MOVE](DIRECTION.DOWN);
        break;
      case 'ArrowRight':
      case 'd':
        events[EVENTS.MOVE](DIRECTION.RIGHT);
        break;
      case 'ArrowLeft':
      case 'a':
        events[EVENTS.MOVE](DIRECTION.LEFT);
        break;
      default:
        break;
    }
  }

  addEventListeners() {
    document.addEventListener('keydown', (e) => this.onEvent(e, this.events));
  }
}

// Javascript keycode for l: 76
// Javascript keycode for k: 75
// Javascript keycode for j: 74
// Javascript keycode for h: 72
