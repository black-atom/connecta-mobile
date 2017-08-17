import { Component } from '@angular/core';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  //lazy loading of the pages
  tab1Root = 'ChamadosPage';

  constructor() {

  }
}
