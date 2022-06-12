import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Paginated } from 'src/app/core/models/abstractions/paginated.model';
import { Product } from 'src/app/core/models/product.model';

@Injectable()
export class ProductService {
  getBoughtByCurrentUser(): Observable<Paginated<Product>> {
    const items: Product[] = [];

    for (let i = 0; i < 20; i++) {
      items.push({
        id: i,
        name: `Bought Product ${i}`,
        description: `${i} Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum`,
        price: Math.floor(Math.random() * 1000 + 1),
        rating: Math.floor(Math.random() * 5 + 1),
      });
    }

    const paginatedProduct: Paginated<Product> = {
      items,
      numberOfPages: 2,
    };

    return of(paginatedProduct);
  }
}
