import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductService as FeatureProductService } from '../../services/product.service';
import { map, shareReplay } from 'rxjs/operators';
import { Top } from 'src/app/core/models/abstractions/top.model';
import { Product } from '../../../../core/models/product.model';
import { Paginated } from 'src/app/core/models/abstractions/paginated.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  topSoldProductsLabels$: Observable<string[]> | null = null;
  topSoldProductsScores$: Observable<number[]> | null = null;
  allSellerProductsPaginated$: Observable<Paginated<Product>> | null = null;
  allSellerProductsPage: number = 1;
  allSellerProductsItemsPerPage: number = 10;

  constructor(private readonly featureProductService: FeatureProductService) {}

  ngOnInit(): void {
    this.initTopSoldProducts();
    this.initAllSellerProducts();
  }

  onNextPaginationarrowClick() {
    this.allSellerProductsPage++;
    this.initAllSellerProducts();
  }

  onBackPaginationArrowClick() {
    this.allSellerProductsPage--;
    this.initAllSellerProducts();
  }

  private initAllSellerProducts() {
    this.allSellerProductsPaginated$ = this.featureProductService
      .getAllSellerProductsPaginated()
      .pipe(shareReplay(), map(this.mapAllSellerProductsToPage.bind(this)));
  }

  private mapAllSellerProductsToPage(
    products: Paginated<Product>
  ): Paginated<Product> {
    const items = products.items.slice(
      (this.allSellerProductsPage - 1) * this.allSellerProductsItemsPerPage,
      this.allSellerProductsPage * this.allSellerProductsItemsPerPage
    );

    return {
      items,
      numberOfPages: products.numberOfPages,
    };
  }

  private initTopSoldProducts(): void {
    const topSoldProductsShared$ = this.featureProductService
      .getTopSoldByCurrentSellerToday(10)
      .pipe(shareReplay());

    this.topSoldProductsLabels$ = topSoldProductsShared$.pipe(
      map(this.mapTopSoldProductsToChartLabels)
    );
    this.topSoldProductsScores$ = topSoldProductsShared$.pipe(
      map(this.mapTopSoldProductsToChartScores)
    );
  }

  private mapTopSoldProductsToChartLabels(products: Top<Product>[]): string[] {
    return products.map((p) => p.model.name);
  }

  private mapTopSoldProductsToChartScores(products: Top<Product>[]): number[] {
    return products.map((p) => p.score);
  }
}
