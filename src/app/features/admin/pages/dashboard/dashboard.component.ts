import { Component, OnInit } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Product } from '../../../../core/models/product.model';
import { Top } from '../../../../core/models/abstractions/top.model';
import { Seller } from '../../../../core/models/seller.model';
import { shareReplay } from 'rxjs/operators';
import { Buyer } from '../../../../core/models/buyer.model';
import { ProductService as FeatureProductService } from './../../services/product.service';
import { SellerService as FeatureSellerService } from '../../services/seller.service';
import { BuyerService as FeatureBuyerService } from 'src/app/features/admin/services/buyer.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  topSoldProductsColumns: string[] = ['Title', 'Sold'];
  topSoldProducts$: Observable<string[][]> | null = null;
  topSellersLabels$: Observable<string[]> | null = null;
  topSellersScores$: Observable<number[]> | null = null;
  topBuyersLabels$: Observable<string[]> | null = null;
  topBuyersScores$: Observable<number[]> | null = null;

  constructor(
    private readonly featureProductService: FeatureProductService,
    private readonly featureSellerService: FeatureSellerService,
    private readonly featureBuyerService: FeatureBuyerService
  ) {}

  ngOnInit(): void {
    this.initTopSoldProducts();
    this.initTopSellers();
    this.initTopBuyers();
  }

  private initTopBuyers(): void {
    const topBuyersShared$ = this.featureBuyerService
      .getTop(10)
      .pipe(shareReplay());

    this.topBuyersLabels$ = topBuyersShared$.pipe(
      map(this.mapTopBuyersToChartLabels.bind(this))
    );
    this.topBuyersScores$ = topBuyersShared$.pipe(
      map(this.mapTopBuyersToChartScores.bind(this))
    );
  }

  private mapTopBuyersToChartLabels(buyers: Top<Buyer>[]): string[] {
    return buyers.map((s) => s.model.name);
  }

  private mapTopBuyersToChartScores(buyers: Top<Buyer>[]): number[] {
    return buyers.map((s) => s.score);
  }

  private initTopSellers(): void {
    const topSellersShared$ = this.featureSellerService
      .getTop(10)
      .pipe(shareReplay());

    this.topSellersLabels$ = topSellersShared$.pipe(
      map(this.mapTopSellersToChartLabels.bind(this))
    );
    this.topSellersScores$ = topSellersShared$.pipe(
      map(this.mapTopSellersToChartScores.bind(this))
    );
  }

  private mapTopSellersToChartLabels(sellers: Top<Seller>[]): string[] {
    return sellers.map((s) => s.model.name);
  }

  private mapTopSellersToChartScores(sellers: Top<Seller>[]): number[] {
    return sellers.map((s) => s.score);
  }

  private initTopSoldProducts(): void {
    this.topSoldProducts$ = this.featureProductService
      .getTopSoldToday(10)
      .pipe(map(this.mapProductsToGridRows.bind(this)));
  }

  private mapProductsToGridRows(products: Top<Product>[]): string[][] {
    return products.map((p) => [p.model.name, String(p.score)]);
  }
}
