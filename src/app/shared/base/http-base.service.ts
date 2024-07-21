import { HttpClient } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpBaseService {

  private apiBaseUrl = 'http://localhost:3000/';

  private readonly httpClient!: HttpClient;

  constructor(protected readonly injector: Injector) {
    if (this.injector == null || this.injector == undefined) {
      throw new Error("O Injetor não pode ser nulo");
    }
    this.httpClient = this.injector.get(HttpClient);
  }

  protected httpGet(endpoint: string): Observable<any> {
    return this.httpClient.get(`${this.apiBaseUrl}${endpoint}`);
  }
  protected httpPost(endpoint: string, dados: any): Observable<any> {
    return this.httpClient.post(`${this.apiBaseUrl}${endpoint}`, dados);
  }
  protected httpPut(endpoint: string, dados: any): Observable<any> {
    return this.httpClient.put(`${this.apiBaseUrl}${endpoint}`, dados);
  }
  protected httpDelete(endpoint: string): Observable<any> {
    return this.httpClient.delete(endpoint);
  }


}
