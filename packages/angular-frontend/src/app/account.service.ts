import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '~environments/environment';

type Account = {
  id: string;
  email: string;
  approved: boolean;
};

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  constructor(private http: HttpClient) {}
  getAccount(email: string, password: string): Observable<Account> {
    return this.http.get<Account>(`${environment.apiUrl}/v1/accounts`, {
      params: {
        email,
        password,
      },
    });
  }
}
