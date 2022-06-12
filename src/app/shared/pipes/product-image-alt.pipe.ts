import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'productImageAlt',
})
export class ProductImageAltPipe implements PipeTransform {
  transform(value: string): unknown {
    return `${value} - Image`;
  }
}
