import { HostListener, Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

/*
  Generated class for the NetwordStatusProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class NetwordStatusProvider {
  @HostListener('window:online')
  setOnlineStatus(){
    console.log("I`m online");
  }

  @HostListener('window:offline')
  setOfflineStatus(){
    console.log("I`m offline");
  }

}
