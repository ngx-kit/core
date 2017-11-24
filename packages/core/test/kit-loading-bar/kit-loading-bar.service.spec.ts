import { async } from '@angular/core/testing';
import { NavigationEnd, NavigationStart } from '@angular/router';
import { Subject } from 'rxjs/Subject';
import { KitLoadingBarService } from '../../src/kit-loading-bar/kit-loading-bar.service';
import { KitLoadingBarState } from '../../src/kit-loading-bar/meta';

describe('KitLoadingBarService', () => {
  let service: KitLoadingBarService;
  let routerMock: RouterMock;
  beforeEach(async(() => {
    routerMock = new RouterMock();
    service = new KitLoadingBarService(routerMock as any);
  }));
  it('should create the service', () => {
    expect(service).toBeTruthy();
  });
  it(`should handle navigation start`, () => {
    service.barStateChanges.subscribe(state => expect(state).toEqual(KitLoadingBarState.InProgress));
    routerMock.events.next(new NavigationStart(1, ''));
  });
  it(`should handle navigation end`, () => {
    service.barStateChanges.subscribe(state => expect(state).toEqual(KitLoadingBarState.None));
    routerMock.events.next(new NavigationEnd(1, '', ''));
  });
  it(`should handle custom events state changing`, () => {
    const event = 'custom';
    const sub = service.barStateChanges.subscribe(state => expect(state).toEqual(KitLoadingBarState.InProgress));
    service.start(event);
    sub.unsubscribe();
    service.barStateChanges.subscribe(state => expect(state).toEqual(KitLoadingBarState.None));
    service.end(event);
  });
  it(`should emit starts`, () => {
    const event = 'custom';
    service.starts.subscribe(e => expect(e).toEqual(event));
    service.start(event);
  });
  it(`should emit ends`, () => {
    const event = 'custom';
    service.ends.subscribe(e => expect(e).toEqual(event));
    service.end(event);
  });
});

class RouterMock {
  events = new Subject<any>();
}
