import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from "@angular/common/http";

import {  throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private REST_API_SERVER = "http://localhost:3000/products";

  constructor(private httpClient: HttpClient) { }

  handleError(error: HttpErrorResponse) {
    let errorMessage = 'Ocorreu um erro desconhecido!';
    if (error.error instanceof ErrorEvent) {
      // Client-side errors
      errorMessage = `Erro: ${error.error.message}`;
    } else {
      // Server-side errors
      errorMessage = `Código do erro: ${error.status}\nMensagem: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }

  public sendGetRequest(){
      console.log('passou no send service')
    return this.httpClient.get(this.REST_API_SERVER).pipe(retry(3), catchError(this.handleError));
  }

  public save(){
    console.log('passou no save')
  return this.httpClient.get(this.REST_API_SERVER).pipe(retry(3), catchError(this.handleError));
}
}