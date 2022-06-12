import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Top } from '../../../core/models/abstractions/top.model';
import { Seller } from '../../../core/models/seller.model';

@Injectable()
export class SellerService {
  getTop(limit: number): Observable<Top<Seller>[]> {
    const items: Top<Seller>[] = [];

    for (let i = 0; i < limit; i++) {
      items.push({
        model: {
          id: i,
          name: `Seller ${i}`,
        },
        score: Math.floor(Math.random() * 500 + 1),
      });
    }

    return of(items);
  }
}
