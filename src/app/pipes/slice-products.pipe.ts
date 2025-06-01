import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sliceProducts'
})
export class SliceProductsPipe implements PipeTransform {
  transform(productos: any[], start: number, count: number): any[] {
    return productos.slice(start, start + count);
  }
}