import {
  AfterViewInit, Component, ContentChild, ContentChildren, DoCheck, forwardRef, HostBinding, Inject,
  Input, OnInit, Optional,
  QueryList
} from '@angular/core';
import { AbstractControl, FormControlDirective, FormGroupDirective } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/observable/combineLatest';

import { kitComponentFormGroup, KitFormGroupStyle } from '@ngx-kit/core';
import { StylerComponent } from '@ngx-kit/styler';

import { KitFormErrorComponent } from '../kit-form-error/kit-form-error.component';

/**
 * @todo process few controls in one group
 */
@Component({
  selector: 'kit-form-group',
  template: `
    <div>
      <ng-content select="kit-form-label"></ng-content>
    </div>
    <div>
      <ng-content></ng-content>
    </div>
  `,
  viewProviders: [
    StylerComponent,
  ],
})
export class KitFormGroupComponent implements OnInit, AfterViewInit, DoCheck {

  @Input() touched: boolean = false;
  @Input() dirty: boolean = false;

  @ContentChild(FormControlDirective) controlDirective: FormControlDirective;
  @ContentChildren(forwardRef(() => KitFormErrorComponent)) errors: QueryList<KitFormErrorComponent>;

  @HostBinding('attr.sid') get sid() {
    return this.styler.host.sid;
  }

  private errors$ = new Subject<string[]>();
  private touched$ = new Subject<boolean>();
  private dirty$ = new Subject<boolean>();
  private control: AbstractControl;

  constructor(private styler: StylerComponent,
              @Inject(kitComponentFormGroup) private style: KitFormGroupStyle,
              @Optional() private form: FormGroupDirective) {
    this.styler.register(this.style.getStyles());
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    if (!this.controlDirective) {
      throw new Error('kit-form-group: FormControlDirective not found!');
    }
    this.initControl();
    this.initErrors();
    this.initStyling();
  }

  ngDoCheck() {
    // @todo improve performance (to much checks)
    if (this.control) {
      this.errors$.next(this.control.errors ? Object.keys(this.control.errors) : []);
      this.touched$.next(this.control.touched);
      this.dirty$.next(this.control.dirty);
    }
  }

  hasError(errorCode: string): boolean {
    return this.control && this.control.hasError(errorCode);
  }

  get statusChanges() {
    return Observable.combineLatest(this.errors$
        // @todo performance issue & non strict compare
            .distinctUntilChanged((x, y) => JSON.stringify(x) === JSON.stringify(y)),
        this.touched$.distinctUntilChanged(),
        this.dirty$.distinctUntilChanged(),
        (errors: string, touched: boolean, dirty: boolean) => {
          return {
            errors,
            touched,
            dirty,
          };
        }
    );
  }

  private initControl(): void {
    this.control = this.controlDirective.control;
  }

  private initErrors(): void {
    if (this.errors) {
      this.errors.forEach(error => {
        error.init();
      });
    }
  }

  private initStyling(): void {
    this.statusChanges.subscribe(status => {
      const hasError = status.errors.length > 0;
      const visible = hasError && (!this.touched || status.touched) && (!this.dirty || status.dirty);
      this.styler.host.applyState({error: visible});
    });
  }

}
