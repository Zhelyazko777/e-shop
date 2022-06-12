import { ProductService } from './services/product.service';
import { NgModule } from '@angular/core';
import { AdminRoutingModule } from './admin-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { TableComponent } from './components/table/table.component';
import { BuyerService } from './services/buyer.service';
import { SellerService } from './services/seller.service';

@NgModule({
  declarations: [DashboardComponent, TableComponent],
  imports: [AdminRoutingModule, SharedModule],
  providers: [ProductService, BuyerService, SellerService],
})
export class AdminModule {}
