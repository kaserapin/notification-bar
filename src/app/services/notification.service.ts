import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Company } from '../Company';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private apiUrl = 'http://localhost:3000/companies';

  constructor(private http: HttpClient) {}

  getCompanies(): Observable<Company[]> {
    return this.http.get<Company[]>(this.apiUrl);
  }

  getCorrectDateFormat(notificationDateString: string) {
    const splittedNotetification = notificationDateString.split('/');
    const splicedMonth = splittedNotetification.splice(1, 1);
    splittedNotetification.unshift(splicedMonth.toString());
    const splittedNoteString = splittedNotetification.join('/');
    const notificationDate = new Date(splittedNoteString);
    return notificationDate;
  }
}
