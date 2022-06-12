import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Product } from '../../../core/models/product.model';
import { Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-product-modal',
  templateUrl: './product-modal.component.html',
  styleUrls: ['./product-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductModalComponent {
  @Input()
  product: Product | null = null;

  @Output()
  modalClosed: EventEmitter<void> = new EventEmitter<void>();

  loadingBar: string = '/assets/loading-spinner.gif';
  hideImageLoader: boolean = false;

  onCloseCLick() {
    this.modalClosed.emit();
    this.resetLoadingBar();
  }

  onImageLoaded(): void {
    this.hideImageLoader = true;
  }

  private resetLoadingBar(): void {
    this.hideImageLoader = false;
  }
}
