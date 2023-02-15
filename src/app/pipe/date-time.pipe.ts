import { Pipe, PipeTransform } from '@angular/core';
import {DateTime} from "luxon";

@Pipe({
  name: 'dateTime'
})
export class DateTimePipe implements PipeTransform {

  transform(value: string | undefined): DateTime | undefined {
    if (!value) {
      return;
    }
    return DateTime.fromISO(value);
  }
}
