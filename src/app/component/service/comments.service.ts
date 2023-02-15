import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class CommentsService {

  constructor(private http: HttpClient) { }

  listComments() {
    return this.http.get<Comment[]>('http://localhost:8080/api/comment');
  }

  addComment(comment: Comment) {
    return this.http.put<Comment>('http://localhost:8080/api/comment', comment);
  }

  deleteComment(comment: Comment) {
    return this.http.delete<Comment>(`http://localhost:8080/api/comment/${comment.id}`)
  }

  modifyComment(comment: Comment) {
    return this.http.post<Comment>(`http://localhost:8080/api/comment/${comment.id}`, comment);
  }
}

export interface Comment {

  id?: string;

  comment: string;

  dateAdd?: string;
}
