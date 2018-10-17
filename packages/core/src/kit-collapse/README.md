### Scope
 
* Accordions
* Collapsible menus


### Usage

Import `KitCollapseModule`.

For example you have `ui-menu`, `ui-section` component and want to collapse some div inside section.

Provide `KitCollapseHostService` inside `ui-menu` and `KitCollapseItemService` inside `ui-section`. 

```html
<ui-menu>
  <ui-section>
    <div title>Section 1 title</div>
    <div>Section 1 body</div>
  </ui-section>
  <ui-section>
    <div title>Section 2 title</div>
    <div>Section 2 body</div>
  </ui-section>
</ui-menu>
```

##### ui-section.component.html

```html
<div (click)="toggle()">
  <ng-content select="[title]"></ng-content>
</div>
<div *kitCollapse>
  <ng-content></ng-content>
</div>
```

Use `KitCollapseItemService` for set state of collapse.

##### ui-section.component.ts

```typescript
providers: [KitCollapseItemService]
...
constructor(private itemService: KitCollapseItemService) {
}
...
toggle() {
  this.itemService.toggle();
}
```


### Example

* collection:accordion - [sources](https://github.com/ngx-kit/ngx-kit/tree/master/packages/collection/lib/ui-accordion), [demo](http://ngx-kit.com/collection/module/ui-accordion) 
* collection:vertical-menu - [sources](https://github.com/ngx-kit/ngx-kit/tree/master/packages/collection/lib/ui-vertical-menu), [demo](http://ngx-kit.com/collection/module/ui-vertical-menu) 
