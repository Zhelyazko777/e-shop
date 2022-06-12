import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { Product } from '../../../core/models/product.model';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductsListComponent {
  _products: Product[] = [];

  @Input()
  set products(products: Product[]) {
    this._products = products;
    this.resetLoadingBars();
  }
  get products() {
    return this._products;
  }

  @Input()
  currentPage: number = 0;

  @Input()
  numberOfPages: number = 0;

  @Output()
  backArrowClick: EventEmitter<void> = new EventEmitter<void>();

  @Output()
  nextArrowClick: EventEmitter<void> = new EventEmitter<void>();

  loadingBar: string = '/assets/loading-spinner.gif';
  selectedProduct: Product | null = null;
  hideImageLoader: boolean = false;
  loadedImages: number = 0;

  get isBackArrowDisabled(): boolean {
    return this.currentPage <= 1;
  }

  get isNextArrowDisabled(): boolean {
    return this.currentPage >= this.numberOfPages;
  }

  onPageBackArrowClick(): void {
    this.backArrowClick.emit();
  }

  onNextPageArrowClick(): void {
    this.nextArrowClick.emit();
  }

  onItemClick(id: number): void {
    const product = this.products.find((p) => p.id === id);
    if (product) {
      this.selectedProduct = product;
    }
  }

  onModalCloseClick(): void {
    this.selectedProduct = null;
  }

  onImageLoaded(): void {
    ++this.loadedImages;
    if (this.loadedImages === this.products.length) {
      this.hideImageLoader = true;
    }
  }

  private resetLoadingBars(): void {
    this.hideImageLoader = false;
    this.loadedImages = 0;
  }
}
