import { shareReplay } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { Observable, map } from 'rxjs';
import { ProductService as FeatureProductService } from '../../services/product.service';
import { Paginated } from 'src/app/core/models/abstractions/paginated.model';
import { Product } from 'src/app/core/models/product.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  allBoughtProductsPaginated$: Observable<Paginated<Product>> | null = null;
  allBoughtProductsPage: number = 1;
  allBoughtProductsItemsPerPage: number = 10;

  constructor(private readonly featureProductService: FeatureProductService) {}

  ngOnInit(): void {
    this.initAllBoughtProducts();
  }

  onNextPaginationarrowClick() {
    this.allBoughtProductsPage++;
    this.initAllBoughtProducts();
  }

  onBackPaginationArrowClick() {
    this.allBoughtProductsPage--;
    this.initAllBoughtProducts();
  }

  private initAllBoughtProducts() {
    this.allBoughtProductsPaginated$ = this.featureProductService
      .getBoughtByCurrentUser()
      .pipe(shareReplay(), map(this.mapAllBoughtProductsToPage.bind(this)));
  }

  private mapAllBoughtProductsToPage(
    products: Paginated<Product>
  ): Paginated<Product> {
    const items = products.items.slice(
      (this.allBoughtProductsPage - 1) * this.allBoughtProductsItemsPerPage,
      this.allBoughtProductsItemsPerPage * this.allBoughtProductsPage
    );

    return {
      items,
      numberOfPages: products.numberOfPages,
    };
  }
}
