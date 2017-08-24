import { animate, state, style, transition, trigger } from '@angular/animations';
import {
  AfterContentInit,
  AfterViewChecked,
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Inject,
  Input,
  NgZone,
  OnChanges,
  OnDestroy,
  OnInit, Optional,
  Output,
  ViewChild,
} from '@angular/core';
import { StylerComponent } from '@ngx-kit/styler';
import { KitComponentStyle } from '../meta/component';
import {
  KitCoreOverlayContainerPosition,
  KitCoreOverlayContainerType,
  KitCoreOverlayContainerWidthType,
} from '../meta/overlay';
import { KitThemeService } from '../meta/theme';
import { kitComponentOverlayContainer, kitTheme } from '../meta/tokens';

/**
 * @todo click close
 * @todo dropdown - show at other side if space is not enough
 * @todo improve reposition performance
 * @todo type=side move from edge
 */
@Component({
  selector: 'kit-overlay-container,[kitOverlayContainer]',
  template: `
    <div *ngIf="overlay"
         [@overlay]="{value: overlayTrigger, params: {openTimings: openAnimationTimings, closeTimings: closeAnimationTimings}}"
         styler="overlay">
    </div>
    <div [ngStyle]="holderStyle"
         [@holder]="{value: holderTrigger, params: {openTimings: openAnimationTimings, closeTimings: closeAnimationTimings}}"
         (@holder.done)="holderTriggerDone()"
         #holder
         styler="holder">
      <ng-content></ng-content>
    </div>
  `,
  viewProviders: [
    StylerComponent,
  ],
  animations: [
    trigger('overlay', [
      state('closed', style({opacity: 0})),
      state('opened', style({opacity: 1})),
      transition('* => closed', animate('{{closeTimings}}')),
      transition('* => opened', animate('{{openTimings}}')),
    ]),
    trigger('holder', [
      state('modalClosed', style({transform: 'scale(0)'})),
      state('anchorClosed', style({opacity: 0})),
      state('modalOpened', style({transform: 'scale(1)'})),
      state('anchorOpened', style({opacity: 1})),
      transition('* => modalClosed', animate('{{closeTimings}}')),
      transition('* => anchorClosed', animate('{{closeTimings}}')),
      transition('* => modalOpened', animate('{{openTimings}}')),
      transition('* => anchorOpened', animate('{{openTimings}}')),
    ]),
  ],
})
export class KitOverlayContainerComponent implements OnInit, OnChanges, OnDestroy, AfterViewInit, AfterViewChecked, AfterContentInit {
  @Input() anchor: HTMLElement;

  @ViewChild('holder') holderElement: ElementRef;

  holderStyle = {};

  holderTrigger = 'modalClosed';

  @Input() kitOverlayContainer: any;

  @Output() outsideClick = new EventEmitter<any>();

  @Input() overlay: boolean;

  overlayTrigger = 'closed';

  // for type: side
  @Input() position: KitCoreOverlayContainerPosition;

  /**
   * Overlay types:
   * dropdown - for menus, auto-completes ets
   * side - for tooltips and popups, anchored to component
   * center - modals
   */
  @Input() type: KitCoreOverlayContainerType;

  // for type: dropdown
  @Input() widthType: KitCoreOverlayContainerWidthType;

  private _opened: boolean;

  private clickListener = (event: MouseEvent) => {
    const path = event['path'] || this.getEventPath(event);
    if (this._opened && path.indexOf(this.holderElement.nativeElement) === -1) {
      this.zone.run(() => {
        this.outsideClick.emit(true);
      });
    }
  };

  private reposition = () => {
    switch (this.type) {
      case 'dropdown':
        this.repositionDropdown();
        break;
      case 'side':
        this.repositionSide();
        break;
    }
  };

  constructor(private styler: StylerComponent,
              @Inject(kitComponentOverlayContainer) private componentStyle: KitComponentStyle,
              private zone: NgZone,
              private elementRef: ElementRef,
              @Optional() @Inject(kitTheme) private theme: KitThemeService) {
    this.styler.classPrefix = 'kit-overlay-container';
    this.styler.register(this.componentStyle);
  }

  get closeAnimationTimings(): string {
    return this.theme ? this.theme.overlayCloseAnimationTimings : '0s';
  }

  get openAnimationTimings(): string {
    return this.theme ? this.theme.overlayOpenAnimationTimings : '0s';
  }

