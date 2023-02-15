import {Component, Input, OnInit} from '@angular/core';
import {DateTime} from "luxon";
import {distinctUntilChanged, interval, map, Observable} from "rxjs";

@Component({
  selector: 'app-relative-time',
  templateUrl: './relative-time.component.html',
  styleUrls: ['./relative-time.component.scss']
})
export class RelativeTimeComponent implements OnInit {

  @Input()
  time: DateTime | undefined;

  timeLive: Observable<string | undefined | null> | undefined;

  ngOnInit(): void {
    this.timeLive = interval(1000).pipe(
      map(() => this.time?.toRelative({ locale: 'en' })),
      distinctUntilChanged()
    )
  }
}
