import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Request } from '../model/request.model';
import { RequestDto } from '../model/requestDto.model';
const URL = 'http://localhost:8080/api/requests';

@Injectable({
  providedIn: 'root',
})
export class RequestService {
  constructor(private http: HttpClient) {}

  list(): Observable<Request[]> {
    return this.http.get<Request[]>(URL + '/') as Observable<Request[]>;
  }

  add(dto: RequestDto): Observable<Request> {
    return this.http.post(URL, dto) as Observable<Request>;
  }

  update(request: Request): Observable<Request> {
    return this.http.put(
      URL + '/' + request.id,
      request
    ) as Observable<Request>;
  }

  getById(id: number): Observable<Request> {
    return this.http.get<Request>(URL + '/' + id) as Observable<Request>;
  }

  delete(id: number): Observable<any> {
    return this.http.delete(URL + '/' + id) as Observable<Request>;
  }

  submitForReview(id: number): Observable<Request> {
    return this.http.put(URL + '/submit-review/' + id, null) as Observable<Request>;
  }

  getRequestsForReview(id: number): Observable<Request[]> {
    return this.http.get<Request[]>(URL + '/review/' + id) as Observable<Request[]>;
  }

  approve(id: number): Observable<Request> {
    return this.http.put(URL + '/approve/' + id, {}) as Observable<Request>;
  }
  reject(id: number, data: any): Observable<Request> {
    return this.http.put(URL + '/reject/' + id, data) as Observable<Request>;
  }
}
