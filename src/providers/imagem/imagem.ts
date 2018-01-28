import { AppConfig } from './../../app/app.config';
import { Atendimento } from '../../models/atendimento';
import { Imagem } from './../../models/imagem';
import { Observable } from 'rxjs/Rx';
import { AppState } from './../../redux/reducers/index';
import { Injectable } from '@angular/core';
import { AuthHttp } from 'angular2-jwt';
import 'rxjs/add/operator/map';
import { File, FileEntry, IFile } from '@ionic-native/file';

@Injectable()
export class ImagemProvider {

  private url = `${AppConfig.endpointBaseURL}/api/atendimentos`;

  constructor(
    private http: AuthHttp,
    private readonly file: File,
  ) {

  }

  private getFile(imagem: Imagem): Promise<IFile> {

    return new Promise((resolve, reject) => {
      this.file.resolveLocalFilesystemUrl(imagem.localPath)
      .then(entry => (<FileEntry>entry).file(file => resolve(file)))
      .catch(err => reject(err));
    })

  }

  private getFormData(file: IFile, imagem: Imagem): Promise<FormData> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const formData = new FormData();
        const imgBlob = new Blob([reader.result], {type: file.type});
        formData.append('file', imgBlob, file.name);
        formData.append('tipo', imagem.tipo);
        resolve(formData);
      };
      reader.readAsArrayBuffer(file);
    })
  }

  public enviarFoto(imagem: Imagem): Observable<Atendimento> {
    return Observable.fromPromise(this.getFile(imagem))
    .switchMap(file => Observable.fromPromise(this.getFormData(file, imagem)))
    .switchMap(formData => this.http.post(`${this.url}/${imagem.atendimentoID}/imagens`, formData))
    .catch((e) => this.handleError(e))
  }

  private handleError(error: Response | any) {
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json();
      const err = body || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    return Observable.throw(errMsg);
  }

}
