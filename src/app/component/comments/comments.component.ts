import { Component } from '@angular/core';
import {Comment, CommentsService} from "../service/comments.service";
import {HttpErrorResponse} from "@angular/common/http";
import {MatSnackBar} from "@angular/material/snack-bar";
import {DateTime} from "luxon";

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent {

  private _sort: 'asc' | 'desc' = 'desc';

  comments: Comment[] = [];

  editComment: Comment = {
    comment: ''
  };

  constructor(private commentsService: CommentsService,
              private snackBar: MatSnackBar) {
    commentsService.listComments().subscribe({
      next: comments => {
        this.comments = comments;
        this.sort();
      },
      error: error => this.addWarningSnackbar(`cannot load comments ${error.statusCode}`)
    });
  }

  saveComment() {
    if (!this.editComment || this.editComment.comment === '') {
      return;
    }
    if (this.editComment.id) {
      this.commentsService.modifyComment(this.editComment).subscribe({
        next: comment => {
          this.comments.splice(this.comments.indexOf(this.editComment), 1);
          this.comments.push(comment);
          this.afterCommentAction();
        },
        error: error => this.afterSaveError(error)
      });
    } else {
      this.commentsService.addComment(this.editComment).subscribe({
        next: comment => {
          this.comments.push(comment);
          this.afterCommentAction();
        },
        error: error => this.afterSaveError(error)
      });
    }
  }

  deleteComment(comment?: Comment) {
    if (!comment) {
      comment = this.editComment;
    }
    if (!comment || !comment.id) {
      return;
    }
    this.commentsService.deleteComment(comment).subscribe({
      next: () => {
        this.comments.splice(this.comments.indexOf(comment as Comment), 1);
        this.afterDeleteAction();
      }
    })
  }

  sort(direction?: 'asc' | 'desc') {
    if (!direction) {
      direction = this._sort;
    }
    this._sort = direction;
    this.comments.sort((c1, c2) => DateTime.fromISO(c1.dateAdd as string).toMillis() - DateTime.fromISO(c2.dateAdd as string).toMillis());
    if (direction === 'desc') {
      this.comments = this.comments.reverse()
    }
  }

  private afterCommentAction() {
    this.addSuccessSnackbar('Comment successfully saved.');
    this.sort();
    this.editComment = {
      comment: ''
    }
  }

  private afterDeleteAction() {
    this.addSuccessSnackbar('Comment successfully deleted');
    this.editComment = {
      comment: ''
    }
  }

  private afterSaveError(error: HttpErrorResponse) {
    this.addWarningSnackbar(`Cannot save comment at the moment. The server returned an error code ${error.status}`);
  }

  private addWarningSnackbar(message: string) {
    this.snackBar.open(message, 'okay 😐', { duration: 3000 });
  }

  private addSuccessSnackbar(message: string) {
    this.snackBar.open(message, 'yay 😊', { duration: 3000 });
  }
}
