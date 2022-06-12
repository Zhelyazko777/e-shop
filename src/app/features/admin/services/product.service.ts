import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Top } from 'src/app/core/models/abstractions/top.model';
import { Product } from '../../../core/models/product.model';

@Injectable()
export class ProductService {
  getTopSoldToday(limit: number): Observable<Top<Product>[]> {
    const items: Top<Product>[] = [];

    for (let i = 0; i < limit; i++) {
      items.push({
        model: {
          id: i,
          name: `Top Sold Product ${i}`,
          description: `${i} Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum`,
          price: Math.random() * (1000 + 1),
          rating: Math.floor(Math.random() * 5 + 1),
        },
        score: Math.floor(Math.random() * 500 + 1),
      });
    }

    return of(items);
  }
}
