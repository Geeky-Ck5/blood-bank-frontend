import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ContactInfoService {
  constructor(private http: HttpClient) {}

  updateContactInfo(userId: number, contactInfo: any): Observable<any> {
    return this.http.put(`/api/contact-info/${userId}`, contactInfo); // Adjust the endpoint if necessary
  }

  getContactInfo(userId: number): Observable<any> {
    return this.http.get(`/api/contact-info/${userId}`);
  }
}
