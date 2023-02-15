import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { CommentComponent } from './component/comment/comment.component';
import { CommentsComponent } from './component/comments/comments.component';
import {FormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {MatListModule} from "@angular/material/list";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatInputModule} from "@angular/material/input";
import { RelativeTimePipe } from './pipe/relative-time.pipe';
import {MatTooltipModule} from "@angular/material/tooltip";
import { DateFormatPipe } from './pipe/date-format.pipe';
import { RelativeTimeComponent } from './component/relative-time/relative-time.component';
import { DateTimePipe } from './pipe/date-time.pipe';

@NgModule({
  declarations: [
    AppComponent,
    CommentComponent,
    CommentsComponent,
    RelativeTimePipe,
    DateFormatPipe,
    RelativeTimeComponent,
    DateTimePipe,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    MatSnackBarModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    MatInputModule,
    MatTooltipModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
