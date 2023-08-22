import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AuthResponseData, User } from '../Models/Auth.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // user = new Subject<User>();
  user = new BehaviorSubject<User | null>(null);
  private tokenExpirationTimer: any;

  constructor(private http: HttpClient, private router: Router) {}

  private handleAuth(res: AuthResponseData) {
    const expiresIn = 3600 * 1000;
    const expirationDate = String(new Date(new Date().getTime() + expiresIn));
    const token = res.token;
    const user = { ...res.data.user, token, expirationDate };
    localStorage.setItem('userData', JSON.stringify(user));
    this.user.next(user);
    this.autoLogout(expiresIn);
  }

  signup(firstName: string, lastName: string, email: string, password: string) {
    return this.http
      .post<AuthResponseData>('http://127.0.0.1:8000/user/signup', {
        first_name: firstName,
        last_name: lastName,
        email: email,
        password: password,
      })
      .pipe(
        tap((res) => {
          this.handleAuth(res);
        })
      );
  }

  login(email: string, password: string) {
    return this.http
      .post<AuthResponseData>('http://127.0.0.1:8000/user/login', {
        email: email,
        password: password,
      })
      .pipe(
        tap((res) => {
          this.handleAuth(res);
        })
      );
  }

  autoLogin() {
    let data = localStorage.getItem('userData');
    if (!data) {
      return;
    }
    const userData: User = JSON.parse(data);

    if (
      userData.expirationDate &&
      new Date() < new Date(userData.expirationDate)
    ) {
      this.user.next(userData);
      const expirationDuration =
        new Date(userData.expirationDate).getTime() - new Date().getTime();
      this.autoLogout(expirationDuration);
    }
  }

  logout() {
    this.user.next(null);
    localStorage.removeItem('userData');
    this.router.navigate(['/auth']);
    if (this.tokenExpirationTimer) clearTimeout(this.tokenExpirationTimer);
    this.tokenExpirationTimer = null;
  }

  autoLogout(expirationDuration: number) {
    this.tokenExpirationTimer = setTimeout(() => {
      this.logout();
    }, expirationDuration);
  }

  getToken() {
    const token = JSON.parse(localStorage.getItem('userData') ?? '')?.token;
    return { headers: { Authorization: `Bearer ${token}` } };
  }
}
