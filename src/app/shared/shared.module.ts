import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardWidgetComponent } from './components/dashboard-widget/dashboard-widget.component';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { RouterModule } from '@angular/router';
import { PieChartComponent } from './components/pie-chart/pie-chart.component';
import { NgChartsModule } from 'ng2-charts';
import { ProductsListComponent } from './components/products-list/products-list.component';
import { ProductModalComponent } from './components/product-modal/product-modal.component';
import { ProductImageAltPipe } from './pipes/product-image-alt.pipe';
import { LoadingSpinnerComponent } from './components/loading-spinner/loading-spinner.component';

@NgModule({
  declarations: [
    DashboardWidgetComponent,
    MainLayoutComponent,
    PieChartComponent,
    ProductsListComponent,
    ProductModalComponent,
    ProductImageAltPipe,
    LoadingSpinnerComponent,
  ],
  imports: [CommonModule, RouterModule, NgChartsModule],
  exports: [
    CommonModule,
    DashboardWidgetComponent,
    MainLayoutComponent,
    PieChartComponent,
    ProductsListComponent,
    ProductModalComponent,
    LoadingSpinnerComponent,
  ],
})
export class SharedModule {}
