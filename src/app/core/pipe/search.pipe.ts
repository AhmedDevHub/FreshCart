import { Pipe, PipeTransform } from '@angular/core';
import { Product } from '../interfaces/product';

@Pipe({
  name: 'search',
  standalone: true
})
export class SearchPipe implements PipeTransform {

  transform(products: Product[], term: string): Product[] {
    return products.filter((item) => item.title.toLowerCase().includes(term.toLowerCase()));
  }

}
