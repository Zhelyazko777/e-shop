import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { BuyerRoutingModule } from './buyer-routing.module';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ProductService } from './services/product.service';

@NgModule({
  imports: [BuyerRoutingModule, SharedModule],
  declarations: [DashboardComponent],
  providers: [ProductService],
})
export class BuyerModule {}
