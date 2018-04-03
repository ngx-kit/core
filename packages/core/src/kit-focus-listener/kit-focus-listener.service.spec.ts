import { async } from '@angular/core/testing';
import { KitFocusListenerService } from './kit-focus-listener.service';

describe('KitFocusListenerService', () => {
  let service: KitFocusListenerService;
  let emStub: EventManagerStub;
  beforeEach(async(() => {
    emStub = new EventManagerStub();
    service = new KitFocusListenerService(emStub as any);
  }));
  it('should create the service', () => {
    expect(service).toBeTruthy();
  });
  describe('.add()', () => {
    it('adds listener', () => {
      const spy = spyOn(emStub, 'addEventListener');
      service.add(true as any);
      expect(spy).toHaveBeenCalled();
    });
    it('emits focus on gains focus', (done) => {
      const elSample = document.createElement('div');
      service.focus.subscribe(() => {
        expect(true).toBeTruthy();
        done();
      });
      service.add(elSample);
      emStub.emitFocus();
    });
    it('emits blur on loosing focus', (done) => {
      const elSample = document.createElement('div');
      service.blur.subscribe(() => {
        expect(true).toBeTruthy();
        done();
      });
      service.add(elSample);
      emStub.emitBlur();
    });
  });
});

class EventManagerStub {
  focusHandler: Function;

  blurHandler: Function;

  emitFocus() {
    this.focusHandler({});
  }

  emitBlur() {
    this.blurHandler({});
  }

  addEventListener(el: any, type: string, handler: Function) {
    if (type === 'focus') {
      this.focusHandler = handler;
    }
    if (type === 'blur') {
      this.blurHandler = handler;
    }
  }
}
