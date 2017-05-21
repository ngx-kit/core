import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';

import { KitIcon, KitIconCached } from './interfaces';

/**
 * @todo cache pending (avoid parallel loading of same icon)
 */

@Injectable()
export class KitIconRegistryService {

  private icons: KitIcon[] = [];
  private cache: KitIconCached[] = [];

  constructor(private http: Http) {
  }

  register(name: string, url: string) {
    this.icons.push({name, url});
  }

  registerSet(icons: KitIcon[]) {
    this.icons = [...this.icons, ...icons];
  }

  get(name: string): Observable<SVGElement> {
    const icon = this.icons.find(i => i.name === name);
    if (icon) {
      // check cache
      const cached = this.cache.find(c => c.name === name);
      if (cached) {
        return Observable.of(this.cloneSvg(cached.svg));
      } else {
        return this.http.get(icon.url)
            .map(r => r.text())
            .map(this.svgElementFromString)
            .do(svg => this.cache.push({name, svg: svg}))
            .map(this.cloneSvg)
      }
    } else {
      throw new Error(`Icon "${name} not found!`);
    }
  }

  /**
   * Creates a DOM element from the given SVG string.
   */
  private svgElementFromString(str: string): SVGElement {
    const div = document.createElement('DIV');
    div.innerHTML = str;
    const svg = div.querySelector('svg') as SVGElement;
    return svg;
  }

  cloneSvg(svg: SVGElement): SVGElement {
    return svg.cloneNode(true) as SVGElement;
  }

}