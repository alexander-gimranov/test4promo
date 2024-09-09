import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { Country, Province, User } from './models';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private apiUrl = 'http://localhost:5000/api'; // Backend API URL

  constructor(private http: HttpClient) { }

  getCountries(): Observable<Country[]> {
    return this.http.get<Country[]>(`${this.apiUrl}/countries`, {
      headers: new HttpHeaders({
        'Access-Control-Allow-Origin': '*'
      })
    });
  }

  getProvinces(countryId: number): Observable<Province[]> {
    return this.http.get<Province[]>(`${this.apiUrl}/provinces/${countryId}`, {
      headers: new HttpHeaders({
        'Access-Control-Allow-Origin': '*'
      })
    });
  }

  saveUser(user: User): Observable<any> {
    return this.http.post(`${this.apiUrl}/users`, user).pipe(
      catchError(this.handleError) // Handle errors
    );
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred!';
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(() => new Error(errorMessage));
  }
}
