import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

import {FbCreateResponse, Post} from '../interfaces/interfaces';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class PostsService {
  constructor(private http: HttpClient) {
  }

  getAllPosts(): Observable<Post[]> {
    return this.http.get(`${environment.dbUrl}/posts.json`)
      .pipe(
        map((response: {[key: string]: any}) => {
          return Object.keys(response)
            .map(key => ({
              ...response[key],
              id: key,
              date: new Date(response[key].date)
            }));
        })
      )
  }

// Создаем и сохраняем пост в БД фаербейза;
  create(post: Post): Observable<Post> {
    return this.http.post(`${environment.dbUrl}/posts.json`, post)
      .pipe(
        map((response: FbCreateResponse) => {
          return {
            ...post,
            id: response.name,
            date: new Date(post.date)
          };
        })
      );
  }

  getById(id: string): Observable<Post> {
    return this.http.get<Post>(`${environment.dbUrl}/posts/${id}.json`)
      .pipe(
        map((post: Post) => {
          return {
            ...post,
            id,
            date: new Date(post.date)
          };
        })
      );
  }

  update(post: Post): Observable<Post> {
    return this.http.patch<Post>(`${environment.dbUrl}/posts/${post.id}.json`, post)
  }

  remove(id: string): Observable<void> {
    return this.http.delete<void>(`${environment.dbUrl}/posts/${id}.json`)
  }
}
