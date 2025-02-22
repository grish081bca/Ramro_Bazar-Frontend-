import { Injectable, OnInit } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpParams,
  HttpResponse,
} from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from './environment';

@Injectable({
  providedIn: 'root',
})
export class ApiService implements OnInit {
  private baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) {
  }
  ngOnInit(): void {

  }

  private headers = new HttpHeaders({
    'Content-Type': 'application/json',
    Accept: 'application/json',
  });

  private logRequest(method: string, url: string, options?: any): void {
    if (!environment.production) {
      console.log(`HTTP ${method} Request to ${url}`, options);
    }
  }

  private logResponse(url: string, response: any): void {
    if (!environment.production) {
      console.log(`Response from ${url}`, response);
    }
  }

  private handleError(error: any): Observable<HttpResponse<any>> {
    console.error('An error occurred', error);
    // Return an observable with a user-facing error message
    return of(
      new HttpResponse({
        body: error.error,
        status: error.status || 500,
        statusText: error.statusText || 'Unknown Error',
      })
    );
  }

  get<T>(endpoint: string, params?: HttpParams): Observable<HttpResponse<T>> {
    const url = `${this.baseUrl}/${endpoint}`;
    const options = {
      headers: this.headers,
      params: params,
      observe: 'response' as 'response',
      withCredentials: true,
    };
    this.logRequest('GET', url, options);
    return this.http.get<T>(url, options).pipe(
      tap((response) => this.logResponse(url, response)),
      catchError(this.handleError)
    );
  }

  //todo: change endpoint to spread operator for path variable for all methods
  post<T>(
    endpoint: string,
    body?: any,
    params?: HttpParams,
    customHeader?: HttpHeaders //For Dynamic header if need to change header type or anything
  ): Observable<HttpResponse<T>> {
    const url = `${this.baseUrl}/${endpoint}`;
    const headers = customHeader || this.headers; //If need to change the header content.
    const options = {
      headers: headers,
      params: params,
      observe: 'response' as 'response',
      withCredentials: true,
    };
    this.logRequest('POST', url, { ...options, body });
    return this.http.post<T>(url, body, options).pipe(
      tap((response) => this.logResponse(url, response)),
      catchError(this.handleError)
    );
  }
  // post<T>(
  //   endpoint: string,
  //   body?: any,
  //   params?: HttpParams,
  //   customHeader?: HttpHeaders
  // ): Observable<HttpResponse<T>> {
  //   const url = `${this.baseUrl}/${endpoint}`;

  //   // Handle headers differently for FormData
  //   let headers = customHeader;
  //   if (body instanceof FormData) {
  //     headers = customHeader || new HttpHeaders(); // Empty headers for FormData
  //   } else {
  //     headers = customHeader || this.headers; // Use default JSON headers
  //   }

  //   const options = {
  //     headers: headers,
  //     params: params,
  //     observe: 'response' as 'response',
  //     withCredentials: true,
  //   };

  //   this.logRequest('POST', url, { ...options, body });
  //   return this.http.post<T>(url, body, options).pipe(
  //     tap((response) => this.logResponse(url, response)),
  //     catchError(this.handleError)
  //   );
  // }

  postMultipart<T>(
    endpoint: string,
    formData: FormData,
    params?: HttpParams
  ): Observable<HttpResponse<T>> {
    const url = `${this.baseUrl}/${endpoint}`;
    const multipartHeaders = new HttpHeaders({
      Accept: 'application/json',
    });
    const options = {
      headers: multipartHeaders,
      params: params,
      observe: 'response' as 'response',
      withCredentials: true,
    };
    this.logRequest('POST', url, { ...options, formData });
    return this.http.post<T>(url, formData, options).pipe(
      tap((response) => this.logResponse(url, response)),
      catchError(this.handleError)
    );
  }

  put<T>(
    endpoint: string,
    body: any,
    params?: HttpParams
  ): Observable<HttpResponse<T>> {
    const url = `${this.baseUrl}/${endpoint}`;
    const options = {
      headers: this.headers,
      params: params,
      observe: 'response' as 'response',
      withCredentials: true,
    };
    this.logRequest('PUT', url, { ...options, body });
    return this.http.put<T>(url, body, options).pipe(
      tap((response) => this.logResponse(url, response)),
      catchError(this.handleError)
    );
  }

  delete<T>(endpoint: string, params?: HttpParams): Observable<HttpResponse<T>> {
    const url = `${this.baseUrl}/${endpoint}`;
    const options = {
      headers: this.headers,
      params: params,
      observe: 'response' as 'response',
      withCredentials: true,
    };
    this.logRequest('DELETE', url, options);
    return this.http.delete<T>(url, options).pipe(
      tap((response) => this.logResponse(url, response)),
      catchError(this.handleError)
    );
  }
}