  @Input()
  set opened(opened: boolean) {
    this._opened = opened;
    if (opened) {
      this.styler.host.applyState({opened: true});
      this.initListeners();
    } else {
      this.removeListeners();
    }
    this.overlayTrigger = opened ? 'opened' : 'closed';
    this.holderTrigger = opened
        ? this.type === 'center' ? 'modalOpened' : 'anchorOpened'
        : this.type === 'center' ? 'modalClosed' : 'anchorClosed';
  }

  ngAfterContentInit() {
  }

  ngAfterViewChecked() {
  }

  ngAfterViewInit() {
    this.reposition();
  }

  ngOnChanges() {
    this.styler.host.applyState({
      type: this.type,
      position: this.position,
    });
    this.reposition();
  }

  ngOnDestroy() {
    this.removeListeners();
  }

  ngOnInit() {
  }

  holderTriggerDone() {
    if (!this._opened) {
      this.styler.host.applyState({opened: false});
      this.removeListeners();
    }
  }

  initListeners() {
    setTimeout(() => {
      this.zone.runOutsideAngular(() => {
        // @todo use renderer2 (currently it does not have listenGlobal)
        // reposition
        document.addEventListener('scroll', this.reposition, true);
        window.addEventListener('resize', this.reposition, true);
        // outside click
        document.addEventListener('click', this.clickListener);
      });
    }, 1);
  }

  removeListeners() {
    document.removeEventListener('scroll', this.reposition, true);
    window.removeEventListener('resize', this.reposition, true);
    document.removeEventListener('click', this.clickListener);
  }

  private getEventPath(event: Event) {
    const path = [];
    let node = event.target;
    while (node !== document.body) {
      path.push(node);
      node = node['parentNode'];
    }
    return path;
  }

  private repositionDropdown() {
    const rect: ClientRect = this.anchor.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    this.zone.run(() => {
      switch (this.position) {
        case 'top':
          this.holderStyle = {
            position: 'fixed',
            top: `${Math.round(rect.top)}px`,
            left: `${Math.round(rect.left)}px`,
            transform: 'translateY(-100%)',
            width: this.widthType === 'full' ? `${Math.round(this.anchor.offsetWidth)}px` : null,
            maxHeight: `${rect.top - 16}px`,
            overflowY: 'auto',
          };
          break;
        case 'bottom':
          this.holderStyle = {
            position: 'fixed',
            top: `${Math.round(rect.top + this.anchor.offsetHeight)}px`,
            left: `${Math.round(rect.left)}px`,
            width: this.widthType === 'full' ? `${Math.round(this.anchor.offsetWidth)}px` : null,
            maxHeight: `${windowHeight - rect.bottom - 16}px`,
            overflowY: 'auto',
          };
          break;
        case 'left':
          this.holderStyle = {
            position: 'fixed',
            top: `${Math.round(rect.top)}px`,
            left: `${Math.round(rect.left)}px`,
          };
          break;
        case 'right':
          this.holderStyle = {
            position: 'fixed',
            top: `${Math.round(rect.top)}px`,
            left: `${Math.round(rect.right)}px`,
          };
          break;
        default:
          throw new Error('In development!');
      }
    });
  }

  private repositionSide() {
    const rect: ClientRect = this.anchor.getBoundingClientRect();
    this.zone.run(() => {
      switch (this.position) {
        case 'top':
          this.holderStyle = {
            position: 'fixed',
            top: `${Math.round(rect.top)}px`,
            left: `${Math.round(rect.left + this.anchor.offsetWidth / 2)}px`,
            transform: 'translateX(-50%) translateY(-100%)',
          };
          break;
        case 'bottom':
          this.holderStyle = {
            position: 'fixed',
            top: `${Math.round(rect.bottom)}px`,
            left: `${Math.round(rect.left + this.anchor.offsetWidth / 2)}px`,
            transform: 'translateX(-50%)',
          };
          break;
        case 'left':
          this.holderStyle = {
            position: 'fixed',
            top: `${Math.round(rect.top + this.anchor.offsetHeight / 2)}px`,
            left: `${Math.round(rect.left)}px`,
            transform: 'translateX(-100%) translateY(-50%)',
          };
          break;
        case 'right':
          this.holderStyle = {
            position: 'fixed',
            top: `${Math.round(rect.top + this.anchor.offsetHeight / 2)}px`,
            left: `${Math.round(rect.right)}px`,
            transform: 'translateY(-50%)',
          };
          break;
        default:
          throw new Error('In development!');
      }
    });
  }
}
