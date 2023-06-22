import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TicketsService {
  private tokenKey = 'token';

  constructor(private http: HttpClient) {}

  public createTicket(params: any, token:string): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json')
                                   .set('Authorization', 'Bearer '+token);
    return this.http.post(environment.apiUrl +'/ticket', params, {headers: headers});
  }

  public getTicketAll(token:string): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json')
                                   .set('Authorization', 'Bearer '+token);
    return this.http.get(environment.apiUrl +'/ticket', {headers: headers});
  }

  public getTicketId(idTicket:number, token:string): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json')
                                   .set('Authorization', 'Bearer '+token);
    return this.http.get(environment.apiUrl +'/ticket/'+idTicket, {headers: headers});
  }

  public editTicket(idTicket:number, params: any, token:string): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json')
                                   .set('Authorization', 'Bearer '+token);
    return this.http.put(environment.apiUrl +'/ticket/'+idTicket, params, {headers: headers});
  }

  public deleteTicket(idTicket:number, token:string): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json')
                                   .set('Authorization', 'Bearer '+token);
    return this.http.delete(environment.apiUrl +'/ticket/'+idTicket, {headers: headers});
  }

  
}
