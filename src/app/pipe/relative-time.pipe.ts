import { Pipe, PipeTransform } from '@angular/core';
import {DateTime} from "luxon";

@Pipe({
  name: 'relativeTime'
})
export class RelativeTimePipe implements PipeTransform {

  transform(value: string | DateTime | undefined): string {
    if (!value) {
      return '';
    }
    if (typeof value === 'string') {
      value = DateTime.fromISO(value);
    }
    return value.toRelative( { locale: 'en' }) as string;
  }
}
