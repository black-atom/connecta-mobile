import { Component } from '@angular/core';
import { ChamadosPage } from '../chamados/chamados';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = ChamadosPage;

  constructor() {

  }
}
