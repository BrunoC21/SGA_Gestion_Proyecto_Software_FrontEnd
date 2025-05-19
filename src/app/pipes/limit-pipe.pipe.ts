import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'limit',
  standalone: true
})
export class LimitPipe implements PipeTransform {
  transform(items: any[], limit: number): any[] {
    if (!items || limit <= 0) return [];
    return items.slice(0, limit);
  }
}