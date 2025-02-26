import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class IpService {
  private baseUrl = 'https://ipinfo.io?token=1aa1d7bb53320a';      // Replace with your actual token

  constructor(private http: HttpClient) {
  }

  /**
   * Fetches IP details based on a given IP or the caller's IP.
   * @param ip - Optional IP address to fetch details for.
   * @returns Observable containing the IP details.
   */
  getIpDetails(): Observable<any> {
    const headers = new HttpHeaders({
        });

    return this.http.get<any>(`${this.baseUrl}`, { headers }).pipe(
      catchError((error) => {
        console.error('Error fetching IP details:', error);
        return of({
          ip: 'Unknown',
          city: 'Unknown',
          region: 'Unknown',
          country: 'Unknown'
        });
      })
    );
  }
}
