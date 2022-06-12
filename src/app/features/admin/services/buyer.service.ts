import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Top } from '../../../core/models/abstractions/top.model';
import { Buyer } from '../../../core/models/buyer.model';

@Injectable()
export class BuyerService {
  getTop(limit: number): Observable<Top<Buyer>[]> {
    const items: Top<Buyer>[] = [];

    for (let i = 0; i < limit; i++) {
      items.push({
        model: {
          id: i,
          name: `Buyer ${i}`,
        },
        score: Math.floor(Math.random() * 500 + 1),
      });
    }

    return of(items);
  }
}
