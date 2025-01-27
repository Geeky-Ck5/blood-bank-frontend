import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class IpService {
  private baseUrl = 'https://ipinfo.io'; // Base URL for the API
  private token = '1aa1d7bb53320a';      // Replace with your actual token

  constructor(private http: HttpClient) {}

  /**
   * Fetches IP details based on a given IP or the caller's IP.
   * @param ip - Optional IP address to fetch details for.
   * @returns Observable containing the IP details.
   */
  getIpDetails(ip?: string): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`, // Add the token as a Bearer token
    });

    const url = ip ? `${this.baseUrl}/${ip}` : `${this.baseUrl}`;
    return this.http.get<any>(url, { headers });
  }
}
