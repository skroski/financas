import { HttpClient } from '@angular/common/http';
import { Injectable, Injector, inject } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpBaseService {

  public httpClient!: HttpClient;
  injector = inject(Injector)

  ngOnInit(): void {
    if(this.injector == null || this.injector == undefined) {
      throw new Error("Injector is required");
    }
    this.httpClient = this.injector.get(HttpClient);
  }

  public httpGet(endpoint: string): Observable<any> {
    return this.httpClient.get(endpoint);
  }
  public httpPost(endpoint: string): Observable<any> {
    return this.httpClient.get(endpoint);
  }
  public httpPut(endpoint: string): Observable<any> {
    return this.httpClient.get(endpoint);
  }
  public httpDelete(endpoint: string): Observable<any> {
    return this.httpClient.get(endpoint);
  }


}
