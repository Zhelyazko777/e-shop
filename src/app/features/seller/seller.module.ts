import { NgModule } from '@angular/core';
import { SellerRoutingModule } from './seller-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { ProductService } from './services/product.service';
import { DashboardComponent } from './pages/dashboard/dashboard.component';

@NgModule({
  declarations: [DashboardComponent],
  imports: [SellerRoutingModule, SharedModule],
  providers: [ProductService],
})
export class SellerModule {}
