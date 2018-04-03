import { async } from '@angular/core/testing';
import { KitFocusDirective } from './kit-focus.directive';

describe('KitFocusDirective', () => {
  let directive: KitFocusDirective;
  let focusManagerMock: FocusManagerMock;
  let elMock: ElMock;
  beforeEach(async(() => {
    focusManagerMock = new FocusManagerMock();
    elMock = new ElMock();
    directive = new KitFocusDirective(focusManagerMock as any, {nativeElement: elMock});
  }));
  it('should create the directive', () => {
    expect(directive).toBeTruthy();
  });
  it('should register on creation', () => {
    expect(focusManagerMock.directive).toEqual(directive);
  });
  it('should call nativeEl focus', () => {
    const spy = spyOn(elMock, 'focus');
    directive.focus();
    expect(spy).toHaveBeenCalled();
  });
  // @todo should remove on destroy
});

class FocusManagerMock {
  directive: KitFocusDirective;

  add(directive: KitFocusDirective) {
    this.directive = directive;
  }

  remove() {
  }
}

class ElMock {
  focus() {
  }
}
