import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ContentService {
  content = {};

  get(pkg: string) {
    return this.content[pkg];
  }

  set(pkg: string, content: any) {
    this.content[pkg] = content;
  }
}
