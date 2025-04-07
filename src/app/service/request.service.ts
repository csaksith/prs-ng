import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Request } from '../model/Request.model';

const URL = 'http://localhost:8080/api/requests/';

@Injectable({
  providedIn: 'root',
})
export class RequestService {
  constructor(private http: HttpClient) {}

  list(): Observable<Request[]> {
    return this.http.get<Request[]>(URL) as Observable<Request[]>;
  }

  add(Request: Request): Observable<Request> {
    return this.http.post(URL, Request) as Observable<Request>;
  }

  update(Request: Request): Observable<Request> {
    return this.http.put(URL + Request.id, Request) as Observable<Request>;
  }

  getById(id: number): Observable<Request> {
    return this.http.get<Request>(URL + id) as Observable<Request>;
  }

  delete(id: number): Observable<any> {
    return this.http.delete(URL + id) as Observable<Request>;
  }
}
