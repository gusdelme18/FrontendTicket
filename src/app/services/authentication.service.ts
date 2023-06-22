import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private tokenKey = 'token';

  constructor(private http: HttpClient) {}

  public login(params: any): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post(environment.apiUrl +'/login', params, {headers: headers});
  }

  public register(params: any): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post(environment.apiUrl +'/register', params, {headers: headers});
  }

}
