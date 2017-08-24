import {
  AfterViewInit,
  Component,
  ContentChild,
  ContentChildren,
  DoCheck,
  forwardRef,
  Inject,
  Input,
  OnInit,
  Optional,
  QueryList,
} from '@angular/core';
import { AbstractControl, FormControlDirective, FormControlName, FormGroupDirective } from '@angular/forms';
import { StylerComponent } from '@ngx-kit/styler';
import 'rxjs/add/observable/combineLatest';
import 'rxjs/add/operator/distinctUntilChanged';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { KitComponentStyle } from '../core/meta/component';
import { kitFormGroupStyle } from '../core/meta/tokens';
import { KitFormErrorComponent } from './kit-form-error.component';

/**
 * @todo process few controls in one group
 */
@Component({
  selector: 'kit-form-group,[kitFormGroup]',
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
  @ContentChild(FormControlDirective) controlDirective: FormControlDirective;

  @ContentChild(FormControlName) controlNameDirective: FormControlName;

  @Input() dirty = false;

  @ContentChildren(forwardRef(() => KitFormErrorComponent)) errors: QueryList<KitFormErrorComponent>;

  @Input() kitFormGroup: any;

  @Input() touched = false;

  private control: AbstractControl;

  private dirty$ = new Subject<boolean>();

  private errors$ = new Subject<string[]>();

  private touched$ = new Subject<boolean>();

  constructor(private styler: StylerComponent,
              @Inject(kitFormGroupStyle) private style: KitComponentStyle,
              @Optional() private form: FormGroupDirective) {
    this.styler.classPrefix = 'kit-form-group';
    this.styler.register(this.style);
  }

  get statusChanges() {
    return Observable.combineLatest<string[], boolean, boolean, {errors: string[], touched: boolean, dirty: boolean}>(
        this.errors$.asObservable()
            // @todo performance issue & non strict compare
            .distinctUntilChanged<string[]>((x: string[], y: string[]) => JSON.stringify(x) === JSON.stringify(y)),
        this.touched$.asObservable().distinctUntilChanged<boolean>(),
        this.dirty$.asObservable().distinctUntilChanged<boolean>(),
        (errors: string[], touched: boolean, dirty: boolean) => {
          return {
            errors,
            touched,
            dirty,
          };
        },
    );
  }

  ngAfterViewInit() {
    if (!this.controlDirective && !this.controlNameDirective) {
      throw new Error('kit-form-group: FormControlDirective/FormControlName not found!');
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

  ngOnInit() {
  }

  hasError(errorCode: string): boolean {
    return this.control && this.control.hasError(errorCode);
  }

  private initControl(): void {
    this.control = (this.controlDirective || this.controlNameDirective).control;
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
