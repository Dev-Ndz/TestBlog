import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { HttpClientService } from './http-client.service';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly JWT_TOKEN = 'JWT_TOKEN';
  private AUTH_TOKEN =''
  private loggedUser?: string;
  private IsAuthenticatedSubject = new BehaviorSubject<boolean>(false);



  constructor(private http : HttpClientService, private cookieService : CookieService) {}

  login(user: { email: string; password: string }): Observable<any> {
    return this.http
      .post('https://blogdbhazar-nico-5d30f5ae698b.herokuapp.com/api/auth/login', user)
      .pipe(
        tap((data) => {
          this.doLoginUser(user.email, data);

          // Set the token in a cookie
          console.log('tokens', data);
          console.log('user', user);
        })
      );
  }

  getBlogs (){
    console.log("getting blogs...")
    this.http.get('https://blogdbhazar-nico-5d30f5ae698b.herokuapp.com/api/blogs').subscribe((response:any) => {
      console.log(response)
    })
  }



  register(user: {
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
    userType: string;
  }): Observable<any> {
    console.log(user)
    return this.http.post("https://blogdbhazar-nico-5d30f5ae698b.herokuapp.com/api/auth/register", user)
  }

  private doLoginUser(username: string, tokens: any) {
    this.loggedUser = username;
    console.log('loggedUser', this.loggedUser);
    this.AUTH_TOKEN = tokens.token
    this.cookieService.set('auth_token', this.AUTH_TOKEN);
    this.storeJwtToken(tokens.token);
    this.IsAuthenticatedSubject.next(true);
  }

  post(url:string, data:any): Observable<any>{
    this.cookieService.set('auth_token', this.AUTH_TOKEN)
    console.log(this.AUTH_TOKEN)
    return this.http.post(url, data)
  }

  put(url:string, data:any): Observable<any>{
    this.cookieService.set('auth_token', this.AUTH_TOKEN)
    console.log(this.AUTH_TOKEN)
    return this.http.put(url, data)
  }

  delete(url:string): Observable<any>{
    this.cookieService.set('auth_token', this.AUTH_TOKEN)
    console.log(this.AUTH_TOKEN)
    return this.http.delete(url)
  }

  private storeJwtToken(jwt: string) {
    localStorage.setItem(this.JWT_TOKEN, jwt);
  }

  logout() {
    localStorage.removeItem(this.JWT_TOKEN);
    this.IsAuthenticatedSubject.next(false);
  }


  // getCurrentAuthUser = () => {

  // }

  isLoggedIn() {
    return !!localStorage.getItem(this.JWT_TOKEN);
  }

  getUser() {
    console.log('loggedUser', this.loggedUser);
    return this.loggedUser;
  }
}
