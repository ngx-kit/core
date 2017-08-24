import { ChangeDetectorRef, Component, forwardRef, Inject, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { StylerComponent } from '@ngx-kit/styler';
import { Subject } from 'rxjs/Subject';
import { KitCoreService } from '../core/kit-core.service';
import { KitComponentStyle } from '../core/meta/component';
import { KitControl } from '../core/meta/control';
import { kitToggleStyle } from '../core/meta/tokens';

export const KIT_TOGGLE_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => KitToggleComponent),
  multi: true,
};

/**
 * @todo checkbox-group
 */
@Component({
  selector: 'kit-toggle,[kitToggle]',
  template: `
    <span styler="toggle">
        <input [id]="id"
               [ngModel]="state"
               (ngModelChange)="updateValue($event)"
               type="checkbox"
               styler="input">
        <span [styler]="['view', {checked: !!state}]">
          <span [styler]="['viewInner', {checked: !!state}]"></span>
        </span>
      </span>
    <label [attr.for]="id" styler="label">
      <ng-content></ng-content>
    </label>
  `,
  providers: [KIT_TOGGLE_VALUE_ACCESSOR],
  viewProviders: [
    StylerComponent,
  ],
})
export class KitToggleComponent implements ControlValueAccessor, KitControl<any> {
  id: string;

  @Input() kitToggle: any;

  state: any;

  private changes$ = new Subject<number>();

  // @todo do not change if disabled
  private isDisabled = false;

  private touches$ = new Subject<boolean>();

  constructor(private styler: StylerComponent,
              @Inject(kitToggleStyle) private style: KitComponentStyle,
              private core: KitCoreService,
              private cdr: ChangeDetectorRef) {
    this.styler.classPrefix = 'kit-toggle';
    this.styler.register(this.style);
    this.id = this.core.uuid();
  }

  registerOnChange(fn: any) {
    this.changes$.subscribe(fn);
  }

  registerOnTouched(fn: any) {
    this.touches$.subscribe(fn);
  }

  setDisabledState(isDisabled: boolean) {
    this.isDisabled = isDisabled;
  }

  updateValue(value: any) {
    this.writeValue(value);
    this.changes$.next(value);
    this.touches$.next(true);
  }

  writeValue(value: any) {
    this.state = value;
    this.cdr.markForCheck();
  }
}
