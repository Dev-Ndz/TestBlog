import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class HttpClientService {
  csrfToken: string = "";

  constructor(private http: HttpClient) {}

  get(url: string): any {
    return this.http.get(url /*{withCredentials: true}*/);
  }

  post(url: string, data: any): any {
    return this.http.post(url, data, {
      withCredentials: true,
    });
  }

  put(url: string, data: any): any {
    return this.http.put(url, data, {
      withCredentials: true,
    });
  }

  delete(url: string): any {
    return this.http.delete(url /*{withCredentials: true}*/);
  }

  // getCsrfToken(): string {
  //   console.log("CsrfToken")
  //   const metaTag = document.querySelector('meta[name="csrf-token"]') as HTMLMetaElement;
  //   return metaTag ? metaTag.content : '';
  // }

  getCsrf() {
    console.log("getting token....");
    return this.http
      .get("https://blogdbhazar-nico-5d30f5ae698b.herokuapp.com/", {
        withCredentials: true,
      })
      .subscribe((data: any) => {
        console.log(data);
        this.csrfToken = data.token;
        console.log("token", this.csrfToken);
      });
  }
}
