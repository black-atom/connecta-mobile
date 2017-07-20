import { Component } from '@angular/core';

import { AboutPage } from '../about/about';
import { ContactPage } from '../contact/contact';
import { ChamadosPage } from '../chamados/chamados';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = ChamadosPage;

  constructor() {

  }
}
