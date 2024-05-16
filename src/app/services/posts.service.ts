import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { Posts, Post } from '../../types';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  constructor(private apiService: ApiService) {}

  getPosts = (url: string): Observable<any> => {
    return this.apiService.get(url);
  };

  addPosts = (url: string, body: Post): Observable<any> => {
    return this.apiService.post(url, body);
  };

  editPosts = (url: string, body: Post): Observable<any> => {
    return this.apiService.put(url, body);
  };

  deletePosts = (url: string): Observable<any> => {
    return this.apiService.delete(url);
  };

  getPostById = (url: string): Observable<Post> => {
    return this.apiService.get(url);
  };
}
